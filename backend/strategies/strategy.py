import numpy as np
import pandas as pd
from enum import Enum
from abc import ABC, abstractmethod
from typing import Dict, Optional, List, Tuple, Any

class Signal(Enum):
    BUY = 1
    SELL = -1
    HOLD = 0

class Strategy(ABC):
    """
    Abstract class for all trading strategies.
    Define the interface that all strategy implementation should follow.
    """
    def __init__(self,
                 train_data: pd.DataFrame = None,
                 indicators: Optional[Any] = None,
                 model: Optional[Any] = None,
                 risk_tolerance_level: float = 0.4
                 ):
        self.train_data = None
        self.indicators: Optional[Any] = None  # to define any model indicators to be used
        self.risk_tolerance_level: float = risk_tolerance_level
        self.model: Optional[Any] = None

    @abstractmethod
    def generate_signals(self, data: pd.DataFrame) -> np.ndarray | pd.Series:
        """
        Contain signal generation logics to generate trading signal based on input data
        :param data: DataFrame containing market or on-chain data
        :return: Signals in Pandas Series format
        """
        raise NotImplementedError(
            "Method not implemented."
        )

    @abstractmethod
    def update_models(self, data: pd.DataFrame) -> None:
        """
        Update the models using input data (usually periodically when the model effectiveness below target SR
        """
        raise NotImplementedError(
            "Method not implemented."
        )

    # TODO: Apply the risk management strategy and update the backtester engine to support multi-assets trading
    def apply_risk_management(self):
        pass

    # TODO: Calculate position sizing and update the backtester engine to support multi-assets trading
    def calculate_position_size(self):
        pass
