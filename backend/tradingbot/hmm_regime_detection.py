import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Any
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from hmmlearn.hmm import GaussianHMM
from backend.config.settings import RAW_DATA_DIR, PROCESSED_DATA_DIR, MODELS_DIR

class HMMRegimeDetectionModel:
    """
    Regime detection using Hidden Markov Models (HMM).
    """
    def __init__(self,
                 n_components: Optional[int] = 3,
                 covariance_type: Optional[str] = "full",
                 n_iter: Optional[int] = 1000,
                 scaler_type: Optional[str] = "standard"):
        self.n_components = n_components
        self.covariance_type = covariance_type
        self.n_iter = n_iter
        self.scaler_type = scaler_type
        self.is_fitted = False
        self.scaler = None
        self.hmm = GaussianHMM(n_components=n_components, covariance_type=covariance_type, n_iter=n_iter, random_state=42)
        self._initialize_scaler(scaler_type)

    def _initialize_scaler(self, scaler_type: str):
        if scaler_type == "minmax":
            self.scaler = MinMaxScaler()
        else:
            self.scaler = StandardScaler()

    def fit(self, data: pd.DataFrame) -> None:
        if self.scaler is None:
            self._initialize_scaler(self.scaler_type)

        self.scaler.fit(data)
        scaled_data = self.scaler.transform(data)

        self.hmm.fit(scaled_data)

        print("Model fitted.")
        print(f"Model scoring (log-likelihood) on training data: {self.hmm.score(scaled_data):.4f}")
        self.is_fitted = True

    def predict(self, data: pd.DataFrame) -> pd.Series | None:
        if not self.is_fitted:
            print("Model has not been fitted. Please run the `fit()` function first.")
            return None

        self.features = data.columns
        scaled_data = self.scaler.transform(data)

        predictions = self.hmm.predict(scaled_data)
        # predictions = pd.Series(predictions, index=data.index)

        return predictions

    def get_features(self) -> List[str] | None:
        if not self.is_fitted:
            print("Model has not been fitted. Please run the `fit()` function first.")
            return None

        return self.features
