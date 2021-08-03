FROM node:14

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
