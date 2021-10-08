### FBank

O objetivo do projeto é simular um sistema bancário que será composto por quatro microserviços, sendo eles: 

### Account Service

Serviço responsável por gerir os dados de um conta bancária.

### Entry Service

Serviço responsável por gerir os lançamentos realizados (Depósitos, Débitos e Créditos).

### Credit Analizer Service

Serviço responsável por analisar se o cliente tem saldo ou cŕedito suficiente para efetivar um lançamento.

### Notification Service

Serviço responsável por emitir notificações para os cliente sobre lançamentos

### Patterns que serão aplicados no projeto

 - Database per service (https://microservices.io/patterns/data/database-per-service.html)
 - EDA
 - Saga (https://microservices.io/patterns/data/saga.html)

### Arquitetura Macro

![Arquitetura Macro](./docs/img/FBank.png)

### Instalando dependências

`npm install`

### Rodando o projeto localmente (Docker + Localstack)

1. Inicialize o localstack através do comando: `docker-compose up`
2. Faça o deploy do projeto no localstack através do comando: `sls deploy --stage local`


# REST APIs

## Account Service

`POST /accounts`

Request
```json
{
    "customerName": "Felipe",
    "customerWage": 1200,
    "password": "1234"
}
```

Response
```json
{
    "id": "77d60c70-f109-4078-8a89-49dc9c345443",
    "customerName": "Felipe",
    "customerWage": 1200
}
```

`PUT /accounts/{id}`

Request
```json
{
    "customerWage": 600
}
```

Response
```json
{
    "id": "77d60c70-f109-4078-8a89-49dc9c345443",
    "customerName": "Felipe",
    "customerWage": 600
}
```

## Entry Service

`POST /entry`

Regras negociais:
1. Requests com valor menor que 100 reais serão aprovados pelo analizador de credito, valores maiores serão sempre reprovados
2. Requests com valor menor que 50 reais não terão a notificação processada com sucesso, valores maiores serão processados com sucesso

Request
```json
{
    "accountId": "77d60c70-f109-4078-8a89-49dc9c345443",
    "amount": 200,
    "password": "123",
    "type": "CREDIT"
}
```

Response
```json
{
    "id":"778d9023-1ac6-4f7b-b383-1070c5122e48",
    "accountId":"77d60c70-f109-4078-8a89-49dc9c345443",
    "amount":200,
    "type":"CREDIT",
    "status":"PENDING"
}
```


`GET /entry/{id}`
TODO: Return current entry status


# Async APIs

## Credit Analyzer Service

Pub:
 - reserve.customer.credit.command.v1

Sub:
 - customer.credit.reserved.v1
 - customer.credit.unavailable.v1


## Notification Service

Pub: 
 - send.notification.v1

Sub:
 - notification.sended.v1
 - notification.error.v1