---
order: 2
icon: code
label: "Entendendo a Linguagem"
author:
  name: Paulo Fernando
  avatar: ../../Imagens DocStruct/Logos/logo_struct.png
category: Explicação
tags:
  - typescript
  - explicacao
date: 2023-10-27
---

## Definindo Tipos

Em TypeScript, dois pontos depois de um nome de variável inicia uma anotação de tipo, e a assinatura de tipo depois dos dois pontos descreve os valores que a variável pode ter. Por exemplo, a linha a seguir informa ao TypeScript que _variavel_ sempre armazenará números:

```ts
let variavel: number;
```

Você pode se perguntar se a inicialização de **undefined** de _variavel_ não viola o tipo estático. O TypeScript contorna esse problema não permitindo que você leia _variavel_ antes de atribuir um valor a ele.

## Tipos por Inferência

TypeScript conhece a linguagem JavaScript e vai gerar tipos para você em muitos casos, inferindo por meio da atribuição de valores, quando na declaração do que está sendo atribuído. Ficou muito confuso? Por exemplo, quando criamos uma variável e atribuímos a ela um determinado valor, como uma string, TypeScript usará o valor como seu tipo, ou seja, esta varíavel estará automaticamente tipada para aguardar uma string, sem a necessidade de explicitar isso.

```ts
let variavel = "algum texto"; // variavel: string
```

## Como descrever tipos?

O que vem depois dos dois pontos de uma anotação de tipo pode variar de simples a expressões complexas, e agora estudaremos todas essas assinaturas e como essas expressões podem ser criadas.

### Tipos básicos

- Tipos estáticos primitivos do JavaScript: **undefined**, **null**, **boolean**, **number**, **string**, **symbol**, **object**.
- Tipos específicos do TypeScript: **any** (o tipo de todos os valores), **unknown** (o tipo de um valor desconhecido), etc.

_Obs.: Tenha cuidado ao utilizar o tipo unknown. Tenha certeza do que está fazendo._

### União de tipos

Com TypeScript, você pode criar tipos complexos combinando os simples. Com uma união, você pode declarar que um tipo pode ser um de muitos. Para isso, basta combinar os tipos que deseja com o operador **|**.

```ts
let variavel: number | null = null;
variavel = 123;
```

O código acima é compilado adequadamente, pois você explicitamente declarou que _variavel_ pode assumir tanto um valor numérico quanto **null**.

### Tipos em Array

Os arrays serão definidos aqui das duas formas seguintes (e às vezes uma mistura dos dois):

_Lists_: Todos os elementos têm o mesmo tipo e o comprimento do array pode variar.
_Tuple_: Os elementos não têm necessariamente o mesmo tipo, porém o comprimento do array é fixo.

- #### Array como list

Existem duas maneiras de descrever um array como uma lista:

```ts
let arr1 = number[] = [1, 2, 3];
let arr2 = Array<number> = [1, 2, 3, 4];
```

No exemplo acima, tanto _arr1_ quanto _arr2_ são tipados como arrays de tamanho variável, cujos elementos são todos valores numéricos.

- #### Array como tuple

Suponha que você deseja agora armazenar um par de chave e valor, resultado da operação _Object.entries(obj)_, e você espera que _obj_ é um objeto cujas chaves são strings e os valores são números.

```ts
let obj = { a: 1, b: 2 };
let primeiroParChaveValor: [string, number] = Object.entries(obj)[0];
```

No exemplo acima, descrevemos _primeiroParChaveValor_ como um array de tamanho definido de 2 elementos, onde o primeiro deve ser uma string e o segundo deve ser um valor numérico.

### Tipos em funções

Ao descrever tipos para funções, estaremos descrevendo tanto os tipos dos parâmetros que a função aguarda, quanto também o tipo do seu retorno. O exemplo abaixo é uma anotação de tipo para todas as funções que aguardam um único parâmetro, sendo ele um número, e retornam um booleano:

```ts
(num: number) => boolean;
```

O código a seguir é um exemplo mais realista:

```ts
const verificaPositivo: (num: number) => boolean = (num) => {
  return num >= 0;
};
```

Outra forma de descrever a função acima é descrever separadamente os tipos do parâmetro da função e de seu retorno:

```ts
function verificaPositivo2(num: number): boolean {
  return num >= 0;
}
```

_Obs.: se excluirmos o boolean na declaração da função acima, o TypeScript é inteligente o suficiente para inferir o tipo do retorno, a partir do escopo da função._

Porém, e se minha função não retornar nada? Terei que forçar um retorno que não desejo, só para poder tipar a função?? Não! Para começar, funções que "não retornam nada" no JavaScript estão na verdade retornando **undefined** implicitamente, e um dos tipos muito úteis que o TypeScript nos fornece é o **void**, o qual diz que a função sempre retorna **undefined**, explícito ou implicitamente.

