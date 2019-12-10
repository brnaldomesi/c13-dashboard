# Build environment
FROM node:12-alpine as base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install

# Dev environment
FROM base as dev
EXPOSE 3000
COPY . /app
CMD ["npm", "start"]

# Deployment builder
FROM base as builder
# TODO: Add support for different environments
#ARG BUILD_ENV=prod
COPY .env.example /app/.env
COPY . /app
RUN npm run build

# Nginx server
FROM nginx:alpine
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html
