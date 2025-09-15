FROM node:18-alpine
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .    
RUN npm run build
EXPOSE 5170
CMD ["npm","run", "preview"]
