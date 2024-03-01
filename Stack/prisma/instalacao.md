---
order: 2
icon: command-palette
label: "Como 'instalar' o Prisma?"
author:
  name: Araújo e Padovesi
  # avatar: ../../Imagens DocStruct/Logos/logo_struct.png
date: 2023-09-24
category: Instalação
---

## Configuração do Prisma CLI.

Primeiro adicione o pacote ao projeto:

+++ PNPM

```bash
pnpm add prisma --save-dev
```

+++ BUN

```bash
bun add prisma --save-dev
```

+++ NPM

```bash
npm install prisma --save-dev
```

+++ YARN

Não. Só... não.

+++

### Criar arquivos `schema.prisma` e `.env`

+++ PNPM

```bash
pnpm prisma init
```

+++ BUN

```bash
bunx prisma init
```

+++ NPM

```bash
npx prisma init
```

+++ YARN

Não

+++

`.env`: o arquivo para definir a URL de conexão do seu banco de dados.

`prisma/schema.prisma`: o arquivo de configuração principal para o seu projeto Prisma (incluirá o seu modelo de dados).

### Conectar o prisma ao seu banco de dados

A maneira mais **fácil** é **usar** o **SQLite**, pois é um banco de dados contido num arquivo, **sem precisar instalar** nada.
Além disso, para limpar o banco de dados, basta deletar o arquivo `.sqlite`.

```bash
#.env

DATABASE_URL="file:./db.sqlite"
```

!!!warning SQLite em produção?
Muitas vezes **não é bom** usar **SQLite em produção**. Por esse motivo, atualmente (em 2023) **trocamos de SQLite para MySQL** ao entrar em produção. Isso **torna necessário** realizar **mudanças**, como adicionar `@db.Text` aos campos String que podem conter mais de 256 caracteres, etc.
!!!

!!! `.env.example`
**Adicione** o conteúdo acima **ao `.env.example`**, caso ele não já esteja lá.

Ajude o coleguinha que daqui 2 anos vai tentar rodar seu projeto.
!!!

## Configuração do Prisma Client

Primeiro adicione o pacote ao projeto:

+++ PNPM

```bash
pnpm add @prisma/client
```

+++ BUN

```bash
bun add @prisma/client
```

+++ NPM

```bash
npm install @prisma/client
```

+++ YARN

Não. Só... não.

+++

### Instanciando um cliente prisma

Para podermos consumir/usar o banco de dados, precisamos instanciar um cliente. Como só deve ser instanciado um cliente por aplicação, é comum centralizarmos o código de instanciação em um único arquivo.

#### Mínima

A forma mais simples de instanciar um novo cliente é:

```ts
// prisma/index.ts
import { PrismaClient } from "@prisma/client";

// exportando tipagens a partir desse arquivo
export * from "@prisma/client";

// exportando o cliente
export const prisma = new PrismaClient();
```

#### Melhorada

A **maneira anterior pode causar vazamento de memória em ambiente de desenvolvimento**. Às vezes ao recarregar a aplicação, que acontece quando salvamos um arquivo, o código que gera o cliente é rodado outra vez. Isso pode acabar gerando várias instâncias.

```ts
// prisma/index.ts
import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

// globalThis é palavra chave para uma variável global em JS
// a passagem é por referência quando usamos objeto
const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// se não estiver em ambiente de produção, guarde a instância na variável global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## Quer saber mais Prisma ORM ?

----------------->[Documentação oficial do Prisma](https://www.prisma.io/docs).<--------------------

## Configurar banco de dados PostgreSQL usando o Docker

<!-- Não acho que isso devia estar aqui, mas é a vida por enquanto -->

Caso queira usar PostgreSQL em desenvolvimento, pode utilizar esta seção como referência para a criação do `docker-compose.yml` e sua utilização com Prisma.

Caso não saiba o que é docker, e essa documentação não esteja no retype ainda, veja no [gitbook antigo](https://github.com/StructCE/gitbook/blob/projetos_develop/execucao/projetos/docker/README.md)

**É importante ressaltar que nesse passo o Docker está sendo utilizado como um 'simulador'
de banco de dados PostgreSQL.**

### Criando arquivo `docker-compose.yml`

```bash
touch docker-compose.yml
```

### Adicionando a configuração no arquivo `docker-compose.yml`

```bash
# teste/docker-compose.yml

version: '3'
services:
  postgres:
    image: postgres:latest
    container_name: postgresql
    environment:
      POSTGRES_DB: teste
      POSTGRES_USER: teste
      POSTGRES_PASSWORD: teste
    ports:
      - "5436:5432"
    volumes:
      - ./dados_postgres:/var/lib/postgresql/data
```

### Definir localização do seu banco de dados

Considerando as variáveis usadas no docker,

- POSTGRES_DB = nome do banco de dados = teste
- POSTGRES_USER = usuario definido no `docker-compose.yml` = teste
- POSTGRES_PASSWORD = senha definida no `docker-compose.yml` = teste

No seu arquivo de ambiente `.env`, declare a URL do banco de dados, substituindo os termos entre chaves, `{var}`, por seus respectivos valores:

```bash
#.env

DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/{POSTGRES_DB}"
#substituindo no exemplo, ficaria
# DATABASE_URL="postgresql://teste:teste@localhost:5432/teste"
```

!!! `.env.example`
**Adicione** o conteúdo acima **ao `.env.example`**, caso ele não já esteja lá.

Ajude o coleguinha que daqui 2 anos vai tentar rodar seu projeto.
!!!

### Inicie o Docker

```bash
sudo service docker start
```

### Inicie o container do banco de dados PostgreSQL

```bash
sudo docker-compose up -d
```

### Verifique se o banco de dados está sendo executado

```bash
sudo docker ps
```
