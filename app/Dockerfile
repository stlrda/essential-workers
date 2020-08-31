# Container for Essential Workers App
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Add and Install Dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm install react-scripts@3.4.1 -g

# Build the App for Production
COPY . ./
RUN npm run build

# Copy Built App to Nginx Webserver
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
