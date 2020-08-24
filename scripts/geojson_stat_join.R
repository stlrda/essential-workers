# GeoJSON Join

library(sf)
library(dplyr)
library(magrittr)
library(data.table)

# Load Shapes
MO <- st_read('data/geojson/MO_Counties.geojson')
IL <- st_read('data/geojson/IL_Counties.geojson')
MSA <- st_read('data/geojson/STL_MSA_Counties.geojson')

# Join the Data
county <- fread('resources/county_shapefile.csv')
county$'Median Income Essential Workers' = apply(county, 1, function(x){median(x[5:9], na.rm = TRUE)}) %>% as.integer
county %<>% transmute(
    GEOID = as.character(GeoFips),
    `GDP (Thousands of dollars)`,
    `Labor Force` = `In labor force`,
    `Unemployment Rate`,
    `Median Income Essential Workers`,
    `Frontline Industry Rate`
  )

MO %>%
  select(GEOID, STATEFP, COUNTYFP, NAME, NAMELSAD) %>%
  left_join(county) %>%
  st_write('data/geojson/MO_Stats.geojson')

IL %>%
  select(GEOID, STATEFP, COUNTYFP, NAME, NAMELSAD) %>%
  left_join(county) %>%
  st_write('data/geojson/IL_Stats.geojson')

MSA %>%
  select(GEOID, STATEFP, COUNTYFP, NAME, NAMELSAD) %>%
  left_join(county) %>%
  st_write('data/geojson/MSA_Stats.geojson')
