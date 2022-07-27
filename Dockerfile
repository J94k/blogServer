FROM node:18.6.0

ENV PORT 5000
WORKDIR /app

COPY package.json .

RUN npm i --no-progress --prodaction

COPY . .

CMD ["npm", "run", "dev"]
