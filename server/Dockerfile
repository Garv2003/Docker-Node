FROM node:alpine
COPY package.json .
WORKDIR /server
COPY . .
RUN npm install
EXPOSE 6969

CMD ["npm" , "start"]