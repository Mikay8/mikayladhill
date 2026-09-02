FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY src ./src

ENV PATH="/app/node_modules/.bin:${PATH}"

CMD ["npm", "start"]
