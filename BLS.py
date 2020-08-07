import pandas as pd
import requests
import json
# import prettytable

from resources.api_keys import bls_api_key

# headers = {'Content-type': 'application/json'}
# data = json.dumps({"seriesid": ['CUUR0000SA0','SUUR0000SA0'],"startyear":"2011", "endyear":"2014"})
# p = requests.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', data=data, headers=headers)
# json_data = json.loads(p.text)
# for series in json_data['Results']['series']:
#     x=prettytable.PrettyTable(["series id","year","period","value","footnotes"])
#     seriesId = series['seriesID']
#     for item in series['data']:
#         year = item['year']
#         period = item['period']
#         value = item['value']
#         footnotes=""
#         for footnote in item['footnotes']:
#             if footnote:
#                 footnotes = footnotes + footnote['text'] + ','
#         'if 'M01' <= period <= 'M12':'
#             x.add_row([seriesId,year,period,value,footnotes[0:-1]])
#     output = open(seriesId + '.txt','w')
#     output.write (x.get_string())
#     output.close()

# BLS API v1 url
base_url = 'https://api.bls.gov/publicAPI/v1/timeseries/data/'

# BLS series id for the civilian labor force participation rate
series = {'id': 'LNS11300000',
        'name': 'Labor Force Participation Rate'}

data_url = '{}{}'.format(base_url, series['id'])
print(data_url)

r = requests.get(data_url).json()
print(r.keys())
resultdata = r['Results']['series'][0]['data']
print (resultdata[0]['value'])

# dates = ['{} {}'.format(i['period'], i['year']) for i in r]
# index = pd.to_datetime(dates)
# data = {series['id']: [float(i['value']) for i in r],
#         'footnotes': [i['footnotes'][0] for i in r]}

# df = pd.DataFrame(index=index, data=data).iloc[::-1]

# df.tail(3)