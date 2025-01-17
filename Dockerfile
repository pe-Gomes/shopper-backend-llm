FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

RUN npm ci --only=production

EXPOSE 8080

CMD ["npm", "start"]
