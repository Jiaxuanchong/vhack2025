import numpy as np
import pandas as pd
from datetime import datetime
from typing import Dict, List, Optional, Any, Tuple
from backend.strategies.strategy import Strategy, Signal
from backend.models.order import Order, OrderStatus, OrderType

class Backtester:
    """
    Class for backtesting trading strategies.
    """
    def __init__(self,
                 data: pd.DataFrame,
                 strategy: Strategy,
                 initial_capital: float = 10000,
                 commission_pct: float = 0.001,
                 commission_fixed: float = 1.0):
        """
        Initialize a backtester.
        @param data: Test data
        @param strategy: Trading strategy to backtest
        @param initial_capital: Initial capital amount in the portfolio
        @param commission_pct: Commission charge in percentage (%)
        @param commission_fixed: Base commission charge rate
        """
        self.data: pd.DataFrame = data  # Support single-asset BTC only
        self.asset: str = "btc"  # Support single-asset BTC only
        self.strategy: Strategy = strategy
        self.initial_capital: float = initial_capital
        self.commission_pct: float = commission_pct
        self.commission_fixed: float = commission_fixed

        self.portfolio: Dict = {
            "cash": initial_capital,
            "positions": {},
        }

        self.trade_history: List[Order] = []
        self.equity_history: List[Tuple[datetime, Any]] = []
        self.drawdown_history: List[Tuple[datetime, Any]] = []

        self.results: Optional[Dict] = None
        self.peak_equity: float = initial_capital

    def run(self):

        # Check data columns
        if "close" not in self.data.columns:
            print("Unable to run the test. The data that you passed in should contain market prices")

        if self.strategy.indicators is not None:
            # Check if the input data contains the necessary indicator columns to execute the strategy
            if any(self.strategy.indicators) not in self.data.columns:
                print("Unable to run the test. Please check if your data passed in fit with your trading strategy.")
                return

        self.data.sort_index(inplace=True)
        signals_data = self.strategy.generate_signals(self.data)
        self.data["signal"] = signals_data

        print("Running the backtest...")

        for idx, row in self.data.iterrows():
            if row["signal"] == Signal.BUY.value:
                self._execute_trade(asset=self.asset, signal=Signal.BUY.value, price=row["close"], time=idx)

            elif row["signal"] == Signal.SELL.value:
                self._execute_trade(asset=self.asset, signal=Signal.SELL.value, price=row["close"], time=idx)

            self._update_equity_and_drawdown(idx)

        self.calculate_performance()

    def _execute_trade(self, asset: str, signal: Signal, price: float, time):
        if asset not in self.portfolio["positions"].keys():
            self.portfolio["positions"][asset] = {
                "quantity": 0.0,
                "entry_price": 0.0,
                "total_value": 0.0
            }

        if signal == Signal.BUY.value:
            if self.portfolio["cash"] > 0:
                trade_value = self.portfolio["cash"]

                commission = self._calculate_commission_charge(trade_value)
                shares_to_buy = (trade_value - commission) / price

                # Create order
                buy_order: Order = Order(type=OrderType.BUY.value, asset=asset, quantity=shares_to_buy, price=price, time_created=time)
                self._place_order(buy_order, price, time, commission)

                self._update_portfolio(OrderType.BUY.value, buy_order)
                self.trade_history.append(buy_order)
                return
            else:
                print("Insufficient cash to trade.")
                return

        elif signal == Signal.SELL.value:
            shares_to_sell = self.portfolio["positions"][asset]["quantity"]
            if shares_to_sell <= 0:
                print("No holding positions.")
                return
            else:
                trade_value = shares_to_sell * price
                commission = self._calculate_commission_charge(trade_value)

                sell_order: Order = Order(type=OrderType.SELL.value, asset=asset, quantity=shares_to_sell, price=price, time_created=time)
                self._place_order(sell_order, price, time, commission)

                self._update_portfolio(OrderType.SELL.value, sell_order)
                self.trade_history.append(sell_order)


    def _calculate_commission_charge(self, trade_value: float):
        return max(self.commission_pct * trade_value, self.commission_fixed)

    def _place_order(self, order: Order, execution_price: float, execution_time: datetime, commission: float):
        order.status = OrderStatus.COMPLETED
        order.execution_price = execution_price
        order.execution_timestamp = execution_time
        order.trade_amount = execution_price * order.quantity
        order.commission_charge = commission

        if order.type == OrderType.SELL:
            entry_price = self.portfolio["positions"][order.asset]["entry_price"]
            sold_quantity = self.portfolio["positions"][order.asset]["quantity"]
            order.pnl = (order.price - entry_price) * sold_quantity

    def _update_portfolio(self, order_type: OrderType, order: Order):
        if order_type == OrderType.BUY.value:
            if order.asset not in self.portfolio["positions"].keys():
                self.portfolio["positions"][order.asset] = {
                    "quantity": 0.0,
                    "entry_price": 0.0,
                    "total_value": 0.0
                }
            self.portfolio['cash'] -= order.trade_amount
            curr_portfolio = self.portfolio['positions'][order.asset]
            curr_portfolio["quantity"] += order.quantity
            curr_portfolio["total_value"] += order.trade_amount
            curr_portfolio["entry_price"] = (curr_portfolio["total_value"] / curr_portfolio["quantity"]) if curr_portfolio["quantity"] > 0 else 0
            self.portfolio["positions"][order.asset] = curr_portfolio

        elif order_type == OrderType.SELL.value:
            self.portfolio["cash"] += (order.trade_amount - order.commission_charge)
            curr_portfolio = self.portfolio["positions"][order.asset]
            curr_portfolio["quantity"] = 0.0
            curr_portfolio["total_value"]  = 0.0
            curr_portfolio["entry_price"]  = 0.0
            self.portfolio["positions"][order.asset] = curr_portfolio

    def _update_equity_and_drawdown(self, timestamp):
        equity = self.portfolio['cash']
        for asset, position in self.portfolio['positions'].items():
            equity += position['total_value']

        self.equity_history.append((timestamp, equity))

        if equity > self.peak_equity:
            self.peak_equity = equity

        # Calculate drawdown
        dd = 0.0
        if self.peak_equity > 0.0:
            dd = (self.peak_equity - equity) / self.peak_equity

        self.drawdown_history.append((timestamp, dd))

    def calculate_performance(self) -> Dict:

        self.results = {
            'total_returns_pct': 0,
            'total_returns': 0,
            'annual_returns_pct': 0,
            'annual_returns': 0,
            'annual_volatility': 0,
            'sharpe_ratio': 0,
            'sortino_ratio': 0,
            'max_drawdown': 0,
            'win_rate': 0,
            'total_portfolio_value': self.initial_capital,
            'total_trades': 0,
            'peak_equity': self.peak_equity,
        }

        # Skip if no trade
        if not self.trade_history or self.trade_history == []:
            return self.results

        equity_values = pd.Series([val for _, val in self.equity_history])

        returns = equity_values.pct_change().fillna(0)
        cum_returns = (returns + 1).cumprod()
        print("Cumulative returns: ", cum_returns)

        total_returns = (equity_values.iloc[-1] - self.initial_capital)
        total_returns_pct = (total_returns / self.initial_capital)

        n_days = len(returns)
        annual_returns = np.power((1 + total_returns_pct), 252 / n_days) - 1
        annual_volatility = returns.std() * np.sqrt(252)

        # Sharpe Ratio
        sharpe_ratio = annual_returns / annual_volatility if annual_volatility > 0 else 0

        # Sortino Ratio
        downside_returns = returns[returns < 0]
        downside_deviation = downside_returns.std() * np.sqrt(252) if len(downside_returns) > 0 else 0
        sortino_ratio = annual_returns / downside_deviation if downside_deviation > 0 else 0

        # MDD
        max_dd = max([dd for _, dd in self.drawdown_history], default = 0)

        # Trade statistics
        total_trades = len(self.trade_history)
        profitable_trades = sum(1 for trade in self.trade_history if trade.pnl is not None and trade.pnl > 0)
        win_rate = (profitable_trades / total_trades) if total_trades > 0 else 0

        final_equity = equity_values.iloc[-1] if not equity_values.empty else self.initial_capital

        # update results
        self.results = {
            'total_returns_pct': total_returns_pct,
            'total_returns': total_returns,
            'annual_returns': annual_returns,
            'annual_volatility': annual_volatility,
            'sharpe_ratio': sharpe_ratio,
            'sortino_ratio': sortino_ratio,
            'max_drawdown': max_dd,
            'win_rate': win_rate,
            'total_portfolio_value': final_equity,
            'total_trades': total_trades,
            'trade_days': n_days,
            'peak_equity': self.peak_equity,
        }
        return self.results

    def print_results(self):
        if self.results is None:
            print("Backtest has not been executed.")
            return

        print(f"BACKTEST RESULT:")
        print(f"Initial capital: ${self.initial_capital:.2f}")
        print(f"Final Portfolio Value: ${self.results['total_portfolio_value']:.2f}")
        print(f"Total Return: ${self.results['total_returns']:.2f} ({self.results['total_returns_pct'] * 100:.2f}%)")
        print(f"Annualized Return: {self.results['annual_returns'] * 100:.2f}%")
        print(f"Annualized Volatility: {self.results['annual_volatility'] * 100:.2f}%")
        print(f"Sharpe Ratio: {self.results['sharpe_ratio']:.2f}")
        print(f"Sortino Ratio: {self.results['sortino_ratio']:.2f}")
        print(f"Maximum Drawdown (MDD): -{self.results['max_drawdown'] * 100:.2f}%")
        print(f"Win Rate: {self.results['win_rate'] * 100:.2f}%")
        print(f"Total trades: {self.results['total_trades']}")
        print(f"Total trading days: {self.results['trade_days']}")
        print(f"Peak Portfolio Value: ${self.results['peak_equity']}")

    def get_trade_history(self):
        return self.trade_history

    def get_equity_history(self):
        return self.equity_history

    def get_drawdown_history(self):
        return self.drawdown_history
