#!/usr/bin/env python
# coding: utf-8

# Native
import os
import re

# Third Party
import pprint
import censusdata
import pandas as pd

survey = "acs5"
year = 2018
state = "Missouri"
metro_area = "St. Louis"
MO_metro_counties = ["Franklin", "Jefferson", "Lincoln", "St. Charles", "St. Louis city", "St. Louis", "Warren"]
MO_metro_county_codes= ['071', '099', '113', '183', '510', '189', '219']
IL_metro_counties = ["Bond", "Calhoun", "Clinton", "Jersey", "Macoupin", "Madison", "Monroe", "St. Clair"]
IL_metro_county_codes = ['005', '013', '027', '083', '117', '119', '133', '163']

try:
    census_api_key = os.environ["census_api_key"]
except:
    census_api_key = None

def fetch_metro_area_code(metro_area, survey=survey, year=year):
    geo = censusdata.censusgeo([('metropolitan statistical area/micropolitan statistical area', '*')])
    metro_areas = censusdata.geographies(geo, survey, year, key=census_api_key)
    for metro, code in metro_areas.items():
        if metro.startswith(metro_area):
            return re.search(r'\d+$', str(code)).group()
    return None


def fetch_state_code(state, survey=survey, year=year):
    geo = censusdata.censusgeo([('state', '*')])
    response = censusdata.geographies(geo, survey, year, key=census_api_key)
    state_values = str(response[state])
    state_code = re.search(r"\d+$", state_values)
    return state_code.group()


def fetch_county_code(county, state=state, survey=survey, year=year):
    geo = censusdata.censusgeo([('county', '*')])
    response = censusdata.geographies(geo, survey, year, key=census_api_key)
    
    try:
        _county_ = f"{county} County, {state}"
        county_values = str(response[_county_])
    except Exception as err:
        _county_ = f"{county}, {state}"
        county_values = str(response[_county_])
        
    county_code = re.search(r"\d+$", county_values)
    return county_code.group()


def fetch_tract_codes_by_county(state_code, county_code, survey=survey, year=year):
    geo = censusdata.censusgeo([('state', state_code), ('county', county_code), ('tract', '*')])
    tracts = censusdata.geographies(geo, survey, year, key=census_api_key)
    tract_codes = []
    for tract, code in tracts.items():
        code = re.search(r'\d+$', str(code)).group()
        tract_codes.append((tract, code))
    return tract_codes

# returns tuple containing list of all variables for a table and a corresponding list of labels
def fetch_variables_and_labels(table, survey=survey, year=year):
    results = censusdata.censustable(survey, year, table)
    result_variables = []
    result_labels = []
    for (value, info) in results.items():
        result_variables.append(value)
        result_labels.append(re.sub(r".*[!!]",'',info['label']))
    return(result_variables,result_labels)

def fetch_data_frame(table, state_county_pair):
    fetch_vars = fetch_variables_and_labels(table)
    
    variable_list = fetch_vars[0]
    col_names = fetch_vars[1]
    
    union = pd.DataFrame(columns=variable_list)

    for (state, county) in state_county_pair:
        single_county_df = censusdata.download(survey, year,
                                censusdata.censusgeo([('state', state), ('county', county)]),
                                variable_list,
                                census_api_key,
                                'detail')

        union = pd.concat([union, single_county_df], sort = True)

    union.columns = col_names
    
    union = union.apply(pd.to_numeric)

    union.replace({-666666666: None}, inplace=True)

    return union


metro_code = fetch_metro_area_code(metro_area)
MO_state_code = fetch_state_code(state)
IL_state_code = fetch_state_code(state="Illinois")

geo = censusdata.censusgeo([('state', MO_state_code), ('county', '*')])
MO_counties = censusdata.geographies(geo, survey, year, key=census_api_key)

geo = censusdata.censusgeo([('state', IL_state_code), ('county', '*')])
IL_counties = censusdata.geographies(geo, survey, year, key=census_api_key)

# MO_metro_county_codes = [fetch_county_code(county) for county in MO_metro_counties]
# IL_metro_county_codes = [fetch_county_code(county, state="Illinois") for county in IL_metro_counties]

MO_metro_tract_codes = [fetch_tract_codes_by_county(MO_state_code, county_code) for county_code in MO_metro_county_codes]
IL_metro_tract_codes = [fetch_tract_codes_by_county(IL_state_code, county_code) for county_code in IL_metro_county_codes]