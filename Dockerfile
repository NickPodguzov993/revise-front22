FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as production

RUN mkdir /app
COPY --from=build /app/dist /app
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
