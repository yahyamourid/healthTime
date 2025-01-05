FROM node:21.1.0-alpine as builder 
WORKDIR /app 
COPY . .  
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm install zxcvbn zod
RUN npm run build

CMD ["npm", "run", "dev"]