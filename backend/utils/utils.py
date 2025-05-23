import json
import os
import logging
import time
from datetime import datetime
from backend.config.settings import RAW_DATA_DIR, create_directories

logger = logging.getLogger(__name__)

def save_json(data, filename: str):
    if not os.path.exists(RAW_DATA_DIR):
        create_directories()

    filepath = os.path.join(RAW_DATA_DIR, filename)

    try:
        with open(filepath, "w") as f:
            json.dump(data, f, indent=4)
        logger.info(f"Data saved to {filepath} successfully")
    except IOError as e:
        logger.error(f"Error saving data to {filepath}: {e}")

def load_json(filename: str):
    filepath = os.path.join(RAW_DATA_DIR, filename)

    try:
        with open(filepath, "r") as f:
            data = json.load(f)
        return data
    except (IOError, json.JSONDecodeError) as e:
        logger.error(f"Error loading data from {filepath}: {e}")
        return None

def convert_datetime_to_unix_timestamp(date_time: datetime | str):
    """
    Convert datetime from YYYY-mm-dd HH:MM:SS into UNIX timestamp in milliseconds
    :param date_time: Datetime in string format
    :return: UNIX timestamp in milliseconds
    """
    if type(date_time) == str:
        date_time = datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")
    unix_time = datetime.timestamp(date_time) * 1000
    return unix_time

def convert_unix_timestamp_to_datetime(unix_timestamp: int):
    """
    Convert unix timestamp (in seconds) into datetime in format YYYY-mm-dd HH:MM:SS
    :param unix_timestamp: UNIX timestamp
    :return: datetime
    """
    date_time = datetime.fromtimestamp(unix_timestamp)
    return date_time.strftime("%Y-%m-%d %H:%M:%S")
