FROM node:20
WORKDIR /app
COPY package.json yarn.lock
RUN yarn
COPY . .
EXPOSE 8081
CMD [ "yarn", "start" ]