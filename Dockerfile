# Usa la imagen base de Node.js
FROM node:latest

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación al contenedor
COPY . .

# Expone el puerto que utiliza la aplicación 
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]