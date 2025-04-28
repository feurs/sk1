# Používame oficiálny Node.js obraz
FROM node:18-alpine

# Nastavíme pracovný adresár
WORKDIR /app

# Skopírujeme package.json a package-lock.json
COPY package*.json ./

# Nainštalujeme závislosti
RUN npm install

# Skopírujeme celý projekt
COPY . .

# Aplikácia bude počúvať na porte 3000
EXPOSE 3000

# Štart servera
CMD ["node", "server/server.js"]
