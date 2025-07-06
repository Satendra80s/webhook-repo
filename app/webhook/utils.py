import pytz
from datetime import datetime


def convert_iso_to_utc_string(local_timestamp:str)->str:
    local_dt = datetime.fromisoformat(local_timestamp)
    utc_dt = local_dt.astimezone(pytz.utc)
    utc_timestamp = utc_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    return utc_timestamp