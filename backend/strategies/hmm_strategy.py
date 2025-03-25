import numpy as np
import pandas as pd
from typing import Dict, Optional, Any, List
from backend.strategies.strategy import Strategy, Signal
from backend.tradingbot.hmm_regime_detection import HMMRegimeDetectionModel

class HMMStrategy(Strategy):

    def __init__(self, data: pd.DataFrame, model: Optional[HMMRegimeDetectionModel] = None, features: Optional[List] = None):
        super().__init__()
        self.train_data = data
        self.model = model if model is not None else HMMRegimeDetectionModel()
        self.indicators = features if features is not None else list(data.columns)

    def generate_signals(self, data: pd.DataFrame, train: bool = False):
        # If model is not fitted
        if not self.model.is_fitted:
            self.model.fit(self.train_data[self.indicators])

        regimes = self.model.predict(data[self.indicators])

        df = data[self.indicators].copy()
        df.loc[:, 'regime'] = regimes
        signals = np.where(df['regime'] == 0, Signal.BUY.value,
                                  np.where(df['regime'] == 1, Signal.SELL.value, Signal.HOLD.value))

        print("signals=", signals)
        return signals

    def update_models(self, data: pd.DataFrame) -> None:
        self.train_data = data[self.indicators]
        self.model.fit(self.train_data[self.indicators])
