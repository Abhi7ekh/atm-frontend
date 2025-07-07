# ✅ Use official Node.js LTS image
FROM node:18

# ✅ Set working directory inside container
WORKDIR /app

# ✅ Copy dependency definitions
COPY package*.json ./

# ✅ Install backend dependencies
RUN npm install

# ✅ Copy the rest of the project files
COPY . .

# ✅ Expose backend server port
EXPOSE 5000

# ✅ Start the server (use your start script)
CMD ["npm", "start"]
