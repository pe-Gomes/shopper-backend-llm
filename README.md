# REST API para Leitura de Consumo de água e gás

O serviço REST API foi desenvolvido para disponibilizar informações de consumo
de água e gás.

O serviço foi desenvolvido utilizando TypeScript e o framework Fastify.

## Endpoints

- [X] POST /upload - Recebe uma imagem em base64 e envia para análise do Gemini.
- [X] GET /confirm - Valida ou corrige a análise.
- [X] GET /list - Retorna todas as leituras de água e gás realizadas por usuário/consumidor.

## Requisitos Funcionais

- [X] Deve receber uma imagem em base64 e enviá-la para análise do Gemini.
- [X] A descrição provida pelo Gemini deverá ser persistida em um banco de dados e
retornar um link temporário da imagem avaliada.
- [X] Cada usuário poderá ter apenas conferir uma leitura de água e uma de gás do mês.
- [X] O usuário/consumidor poderá validar e/ou corrigir a leitura de água e gás de
uma análise em específico.
- [X] O usuário/consumidor poderá visualizar todas as leituras de água e gás que
foram realizadas.
- [X] O usuário/consumidor poderá filtrar a listagem de leituras por "WATER"
ou "GAS", diferenciando letras maiúsculas de minúsculas.

## Requisitos Não Funcionais

O serviço deverá ser desenvolvido em TypeScript e Node.js.
Os dados deverão ser persistidos em um banco de dados, sendo escolhido o PostgreSQL.
A variável de ambiente da API Key do Gemini deverá ser armanezada pelo nome: `GEMINI_API_KEY`.
O serviço e DB deverão ser disponibilizados em uma imagem de container Docker
com docker compose.

## Entidades

### Costumer (Consumidor)

- id: UUID
- costumer_code: text

### Readings / Measurements (Leituras)

- id: UUID
- costumer_code: UUID (references costumer_code)
- measure_type: enum('water', 'gas')
- measure_value: integer
- measure_datetime: timestamp
- measure_image: text
- is_confirmed: timestamp (nullable) or boolean
