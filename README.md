| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-46.07%25-red.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-17.94%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-44.3%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-49.58%25-red.svg?style=flat) |

# Requirements
- Docker
- DockerCompose
- Yarn/Npm CLI

# Installing and Configuring
    $ yarn install
    $ mv .env.example .env
    $ docker-compose build

# Up the Server
    $ docker-compose up

# Swagger
Abrir  <a href="http://localhost:3000/api/docs">http://localhost:3000/api/docs</a>

#

# Goal
Desenvolver API que deve ser criada com NodeJs + Typescript (NestJS) e banco de dados a sua escolha, é imprescindível o desenvolvimento da documentação com Swagger.

Teste unitário é um diferencial. 

 

# Features
Trata-se de uma API para gerenciar a reservas de veículos, a API deve disponibilizar métodos para login, listagem de veículos, reserva de veículo e liberação de veículo reservado.

 

# Rules
- Para consumir a API o usuário tem que efetuar o login.
- Não pode ser possível reservar um veículo já reservado.
- Cada usuário só pode reservar um veículo por vez.