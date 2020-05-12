# Stage 1

# official image
FROM node:13.12.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# application
COPY . ./

# build
RUN npm run lint
RUN CI=true npm test
RUN npm run build

# Stage 2 - the production environment

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
