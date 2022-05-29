# Salesforce DX Project: Bookshelf
#Books from GoogleAPIs

-check org
sfdx force:org:list

-open org
sfdx force:org:open -u [username/aliase]

-install app
sfdx force:package:install --wait 10 --publishwait 10 --package Bookshelf@0.1.0-2 -r -u [username/aliase] 

OR

Package Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3X000003Sl1pQAC
