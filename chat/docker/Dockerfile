FROM node:20
WORKDIR /usr/local/src/chat

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8003
CMD [ "npm", "run", "dev" ]