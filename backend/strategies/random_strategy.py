import numpy as np
import pandas as pd
from backend.strategies.strategy import Strategy, Signal

class RandomStrategy(Strategy):

    def __init__(self):
        super().__init__()

    def generate_signals(self, data: pd.DataFrame) -> pd.Series:

        signals = pd.Series(np.random.choice([Signal.BUY.value, Signal.SELL.value, Signal.HOLD.value], size=data.shape[0], p=[0.05, 0.03, 0.92]), index=data.index)
        return signals

    def update_models(self, data: pd.DataFrame) -> None:
        pass