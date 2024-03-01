---
order: 3
icon: gear
label: "Configurando o Ambiente"
author:
  name: Paulo Fernando
  avatar: ../../Imagens DocStruct/Logos/logo_struct.png
category: Instalação
tags:
  - typescript
  - instalacao
  - configuracao
date: 2023-10-24
---

## Por que usar TypeScript?

Se você já programou em JavaScript, torna-se ainda mais fácil programar em TypeScript, afinal eles são basicamente _"a mesma coisa"_. O que isso quer dizer? É que o TypeScript é na verdade um **superset open-source**, desenvolvido pela Microsoft, ou seja, uma extensão da linguagem JavaScript, com a adição de algumas propriedades que melhoram o nosso código.

Tá, mas ainda não chegamos no tópico principal desta introdução né... por que usar o TypeScript? Para começar, ele funciona como uma ferramenta que adiciona **tipagem estática** ao JavaScript, que pode ser escrita em qualquer ambiente de desenvolvimento e que, quando instalada via gerenciador de pacotes JS, permite checar erros e utilizar outros compiladores que suportam este mecanismo. Com isso, o TypeScript eleva o nível de produtividade e ainda garante o desenvolvimento de **aplicações complexas, eficazes e seguras**, onde, por meio da verificação de tipos, é possível mais facilmente verificar se cada função, objeto ou elemento do seu código está sendo utilizado e gerenciado da forma que você espera, facilitando também a manutenção e modificação do código.

Além do potencial de detecção de erros durante o desenvolvimento de projetos, outra vantagem é a possibilidade de incluir a IntelliSense da IDE que está sendo usada. Isso reflete num ambiente muito mais ágil e seguro enquanto o código está sendo digitado pelo desenvolvedor.

## Verificador de Tipos Estáticos

Detecção de erros sem execução do código é chamada de verificação estática, e determinar o que é um erro e o que não é, baseado nos tipos dos valores sendo operados é chamado de verificação de tipos. TypeScript verifica um programa por erros antes de sua execução e faz isso baseado nos tipos dos valores, ou seja, é um verificador de tipos estático. Ele adiciona regras de tipagem e regras sobre como diferentes tipos de valores podem ser usados.

Além do mais, a grosso modo, uma vez que o compilador do TypeScript terminou de verificar o seu código, ele apaga os tipos para produzir o código resultante "compilado". Isso significa que uma vez que seu código for compilado, o código JS puro de resultado não tem informação de tipo, ou seja, o **TypeScript nunca muda o comportamento do seu programa baseado nos tipos que infere**.

Para treinar e exercitar nossa escrita de código, o TypeScript tem um [playground online](https://www.typescriptlang.org/play#).

## Instalação e uso

Geralmente, na criação do seu projeto, seja em Vite ou seja em Next, é possível especificar se deseja utilizar como linguagem o JavaScript ou o TypeScript, e, assim, toda mágica de instalação do superset já é feita para nós. Porém, também é possível adicionar o TypeScript manualmente no seu projeto, e o processo para isso é bastante simples:

> _Os passos a seguir servem apenas para exemplificação de como o TypeScript surge e opera no nosso diretório. **É altamente recomendável que você escolha a utilização da linguagem TypeScript, quando nas opções de criação do seu projeto**._

Primeiramente, para adicionar o TypeScript nas dependências do projeto, basta executar um dos seguintes comandos no terminal, de acordo com o gerenciador de pacotes que você e sua equipe estejam utilizando:
+++ PNPM

```bash
pnpm install typescript
```

+++ NPM

```bash
npm install typescript
```

+++ YARN

```bash
yarn add typescript
```

+++

Porém, ainda precisamos explicitar que desejamos configurar a ferramenta, e para isso precisamos do arquivo **tsconfig.json**, onde iremos ajustar o modo de operação do TypeScript sobre o nosso projeto.

Para a criação do arquivo, basta rodar o seguinte comando no terminal:

```bash
npx tsc --init
```

Com isso, um arquivo **tsconfig.json** totalmente _"cru"_ irá ser criado na raiz do seu diretório, com as explicações de todas as possíveis configurações que você pode aplicar no compilador do TypeScript. Necessitando, assim, que você edite completamente o arquivo para obter aquilo que deseja no seu projeto.

Entretanto, o Vite e o Next são capazes de já realizarem uma configuração básica por padrão. Seguem exemplos de como essas _ferramentas_ implementam a configuração do TypeScript para o seu projeto.

#### Vite

tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

tsconfig.node.json:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### Next

tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Opções do _tsconfig.json_

Já sabemos agora como o TypeScript entra no nosso projeto e onde conseguimos configurar seu compilador e seu modo de operação. Porém... como configurar?? Este texto irá mostrar algumas opções relevantes de se saber na hora de mexer no seu **tsconfig.json**.

> _Não é recomendável que você fique demasiadamente editando estes arquivos de configuração. O ideal é que você faça isso no início do projeto, e que realize, apenas se necessário, alterações pontuais no decorrer do desenvolvimento, avisando à equipe ou ao gerente do projeto as alterações realizadas._

Primeiramente, o arquivo é constituído por um objeto, no qual colocamos nossas possíveis configurações, como: _compilerOptions_, _include_, _exclude_, _extends_, etc.

Estrutura básica de um arquivo **tsconfig.json**:

```json
{
  "compilerOptions": {
    // objeto com opções de como o compilador do TypeScript agirá
  },
  "include": [
    // array de arquivos e/ou repositórios sob os quais queremos que o TypeScript aja
  ],
  "exclude": [
    // array de arquivos a serem ignorados no include
  ],
  "extends": "" // string que contém o path (caminho) de outro arquivo de configuração do qual este herdará
}
```

#### Falando de _compilerOptions_

Este será um objeto no qual você poderá descrever como o compilador deve funcionar, de acordo com diversas opções de configuração que ele suporta. Entre estas opções, vale-se citar:

##### _target_

Recebe uma **string** e especifica a versão do JavaScript para a qual o superset irá ser compilado. _Valores válidos: "es2016", "es2020", "es5"._

##### _module_

Recebe uma **string** e especifica qual módulo de código será gerado. _Valores válidos: "esnext", "commonjs"._

##### _jsx_

Recebe uma **string** e especifica qual código JSX será gerado. _Valores válidos: "preserve", "react-jsx"._

##### _strict_

Recebe um **boolean** e, quando igual a **true**, habilita todas as rigorosas verificações de tipo para o seu código, como: _noImplicityAny_, _strictNullChecks_, _strictFunctionTypes_, _noUnusedParameters_, _noImplicitReturns_, etc.

> _Caso você queira aprender mais opções de configuração do TypeScript, é possível ir à própria [documentação do superset](https://www.typescriptlang.org/pt/tsconfig), onde você irá encontrar em detalhes explicações e exemplos de cada opção de configuração._
