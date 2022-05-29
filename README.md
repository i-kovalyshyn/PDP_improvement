# Salesforce DX Project: Bookshelf
#Books from GoogleAPIs
<img width="1132" alt="image" src="https://user-images.githubusercontent.com/50191080/170891930-21cd62d7-7cbd-4147-b6c2-fe00cbab3b3c.png">


-check org
sfdx force:org:list

-open org
sfdx force:org:open -u [username/aliase]

-install app
sfdx force:package:install --wait 10 --publishwait 10 --package Bookshelf@0.1.0-2 -r -u [username/aliase] 

OR

Package Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3X000003Sl1pQAC


#Note
After success installing the Bookshelf app please wait 3 min for salesforce to review Security Policy Trusted Sites for googleapis.
