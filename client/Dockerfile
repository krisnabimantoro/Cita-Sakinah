FROM node:18-alpine

WORKDIR /src

# Set Node.js memory limit before running npm
ENV NODE_OPTIONS="--max-old-space-size=3072"

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5170
CMD ["npm","run", "preview"]
