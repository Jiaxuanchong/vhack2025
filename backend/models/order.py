from uuid import UUID, uuid4
from enum import Enum
from datetime import datetime
from typing import Dict, List, Optional, Any
from pydantic import BaseModel

class OrderType(Enum):
    BUY = "buy"
    SELL = "sell"

class OrderStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELED = "canceled"
    REJECTED = "rejected"

class Order(BaseModel):  # TODO: Can replace with SQLModel to connect with SQLAlchemy and DB later
    id: UUID = uuid4()
    type: OrderType
    asset: str
    quantity: float
    price: float
    time_created: Optional[datetime] = datetime.now()
    status: Optional[OrderStatus] = OrderStatus.PENDING.value
    execution_price: Optional[float] = None      # Only used in real-time trading mode, not for backtest use
    execution_timestamp: Optional[datetime] = None     # Only used in real-time trading mode, not for backtest use
    trade_amount: Optional[float] = 0.0
    commission_charge: Optional[float] = 0.0
    pnl: Optional[float] = None
    reason: Optional[str] = None
