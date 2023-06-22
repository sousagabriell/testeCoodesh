# Gerador de email genérico 
## gerador de email genérico utilizando angular, jest e GraphQL

[![N|Solid](https://miro.medium.com/v2/resize:fit:2000/1*2oakMxz7qaf1cYplH6Pcbw.jpeg)](https://nodesource.com/products/nsolid)

Sistema web de e-mail temporário que permite aos usuários proteger sua privacidade online. Ao gerar um endereço de e-mail temporário exclusivo, os usuários podem utilizar serviços online sem expor seu e-mail real, evitando spam e ataques indesejados.

## Funcionalidades:


- Geração de E-mails Temporários: Os usuários podem gerar um endereço de e-mail temporário único através do sistema
- Exibição do Endereço de E-mail Temporário: O sistema exibe o endereço temporário gerado para os usuários.
- Recebimento e Visualização de E-mails: Os usuários podem receber e visualizar os e-mails enviados para seus endereços temporários através do sistema.

## Features: 

- ⚒️Notificação a cada novo email
- ⚒️Corrigir email inválido
- ⚒️Error 429 da Api após muito tempo na aplicação


## Tecnologias Utilizadas
- Angular 16
- Apollo (Interpretador de API GraphQL)
- GraphQL
- Jest
- Bootstrap 5 
- TypeScript
- Docker
- Ferramenta https://cors-anywhere.herokuapp.com (remoção de CORS da API)

## Installation

O Projeto precisa de um ambiente Angular v16+ para iniciar.

```sh
cd testeCoodesh
npm i --force
ng serve
```

Para gerar uma nova imagem Docker tenha uma versão do Docker Desktop instalada e siga os sguintes comandos.

```sh
ng build
docker build -t av-app-image
```

## Testes unitários

para visualizar os testes unitários da aplicação utiliza o seguinte comando:
```sh
npm test
```

## Deploy

O deploy do site foi feito na plataforma Vercel e é possivel acessar-la através da url

🌐 https://teste-coodesh-bda6qf7i5-sousagabriell.vercel.app



This is a challenge by Coodesh
