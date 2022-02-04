<div align="center">
    <img src="/seeds/assets/images/Blockchain%20Australia%20Solutions.svg" width="500" style="padding:30px;">
    <br />
    <h1>   
        NFT Blockchain Australia
    </h1>
</div>

## Prerequsite

- NodeJS >= v12.18.3
- mongoDB >= v4.2.3

## Installation

1. clone repo
```
$ git clone https://gitlab.com/Yudiz-Blockchain/nft-blockchain-australia.git
$ cd nft-blockchain-australia
```
2. create `.env` file 
3. add following data:
```
# Development
NODE_ENV = dev

# SERVER DETAILS
URL = Server_IP_Address_or_domain_url
PORT = Server_Port

# DB DETAILS
DB_URL=Your_db_url

# SMTP DETAILSSMTP_HOST= Your_SMTP_Host
SMTP_PORT= Your_SMTP_Port
SMTP_USERNAME = Your_SMTP_Username
SMTP_PASSWORD = Your_SMTP_Password
SMTP_FROM = Your_SMTP_MailId
CONTACT_US_MAIL = Your_Contact_Mail
SUPPORT_MAIL = Your_Support_Mail

# JWT KEY
JWT_SECRET = jwt-secret

# URL
# SERVER_URL = 
WEB3_PROVIDER_URL = https://mainnet.infura.io/v3/Your_API_Key
API_ETHPLORER_URL = https://api.ethplorer.io

# STRIPE PAYMENT KEY
PINATAAPIKEY = Your_API_Key
PINATASECRETAPIKEY = Your_API_Secret
```
4. install node modules
```
$ npm i
```
5. start web server
```
$ npm start
```
6. server will start on port define in `.env` or `3000`(default).
