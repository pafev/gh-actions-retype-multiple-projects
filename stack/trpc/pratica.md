---
order: 1
icon: rocket
label: Prática
---

# Prática

tRPC é uma ferramenta para comunicação entre back-end e front-end, então começaremos definindo rotas no back:

## Iniciando o tRPC no back-end

A primeira tarefa a ser feita é iniciar o tRPC no back-end. O tRPC funciona através de chamadas de funções de um lado da aplicação para outro e, para termos acesso às propriedades e aos métodos dessa ferramenta, precisamos inicializar uma instância de roteador.

Assim, criaremos um arquivo `trpc.ts` onde inicializaremos o tRPC por meio de uma `const t` (nome usado somente para exemplo) e exportaremos as propriedades `router`e `procedure` da instância.

```ts "./server/trpc.ts"
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
```

<br>

### Por que exportar?

Exportamos duas propriedades que definimos no arquivo `trpc.ts` para facilitar o uso delas em quaisquer outros arquivos e alguma possível manutenção dessa aplicação, pois precisaremos fazer alterações no "arquivo fonte" e não em todos os lugares onde as usarmos.

### Uso das propriedades

Para o lado cliente poder se comunicar com o servidor é preciso definir "rotas de comunicação", pois é por meio das rotas que o servidor é direcionado ao procedimento/protocolo específico, definidas usando o `router`.

Em seguida, a rota levará a um procedimento (`procedure`) no qual é passado uma função que pode chamar determinadas funções do banco de dados e/ou efetuar outras ações. Logo, também precisamos usar a propriedade `procedure` para definirmos o que deve ser feito e as funções a serem chamadas em uma determinada rota.

No caso, `procedures` está definido como publicProcedure pois, no exemplo, definiremos requisições que não exigirão autenticação.

## Definindo as rotas

Então, importamos em outro arquivo, mais por questão de organização, as propriedades `router` e `publicProcedure` e definimos um conjunto de rotas em uma `const appRouter`. Também deve-se importar o banco de dados feito em sua aplicação, pois nas rotas serão definidas requisições para o mesmo.
<br>

Para fazer as definições, é usado um objeto/dicionário onde as chaves serão os nomes das rotas e os valores serão as ações efetuadas no momento em que elas forem chamadas pelo lado cliente.

```ts "./server/index.ts"
import { db } from "./db"; // Banco de dados previamente construído
import { publicProcedure, router } from "./trpc"; // Propriedades que exportamos no trpc.ts

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
});
```

Usamos o `publicProcedure`, que definirmos anteriormente, para efetuar requisições/procedimento ao servidor.
Um procedimento pode ser:

- `query` busca de informação
- `mutation` criação, atualização ou delete de informação
- `subscription` cria uma ligação persistente com o servidor e recebe mudanças. É o famoso websocket.

No caso, estamos definindo uma requisição `userList` que irá listar todos os usuários de um servidor, logo usamos `query`.

## Entrada de Dados

Para receber entrada de informações do lado cliente, basta usar o `input()` que irá receber informações e as retornará para o `query()` podendo ser, primeiramente, validadas, caso efetuado um tratamento de dados.
Usamos o pacote "zod" para fazer a validação da entrada de dados.
Os campos nos quais deseja fazer alguma validação coloque z.tipoDeDadoDesejado(), exemplo:

```ts "./server/index.ts"
import { z } from "zod";
const appRouter = router({
  userById: publicProcedure
    .input(z.string()) // No caso queremos que o input seja uma string (o nome)
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.user.findById(input);
      return user;
    }),
});
```

O `query()` recebe um objeto com várias informações como dados de contexto, de usuário, log-In etc. Portanto, para isolarmos os dados de entrada/input usamos o `{input}` que irá desestruturar o objeto e pegar somente os dados que queremos para fazermos as requisições.

!!!
É possível passar um objeto com alguns parâmetros de mensagens personalizadas, por exemplo:

```ts
const name = z.string({
  required_error: "É requirido um nome",
  invalid_type_error: "O nome deve ser uma string",
});
```

Para mais informações sobre o a validação de dados, clique [aqui](https://zod.dev)
!!!

## Servidor

O servidor é o que irá ouvir as requisições e, de acordo com as rotas definidas, dar uma determinada resposta. Porém, ainda não iniciamos nenhum servidor, logo, a seguinte etapa será iniciar um. É importado o método `createHTPPServer`do próprio tRPC, que irá criar o servidor, sendo necessário passar um roteador para o mesmo saber como reagir às requisições. Também usado o método listen, que define o endereço em que o servidor receberá requisições.

```ts "./server/index.ts"
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const appRouter = router({
  // Todas as rotas aqui, anteriormente definidas.
});
const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
```

## Configurando servidor no lado cliente

### Definindo a conexão entre servidor e cliente

Da mesma forma que é necessário criar um servidor para conseguir estabelecer uma comunicação com o cliente, é necessário haver no lado cliente uma maneira de se comunicar com o servidor, uma maneira por onde mandar suas requisições.

O lado cliente fica ciente das informações que estão sendo manipuladas por meio dos tipos de dados do roteador. Logo, para estabelecer essa conexão primeiro temos que exportar o tipo do nosso roteador adicionando o seguinte trecho no arquivo `/server/index.ts`:

```ts ./server/index.ts
export type AppRouter = typeof appRouter;
```

Então, o `AppRouter` é importado e passado ao método `createTRPCProxyclient` para a criação do proxy. Como é um argumento de tipo, ou seja, são passados os tipos de dados em que a função tem que trabalhar, ele é declarado entre os símbolos <>, uma característica do TypeScript.
<br>

Assim, também iremos definir um `httpBatchLink` que é um tipo de link que lida com requisições em lote como se fosse uma, declarando o endereço do nosso servidor para efetuarmos as nossas requisições e de forma mais otimizada:

```ts "./client/index.ts"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server/index.ts";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});
```

Com o proxy `trpc`, exportamos para facilitar o reuso em outros arquivos ou podemos manipulá-lo no mesmo.

### Fazendo requisições no lado cliente

Com o proxy definido e exportado, podemos importar o proxy `trpc` para qualquer arquivo e fazermos requisições através dele, no exemplo usaremos no mesmo arquivo:

```ts "./client/index.ts"
// import trpc from "./client/index.ts" (Caso esteja manipulando
// o proxy em um arquivo diferente daquele em que foi definido, não é o caso)
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server/index.ts";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const user = await trpc.userById.query("1");
const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
```

Como estabelecemos uma conexão cliente-servidor dos tipos de dados e definimos o endereço do servidor, temos acesso às rotas definidadas no back-end e podemos efetuar as requisições.
<br>

Neste exemplo usamos a rota definida anteriormente `userById` para efetuarmos a requisição ao servidor, que irá responder com informações de um usuário filtrado pelo seu ID. Também usamos a rota `userCreate` que cria um usuário com nome.

<br>

####

::: sample
Para mais informações sobre tRPC, consulte [aqui](https://trpc.io/docs/quickstart)  
:::

<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>
