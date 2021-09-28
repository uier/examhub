# examhub  

A website that collects various past exams, developed and managed by NTNU CSIE.


## deploy

1. Clone this project
2. Set `.env` & `oauth2.keys.json` (google oauth2) in `/server/src/config`
```
# .env example
NODE_ENV=production
SECRET=______________________________
MYSQL_ROOT_PASSWORD=________
MYSQL_USER=________
MYSQL_PASSWORD=________
MYSQL_DATABASE=________
DB_HOST=db
DB_PORT=3306
SENTRY_DSN=________________________________________

```
3. Run `docker-compose up -d`