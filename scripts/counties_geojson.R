# Get GeoJSON for Counties in MO/IL and STL MSA
library(tigris)
library(sf)
library(magrittr)
library(dplyr)

MOIL <- 
  rbind(
    counties(17, class = 'sf'),
    counties(29, class = 'sf')
  ) %>% 
  st_transform(4326)

st_write(MOIL, 'data/geojson/MO_IL_Counties.geojson')

MSA <- 
  MOIL %>%
  filter(
    (STATEFP == '29' & NAME %in% c('Lincoln', 'Warren', 'Franklin', 'Jefferson', 'St. Louis', 'St. Charles') ) |
    (STATEFP == '17' & NAME %in% c('St. Clair', 'Monroe', 'Clinton', 'Madison', 'Jersey') )
  )

st_write(MSA, 'data/geojson/STL_MSA_Counties.geojson')
