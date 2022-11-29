FROM node:alpine
WORKDIR /app
EXPOSE 3080
COPY package.json package-lock.json parkings.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]
