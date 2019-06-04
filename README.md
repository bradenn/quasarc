# Quasarc
![GitHub release](https://img.shields.io/github/release-pre/bradenn/quasarc.svg)
![GitHub top language](https://img.shields.io/github/languages/top/bradenn/quasarc.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/26d9de7283b542aa966e1566259a29de)](https://www.codacy.com/app/bradenn/quasarc?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bradenn/quasarc&amp;utm_campaign=Badge_Grade)

A beta version is now available at https://quasarc.bradenn.com

Quasarc is a Node.js based media network. Quasarc uses Node, Express, EJS, MongoDB, Mongoose, and a plethera of other Node tools.
This is a pet project of mine, this project gets repurposed quite often.

I started this project with zero knowledge of Javascript or Node. I pretty much dove in with my eyes closed. Everything has been a learning experience.

### Documentation
The app model has recently been updated from an REST Api server-client system to a pure server-client model.
###### There is no longer a non-deprecated REST API. (One will be added later)

### Installation 
```
git clone https://github.com/bradenn/quasarc.git
cd quasarc
npm install
npm start
```

#### The config file is excluded for security reasons
You will need to generate your own with the following format.
The file is app/config/env.json
```
{
  "port": port,
  "host": "host",
  "mongourl": "mongodb://user:pass@host/db",
  "database": "db",
  "mail": {
    "host": "host",
    "post": 587,
    "auth": {
      "user": "email",
      "pass": "pass"
    }
  }
}
```
