# Teste Técnico - React + Node.js

## Sobre o projeto

Aplicação desenvolvida para o teste técnico contendo:

* Cadastro de Grupos
* Cadastro de Produtos
* Pesquisa por código
* Edição de registros
* Exclusão de registros
* Validações de formulário
* Integração com banco de dados Firebird

## Tecnologias utilizadas

### Front-end

* React
* TypeScript
* React Router

### Back-end

* Node.js
* Express
* TypeScript
* Firebird
* Zod

---

## Estrutura do projeto

```text
/
├── frontend
└── backend
```

---

## Pré-requisitos

* Node.js 22+
* Yarn
* Firebird

---

## Configuração do banco de dados

No diretório `backend`, criar um arquivo `.env` com as seguintes variáveis:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3050
DB_DATABASE=C:/database/app.fdb
DB_USER=SYSDBA
DB_PASSWORD=masterkey

NODE_ENV=development
```

Ajustar os valores conforme o ambiente utilizado.

---

## Scripts SQL

Os scripts de criação das tabelas estão disponíveis em:

backend/src/database/scripts

## Executando o Back-end

Entrar na pasta:

```bash
cd backend
```

Instalar dependências:

```bash
yarn
```

Executar:

```bash
yarn dev
```

Servidor disponível em:

```text
http://localhost:3000
```

---

## Executando o Front-end

Entrar na pasta:

```bash
cd frontend
```

Instalar dependências:

```bash
yarn
```

Executar:

```bash
yarn dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

## Funcionalidades implementadas

### Grupo

* Criar grupo
* Pesquisar grupo por código
* Editar descrição
* Excluir grupo
* Visualizar quantidade de produtos vinculados

### Produto

* Criar produto
* Pesquisar produto por código
* Editar produto
* Excluir produto
* Validação de valor maior que zero

---

## Observações

* Não é permitido excluir grupos que possuam produtos vinculados.
* As mensagens de sucesso e erro são exibidas através de notificações na interface.
* O projeto foi desenvolvido utilizando TypeScript tanto no front-end quanto no back-end.

```
```
