FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y git

ARG GITHUB_TOKEN=TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

RUN git clone https://johanrmy:${GITHUB_TOKEN}@github.com/johanrmy/descub_espaciounno-app_web.git .

COPY .env .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "build"]
CMD ["npm", "run", "dev"]
