# create dockerfile for nodejs
FROM node:alpine3.16
# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# install app dependencies
COPY package.json .babelrc .env .prettierrc .travis.yml /usr/src/app/
RUN npm install
# bundle app source
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]
