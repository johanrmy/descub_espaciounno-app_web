FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y git

ARG GITHUB_TOKEN
RUN git clone https://johanrmy:${GITHUB_TOKEN}@github.com/johanrmy/descub_espaciounno-app_web.git .

COPY .env .

RUN npm install

EXPOSE 5173

# Para desarrollo:
CMD ["npm", "run", "dev"]

# Si es para producción:
# CMD ["npm", "run", "build"]
