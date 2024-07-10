# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Copy the rest of the application code
COPY . .

# Expose the port the server will run on
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]
