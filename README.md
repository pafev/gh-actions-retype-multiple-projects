# Bem-Vindo à Wiki da \{struct\}

Este é um repositório de documentação com o objetivo de concentrar todo o conhecimento possível da Struct em um só lugar.

## Conteúdo

Por favor, contribua toda vez que verificar que algo está faltando. Caso tenha dúvidas de como trabalhar aqui, acesse a documentação do [Retype](https://retype.com).

## Como trabalhar no projeto

### 1 - Clone o Projeto

```bash
git clone REPO_DOCSTRUCT
```

### 2 - Instale o retypeapp

+++ npm

```bash
npm install retypeapp --global
```

+++ yarn

```bash
yarn global add retypeapp
```

+++ npm

```bash
dotnet tool install retypeapp --global
```

### 3 - Entre em uma das pastas e rode o projeto

Nossa documentação está dividida em 3 seções:

- Ferramentas-de-Ambiente
- Organizacao-Interna
- Stack

Cada seção destas é uma pasta na raíz do repositório e também é um projeto do retype.
Portanto, entre na pasta que vc deseja realizar sua documentação e rode o projeto.

```bash
cd Organizacao-Interna
retype start
```

Com o projeto rodando, você pode agora escrever sua documentação (mas recomendo que veja antes a seção de "Como se organizar no projeto" neste README) em arquivos markdown, com componentes e padrões do Retype.
Para dúvidas sobre como escrever a documentação, acesse a [documentação do retype](https://retype.com/guides/formatting/).

## Como se organizar no projeto

### Crie sua branch e nomeie-a de forma "adequada"

Para adição de conteúdo à documentação, você pode especificar que sua branch foca no desenvolvimento de uma feature.
Por exemplo, para a adição de documentação sobre o deploy realizado pela diretoria de projetos, você pode nomear sua branch de:

> feat:deploy-projetos

Para correção de algo na documentação, você pode agora especificar que sua branch foca em uma fix.
Por exemplo, para correção da documentação de typescript, você pode nomear sua branch de:

> fix:typescript

### Crie uma PR com o nome da sua branch e elabora uma descrição explicativa

Finalizado o desenvolvimento, vc pode agora criar uma PR (Pull Request) no GitHub, com o nome da sua branch.

Elabore uma descrição da sua PR, apontando o que foi feito/corrigido, o que faltou fazer (e o por que não fez) e o que pode melhorar.

Por fim, solicite alguém de confiança para revisar sua PR.

Finalizadas as revisões e correções, peça para o revisor aplicar o Merge.

FIM!
