FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app ./
# COPY --from=builder ./app/ormconfig.js ./ormconfig.js
EXPOSE 4001
CMD ["npm", "run", "start:prod"]