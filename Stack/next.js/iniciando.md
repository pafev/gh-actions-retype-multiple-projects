---
icon: tools
label: "Iniciando projeto"
order: 2
author:
    name: Matheus das Neves
date: 2023-10-26
category: Instalação
---

# Criando um projeto Next

Next não é instalado de fato em sua máquina, é um conjunto de pacotes que são iniciados no momento em que um projeto Next é criado.

!!!
Requisitos:
- É necessário possuir uma versão igual ou superio a 16.14 do Node.js.
- São suportados macOS, Windows (incluindo WSL) e Linux.
!!!

## Configuração Automática

Na configuração automática, são feitas algumas perguntas no terminal pra configuração automática do framework. A configuração é feita na criação de um projeto next, para isso rode o comando no terminal:

```bash
pnpm create next-app
```

Após isso, serão feitas algumas perguntas no terminal:

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```
Para a pergunta nº:
1. Nome do projeto que irá ser feito. 
2. Uso ou não de TypeScript no projeto.
3. Uso do ESLint, um analisador estático de código, que encontra problemas no código e alerta no editor de texto. 
4. Uso do Tailwind CSS, a principal ferramenta de estilização usada em Next.js. 
5. Opção do diretório `src/` na pasta raiz do projeto, mais uma opção de organização para separar a pasta do projeto dos arquivos de configuração.
6. Opção de tipo de roteamento usado Pages Router e App Router (mais recente), nessa documentação iremos usar o Pages Router. Caso queira saber mais sobre a diferença entre os dois
7. A sétima e última estão relacionadas, respectivamente, a customização e configuração de importações, para facilitar a importação de alguma utilidade entre os diretórios, são como se fossem atalhos para imports. Caso queira saber mais a fundo, clique [aqui](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases).

## Configuração Manual

Pra criar um projeto Next.js manualmente, deve-se rodar o código no terminal:

```bash
npm install next@latest react@latest react-dom@latest
```

Em seguida adicione o trecho de código ao arquivo `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Nesse script definimos um objeto com as chaves:

- `dev` e seu valor `next dev`para declararmos que o projeto está em modo de desenvolvimento.
- `build` e valor `next build` para construir a aplicação para uso em produção.
- `start` com `next start`para começar um servidor Next.js em produção.
- `lint` com `next lint` para definir a configuração de ESLint embutida no Next.js. 

### Criando diretórios

Como a configuração, neste caso, é manual, então algumas pastas não vem pré-configuradas no projeto. Logo, deve-se criar a pasta pages (pois estamos usando pages router) onde ficará as páginas a serem usadas na aplicação. Assim como, pode-se criar a pasta public, para arquivos estáticos como imagens, fontes, ícones etc.

!!!
Mais informações sobre como iniciar e configurar um projeto Next [aqui](https://nextjs.org/docs/getting-started/installation#the-pages-directory-optional).
!!!