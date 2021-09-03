FROM node:14-alpine
WORKDIR /app
COPY package*.json .
RUN npm install && npm run clean && npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package*.json .
RUN npm install --production
CMD node -r dotenv/config ./dist/app.js dotenv_config_path=./dist/config/.env
