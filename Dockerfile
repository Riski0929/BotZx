# Gunakan image Node.js yang ringan
FROM node:18-alpine

# Buat direktori kerja di dalam container
WORKDIR /app

# Copy file package.json & install dependencies
COPY package.json ./
RUN npm install

# Copy seluruh source code
COPY . .

# Jalankan app di port 3000
EXPOSE 7860
CMD ["npm", "start"]
