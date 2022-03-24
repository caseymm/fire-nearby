# fire-nearby (firenearby service front-end)
This application is composed of three pages:
1. [Map of recent fires](caseymm.github.io/firenearby)
2. [Sign up form](https://caseymm.github.io/fire-nearby/#/sign-up) to receive alerts
3. [About this map](https://caseymm.github.io/fire-nearby/#/about)

Data source: https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-last-24-hour-wildland-fire-locations/about

### View to generate screenshots for text service
This application also provides a view that the firenearby service uses to generate maps for the text alerts. An example of how to use the service is below.

e.g. 
https://caseymm.github.io/fire-nearby/#/screenshot?userLoc=-120.4473,37.73574&userLocName=My%20house&fireLoc=-121.4473,37.73574&fireLocName=Waterloo&screenshot=true

### Commands
- add, commit, push
- deploy: `npm run deploy`

