# Star Wars API [![](https://travis-ci.com/bmdefreitas/star-wars-api.svg?branch=master)](https://travis-ci.com/bmdefreitas/star-wars-api)

REST API Star Wars com NodeJS

## Iniciando com Docker

Clonar o repositório

```
git clone https://github.com/bmdefreitas/star-wars-api.git
```

Iniciando com docker compose

```
docker-compose up
```


## Iniciando sem Docker

Clonar o repositório

```
git clone https://github.com/bmdefreitas/star-wars-api.git
```

Instalar as dependências

```
npm install
```

*Antes de iniciar a API se faz necessário uma instância de mongo configurada. Caso tenha um mongodb em localhost, nada precisa ser configurado. Se quiser configurar um mongodb remoto, configurar a váriavel de ambiente: **MONGOURL**, com a URL de conexão.*


Iniciando a API

```
npm start
```

Inciando em modo DEV

```
npm run start:dev
```

## Testando

Testando a API

```
npm test
```

Somente teste unitário

```
npm run test:unit
```

Somente teste de integração

```
npm run test:integration
```

## Rotas

```
GET    http://localhost:3000/api/v1/planetas
GET    http://localhost:3000/api/v1/planetas/1
GET    http://localhost:3000/api/v1/planetas/search?nome=Planeta
POST   http://localhost:3000/api/v1/planetas
PUT    http://localhost:3000/api/v1/planetas/1
DELETE http://localhost:3000/api/v1/planetas/1
```


## Documentação

Gerando a documentação com JSDoc

```
npm run docs
```
