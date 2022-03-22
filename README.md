# fire-nearby (firenearby service front-end)
This is a basic mapbox map hosted at [caseymm.github.io/firenearby](caseymm.github.io/firenearby). The map is set up to display geojson passed to it through the url search parameters.

Data source: https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-last-24-hour-wildland-fire-locations/about
Showing fires in the last 24 hours greater than 1 acre

e.g. 
https://caseymm.github.io/fire-nearby/#/screenshot?userLoc=-120.4473,37.73574&userLocName=My%20house&fireLoc=-121.4473,37.73574&fireLocName=Waterloo&screenshot=true

### Locally
- build: `npm run build`
- add, commit, push
- deploy: `npm run deploy`

