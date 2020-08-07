import requests
import pandas as pd

host = "https://api.census.gov/data"
year = "2010"
dataset = "dec/sf1"
base_url = "/".join([host, year, dataset])

predicates = {}
get_vars = ["NAME", "P001001"]

predicates["get"] = ",".join(get_vars)
predicates["for"] = "state:*"

r = requests.get(base_url, params=predicates)

print(r.json()[0])
col_names = ["name", "total_pop", "state"]

df = pd.DataFrame(columns=col_names, data=r.json()[1:])

df["total_pop"] = df["total_pop"].astype(int)

print(df)