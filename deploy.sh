#!/bin/bash
ls
gulp bundle --ship
gulp package-solution --ship
cd sharepoint/solution
o365 spo app add --filePath ./customizer-lifecycle-events.sppkg --scope sitecollection --appCatalogUrl https://xx.sharepoint.com/sites/VelinDev96 --overwrite --verbose
o365 spo app deploy --name customizer-lifecycle-events.sppkg --scope sitecollection --appCatalogUrl https://xx.sharepoint.com/sites/VelinDev96 --skipFeatureDeployment --verbose
