import numpy as np
import pandas as pd
from pathlib import Path
from backend.config.settings import RAW_DATA_DIR
from backend.strategies.random_strategy import RandomStrategy
from backend.backtest.backtester import Backtester

def demo():
    # Load market data (price OHLCV)
    filename = "long-btc-market-data.csv"
    filepath = RAW_DATA_DIR / filename
    try:
        df = pd.read_csv(filepath)
        df.set_index('datetime', inplace=True)
        df.sort_index(inplace=True)
        print("File loaded successfully!")
    except FileNotFoundError as err:
        print("File not found.")
        return

    df = df[['close', 'high', 'low', 'open', 'volume']]
    df = df[df.index >= '2020-01-01']
    print(df.head())

    n_samples = df.shape[0]
    train_split_idx = int(0.7 * n_samples)

    train_data = df[:train_split_idx]
    test_data = df[train_split_idx:]

    rand_strategy = RandomStrategy()
    signals = rand_strategy.generate_signals(df)

    backtester = Backtester(df, rand_strategy)
    backtester.run()

    backtester.print_results()
    trade_history = backtester.get_trade_history()
    print("Trading history: ")
    print(trade_history)

    equity_history = backtester.get_equity_history()
    # print("Equity history: ")
    # print(equity_history)


if __name__ == "__main__":
    demo()