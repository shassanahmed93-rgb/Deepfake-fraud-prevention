FROM node:22-alpine
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY server ./server
COPY public ./public
COPY data ./data
USER node
EXPOSE 3000
CMD ["node", "server/index.js"]
