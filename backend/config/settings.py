import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

# Base directory
BASE_DIR =Path(__file__).resolve().parent.parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
BACKEND_DIR = BASE_DIR / "backend"

# Path configurations
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR  = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"

MODELS_DIR = BASE_DIR / "models"

DIRECTORIES = [
    DATA_DIR,
    RAW_DATA_DIR,
    PROCESSED_DATA_DIR,
    MODELS_DIR
]

# Job execution configurations
JOB_INTERVAL = 7

# API Configurations
CYBOTRADE_API_KEY =os.getenv("CYBOTRADE_API_KEY")
CYBOTRADE_ROOT_URL = "https://api.datasource.cybotrade.rs/"
CRYPTOQUANT_API_URL = "https://api.datasource.cybotrade.rs/cryptoquant"
DEFAULT_LIMIT = 25000

# API Endpoints Configurations
ENDPOINTS_PARAMS = {
        "exchange-flows": {
            "reserve": { "exchange": "all_exchange", "window": "hour" },
            "netflow": { "exchange": "all_exchange", "window": "hour" },
            "inflow": { "exchange": "all_exchange", "window": "hour" },
            "outflow": { "exchange": "all_exchange", "window": "hour" },
            "transactions-count": { "exchange": "all_exchange", "window": "hour" },
            "addresses-count": { "exchange": "all_exchange", "window": "hour" }
        },
        "flow-indicator": {
            "mpi": { "window": "day" },  # Miner's Position Index
            "exchange-whale-ratio": { "exchange": "all_exchange", "window": "hour" },
            "exchange-supply-ratio": { "exchange": "all_exchange", "window": "hour" },
            "miner-supply-ratio": { "miner": "all_miner", "window": "hour" },
            # "bank-supply-ratio": { "exchange": "all_exchange", "window": "day" }
        },
        "market-indicator": {
            "estimated-leverage-ratio": { "exchange": "all_exchange", "window": "hour" },
            "stablecoin-supply-ratio": { "window": "day" },
            "mvrv": { "window": "day" },  # Market-Value-to-Realized-Value
            "sopr": { "window": "day" },  # Spent Output Profit Ratio
        },
        "network-indicator": {
            "nvt": { "window": "day" },  # Network Value to Transaction (supply_total * price_usd)
            "nvt-golden-cross": { "window": "day" },
            "nvm": { "window": "day" },  # Network Value to Metcalfe Ratio
            "puell-multiple": { "window": "day" },
            "nupl": { "window": "day" },  # Net Unralized Profit and Loss
            "nrpl": { "window": "day" },  # Net Realized Profit and Loss
        },
        "miner-flows": {
            "reserve": { "miner": "all_miner", "window": "hour" },
            "netflow": { "miner": "all_miner", "window": "hour" },
            "inflow": { "miner": "all_miner", "window": "hour" },
            "outflow": { "miner": "all_miner", "window": "hour" },
            "transactions-count": { "miner": "all_miner", "window": "hour" },
            "addresses-count": { "miner": "all_miner", "window": "hour" }
        },
        "market-data": {
            "price-ohlcv": { "market": "spot", "exchange" : "all_exchange", "window": "hour" },
            "open-interest": { "exchange": "all_exchange", "window": "hour" },
            "taker-buy-sell-stats": { "exchange": "all_exchange", "window": "hour" },
            "liquidations": { "exchange": "all_exchange", "window": "hour" },
            # "capitalization": { "window": "day" },
            "coinbase-premium-index": { "window": "hour" }
        },
        "network-data": {
            "transactions-count": { "window": "hour" },
            "addresses-count": { "window": "hour" },
            "fees-transaction": { "window": "hour" },
            "blockreward": { "window": "hour" },
            "difficulty": { "window": "hour" }
        }
    }

ENDPOINT_COLUMNS = {
    'exchange-flows': [
        "reserve", "reserve_usd", "netflow_total", "inflow_total", "inflow_top10", "inflow_mean", "inflow_mean_ma7",
        "outflow_total", "outflow_top10", "outflow_mean", "outflow_mean_ma7", "transactions_count_inflow",
        "transactions_count_outflow", "addresses_count_inflow", "addresses_count_outflow"
    ],
    'miner-flows': [
        "reserve", "reserve_usd", "netflow_total", "inflow_total", "inflow_top10", "inflow_mean", "inflow_mean_ma7",
        "outflow_total", "outflow_top10", "outflow_mean", "outflow_mean_ma7", "transactions_count_inflow",
        "transactions_count_outflow", "addresses_count_inflow", "addresses_count_outflow"
    ],
    'market-data': [
        "high", "low", "open", "close", "volume", "open_interest", "taker_buy_ratio", "taker_sell_ratio",
        "taker_buy_sell_ratio", "taker_buy_volume", "taker_sell_volume", "long_liquidations",
        "long_liquidations_usd", "short_liquidations", "short_liquidations_usd", "coinbase_premium_gap",
        "coinbase_premium_gap_usdt_adjusted", "coinbase_premium_index", "coinbase_premium_index_usdt_adjusted"
    ],
    "network-data": [
        "transactions_count_total", "transactions_count_mean", "addresses_count_active", "addresses_count_sender",
        "addresses_count_receiver", "fees_transaction_mean", "fees_transaction_mean_usd", "fees_transaction_median",
        "fees_transaction_median_usd", "blockreward", "blockreward_usd", "difficulty"
    ],
    "flow-indicator": [
        "mpi", "exchange_whale_ratio", "exchange_supply_ratio", "miner_supply_ratio"
    ],
    "market-indicator": [
        "estimated_leverage_ratio", "stablecoin_supply_ratio", "mvrv", "sopr"
    ],
    "network-indicator": [
        "nvt", "nvt_golden_cross", "nvm", "puell_multiple", "nupl", "nup", "nul", "nrpl"
    ]
}

def create_directories():
    for directory in DIRECTORIES:
        directory.mkdir(parents=True, exist_ok=True)

create_directories()