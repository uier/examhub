# examhub  

A website that collects various past exams, developed and managed by NTNU CSIE.


## Get Started

1. 📦 Clone this project.
2. 🔒 Set files: `.env` & `oauth2.keys.json` (google oauth2) under `/server/src/config`.
   ```
   # .env example
   NODE_ENV=___________
   SECRET=______________________________
   MYSQL_ROOT_PASSWORD=________
   MYSQL_USER=________
   MYSQL_PASSWORD=________
   MYSQL_DATABASE=________
   DB_HOST=db
   DB_PORT=3306
   SENTRY_DSN=________________________________________
   ```
3. 🚀 Run Server.
   - development (run at localhost:8080)
   ```
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
   ```
   - production  
   ```
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```
