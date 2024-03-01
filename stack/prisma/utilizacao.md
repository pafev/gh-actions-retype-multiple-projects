---
order: 1
icon: file-code
label: "Como usar Prisma ORM ?"
author:
  name: Padovesi
  # avatar: ../../Imagens DocStruct/Logos/logo_struct.png
date: 2023-10-19
category: Utilização
tags:
  - utilização
  - orm
  - prisma
---

## Criando Models (Prisma CLI)

O Prisma tem sua própria sintaxe para declarar o schema no banco de dados.

<!-- syntax highlighting de go porque não existe de Prisma -->

```go
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id       Int      @id @default(autoincrement())
  username String
  email    String   @unique
  posts    Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

É interessante notar que o `prisma.schema` possui 3 partes:

- **generator**: declara quais _assets_ (artefatos/arquivos) são criados ao rodar o comando `generate` do prisma.
- **datasource**: Declare qual o **SGBD** (Sistema de Gerenciamento de Banco de Dados) utilizado, e a **url de conexão** ao banco de dados do projeto.
- **models**: Isso é a modelagem de fato do banco de dados, que vai para o schema do banco de dados do projeto;

Veja mais na [documentação deles](https://www.prisma.io/docs/concepts/components/prisma-schema).

!!! Autenticação por biblioteca
Atenção que ao usar autenticação por biblioteca pode ser necessário conformar as tabelas do banco de dados à biblioteca!! Por exemplo, o [Next Auth requer 3 models](https://authjs.dev/reference/adapter/prisma#create-the-prisma-schema-from-scratch) com certos atributos para que funcione corretamente.
!!!

### Efetivando as alterações no prisma.schema

É possível gerar migrações em `.sql` - ou seja, arquivos escritos em código _sql_, que contém as alterações realizadas no `schema.prisma` (desde a última migração) e que devem ser realizadas no schema do seu banco de dados -, ou simplesmente forçar o schema do banco de dados a atualizar. **Em desenvolvimento, o recomendado é** forçar a atualização, e simplesmente **rodar** o seguinte comando:

+++ PNPM

```bash
pnpm prisma db push
```

+++ BUN

```bash
bunx prisma db push
```

+++ NPM

```bash
npx prisma db push
```

+++ YARN

Não

+++

!!! push ou migrate?
O Prisma também permite gerar migrações em _sql_ (útil em ambiente de produção). Em ambiente de desenvolvimento, usar `db push` para forçar a mudança no banco de dados facilita nossa vida.

As migrações em _sql_ dão maior liberdade para escrever scripts na migração.
!!!

### Mais sobre

[Documentação Criação de Models](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-a-default-value)

[Documentação Relacionamento entre Models](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

## CRUD

CRUD é uma acrônimo para as quatro maneiras básicas de se operar com informações armazenadas em uma aplicação. Estas operações são: **Create**, **Read**, **Update** e **Delete**.

Então, a seguir seguem formas de construirmos um CRUD utiilizando o Prisma, para interação com as instâncias do nosso banco de dados.

**Verifique** que já [**criou** uma instância do prisma **client**](./instalacao.md#configuração-do-prisma-client).

Neste exemplo, estamos rodando os arquivos com ts-node, que transpila o TypeScript e roda o JavaScript resultante com Node. A ideia é a mesma usando api em Express, NextJS, etc.

### Create

1. Criar um arquivo TypeScript

```bash
touch create.ts
```

2. Modificar o arquivo typescript

```ts
// create.ts

import { prisma } from "./prisma";

async function createUser(username, email) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      // ...
    },
  });
  return user;
}

createUser("john_doe", "john@example.com").then((user) => {
  console.log("Usuário criado:", user);
});
```

3. Executar arquivo typescript

+++ PNPM

```bash
pnpm ts-node create.ts
```

+++ BUN

```bash
bunx ts-node create.ts
```

+++ NPM

```bash
npx ts-node create.ts
```

+++ YARN

Não

+++

### Read (Index)

1. Criar um arquivo TypeScript

```bash
touch index.ts
```

2. Modificar o arquivo typescript

```ts
// index.ts