```ts
function retornaNada(): void {
  return undefined;
} // ok
function retornaNada2(): void {} // ok
```

### Tipos em objetos

Para tipar objetos, iremos aqui definir uma quantidade fixa de propriedades, conhecidas no momento do desenvolvimento, e cada propriedade pode ter um tipo diferente.

Por exemplo, para criar um objeto com um tipo definido por incluir _nome: string_ e _id: number_, faremos as seguintes descrição e declaração:

```ts
let usuario: {
  nome: string;
  id: number;
};

usuario = {
  nome: "Fulano",
  id: 1,
};
```

### Criando tipos Personalizados

Suponha que tenhamos no nosso código diversas variáveis que utilizam a mesma notação de tipo. Se formos reescrever a notação toda vez que declararmos mais uma variável, a escrita do código não seria nada prática e produtiva para o nosso desenvolvimento. Porém, o TypeScript nos fornece poderosas abstrações para reutilização de tipos: **interface** (para denotar tipos de objetos ou classes) e **type** (para denotar qualquer tipo).

```ts
type Ponto = {
  x: number;
  y: number;
};

// interface Ponto {
//     x: number;
//     y: number;
// }

let ponto: Ponto;
let ponto2: Ponto;
```

Essa alteração permite que o tipo _Ponto_ seja usado em vários locais dentro do código sem precisar redefinir os detalhes do tipo repetidas vezes.

E ainda não acabou, o TypeScript também nos permite estender **types** ou **interfaces**, para compor tipos mais complexos a partir de tipos simples:

```ts
type Ponto3d = Ponto & {
  z: number;
};

// interface Ponto3d extends Ponto {
//     z: number;
// }

const ponto3d = {
  x: 5,
  y: -5,
  z: 2,
};
```

No exemplo acima, o tipo _Ponto3d_ resultante consistiria nas propriedades _x_ e _y_ do type ou da interface _Ponto_, além da nova propriedade _z_.

### type alias x interface

Embora **type** e **interface** pareçam similar em uma primeira olhada superficial, há na verdade muitas diferenças entre eles.

Portanto, vamos examinar as principais características de cada uma dessas duas ferramentas e comparar suas utilizações.

- #### Interfaces

As interfaces possibilitam o que chamamos de **declaration merging**: quando duas interfaces são declaradas com o mesmo nome, ocorre uma mescla e junção dessas duas. Está é uma maneira de extender uma interface, porém de forma menos explícita, o que não é uma prática recomendável quando no desenvolvimento de determinados projetos.

```ts
interface Pessoa {
  nome: string;
}

interface Pessoa {
  idade: number;
}

const pessoa: Pessoa = {
  nome: "Ricardo",
  idade: 19,
};
```

Interfaces são ótimas para definir a estrutura de objetos ou classes, e elas são ideais para desenvolver um projeto aberto para implementações e extensões de comportamento, como para o desenvolvimento de bibliotecas e frameworks.

- #### Type alias

Permitindo criar "aliases" - ou seja, apelidos - para tipos primitivos, funções, objetos e uniões ou composições destes tipos básicos, **type** é uma ferramenta poderosa para expandir a tipagem do seu projeto a um nível muito avançado.

Ele permite você denotar diversos tipos e realizar uniões e interseções deles:

```ts
type PessoaNome = {
  name: string;
};

type PessoaIdade = {
  age: number;
};

type Pessoa = PessoaNome & PessoaIdade;
type PessoaNomeOuIdade = PessoaNome | PessoaIdade;

const pessoa1: Pessoa = {
  name: "Fulano",
  age: 18,
};
const pessoa2: PessoaNomeOuIdade = {
  name: "Beltrano",
};
const pessoa3: PessoaNomeOuIdade = {
  age: 20,
};
```

### Parâmetros opcionais

Se, na estrutura da sua anotação de tipo, uma propriedade pode ser omitida, você pode colocar um ponto de interrogação após o seu nome:

```ts
type Ponto = {
  x: number;
  y: number;
  z?: number;
};

let ponto: Ponto;

ponto = { x: 0, y: 0, z: 0 }; // OK
ponto = { x: 0, y: 0 }; // OK
```

Aqui, ao invés de especificar um tipo separado para um ponto tridimensional, simplesmente tornamos a propriedade _z_ opcional.

### Sistemas de Tipos Estruturais

Quando o TypeScript compara dois tipos de objetos diferentes, para decidir se eles correspondem ou não, isso é feito estruturalmente. Isso significa que, ao invés de comparar os tipos, verificando se os dois herdam o mesmo objeto de restrição (como **instanceof**), as propriedades de cada objeto são comparadas.
