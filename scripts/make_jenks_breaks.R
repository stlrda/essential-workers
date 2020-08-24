# Generate Jenks Breaks for the Maps from the Geojson Data
library(sf)
library(classInt)
library(jsonlite)


# Combine MO and IL to Generate Breaks
MOIL <- rbind(
  st_read('data/geojson/MO_Stats.geojson'),
  st_read('data/geojson/IL_Stats.geojson')
)

breaks <- list(
  GDP = classIntervals(MOIL$GDP..Thousands.of.dollars., 8, 'jenks')$brks,
  LaborForce = classIntervals(MOIL$Labor.Force, 8, 'jenks')$brks,
  Unemployment = classIntervals(MOIL$Unemployment.Rate, 8, 'jenks')$brks,
  MedianIncome = classIntervals(MOIL$Median.Income.Essential.Workers, 8, 'jenks')$brks,
  FrontlineRate = classIntervals(MOIL$Frontline.Industry.Rate, 8, 'jenks')$brks
) %>% toJSON()

print(breaks)