import { prisma } from "./prisma";

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

getAllUsers().then((users) => {
  console.log("Usuários encontrados:", users);
});
```

3. Executar arquivo typescript

+++ PNPM

```bash
pnpm ts-node index.ts
```

+++ BUN

```bash
bunx ts-node index.ts
```

+++ NPM

```bash
npx ts-node index.ts
```

+++ YARN

Não

+++

### Read (Show)

1. Criar um arquivo TypeScript

```bash
touch show.ts
```

2. Modificar o arquivo typescript

```ts
// show.ts

import { prisma } from "./prisma";

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

getUserById(1).then((user) => {
  console.log("Usuário encontrado:", user);
});
```

3. Executar arquivo typescript

+++ PNPM

```bash
pnpm ts-node show.ts
```

+++ BUN

```bash
bunx ts-node show.ts
```

+++ NPM

```bash
npx ts-node show.ts
```

+++ YARN

Não

+++

### Update

1. Criar um arquivo TypeScript

```bash
touch update.ts
```

2. Modificar o arquivo typescript

```ts
import { prisma } from './prisma';

async function updateUser(userId, newData) {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      data: newData
    },
  });
  return user;
}

updateUser(1, {'new_email@example.com'})
  .then((user) => {
    console.log('Usuário atualizado:', user);
  })
```

3. Executar arquivo typescript

+++ PNPM

```bash
pnpm ts-node update.ts
```

+++ BUN

```bash
bunx ts-node update.ts
```

+++ NPM

```bash
npx ts-node update.ts
```

+++ YARN

Não

+++

### Delete

1. Criar um arquivo TypeScript

```bash
touch delete.ts
```

2. Modificar o arquivo typescript

```ts
// delete.ts

import { prisma } from "./prisma";

async function deleteUser(userId) {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return user;
}

deleteUser(1).then((user) => {
  console.log("Usuário excluído:", user);
});
```

3. Executar arquivo typescript

+++ PNPM

```bash
pnpm ts-node delete.ts
```

+++ BUN

```bash
bunx ts-node delete.ts
```

+++ NPM

```bash
npx ts-node delete.ts
```

+++ YARN

Não

+++

### Mais sobre

[Documentação CRUD do Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

## Criando uma seed

Vendo as operações de CRUD, é meio claro que para criarmos uma seed, basta usarmos a ideia do [create](#create).

1. Crie o arquivo `seed.ts`;

```bash
touch prisma/seed.ts
```

```ts
// prisma/seed.ts

import { prisma } from "./prisma";

async function seed() {
  await prisma.user.create({
    data: {
      username,
      email,
      // ...
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "TITO",
      body: "opa eae",
    },
  });
}

seed()
  .then(() => {
    console.log("Seed realizada com sucesso");
  })
  .catch((err) => {
    console.error(err.message);
  })
  .finally(() => {
    prisma.$disconnect();
  });
```

2. Caso não já esteja no projeto, adicione o pacote `ts-node`;

+++ PNPM

```bash
pnpm add ts-node
```

+++ BUN

```bash
bun add ts-node
```

+++ NPM

```bash
npm install ts-node
```

+++ YARN

Não

+++

3. Adicione um script ao `package.json` que facilitará rodar a seed:

```json
{
  "scripts": {
    ...outros scripts,
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

!!!warning

**Caso** você esteja num repositório **Next**, ou outro repositório onde não possa colocar o `{ "type": "module" }` no `package.json`, deixe o script da seguinte maneira:

```json
{
  "scripts": {
    "db:seed": "ts-node --compiler-options {\\\"module\\\":\\\"CommonJS\\\"} prisma/seed.ts"
  }
}
```

!!!

Agora, para rodar a seed do projeto basta usar o comando:

+++ PNPM

```bash
pnpm db:seed
```

+++ BUN

```bash
bun run db:seed
```

+++ NPM

```bash
npm run db:seed
```

+++ YARN

Não

+++

## Mais detalhes (Referência da API)

[Referência da API](https://www.prisma.io/docs/reference/api-reference)
