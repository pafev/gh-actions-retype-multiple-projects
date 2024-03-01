---
order: 2
icon: tools
label: "Instalação"
---

# Instalação

O tRPC possui vários tipos de pacotes com conteúdos extras, para instalar o pacote padrão:

!!! Requisitos

- Deve-se certificar que a versão do TypeScript seja igual ou superior à versão 4.7.0.
- É recomendado a atribuição "strict": true no arquivo `tsconfig.json`, já que não há suporte para o contrário.
  !!!

+++ npm
`npm install @trpc/server @trpc/client`
+++ yarn
`yarn add @trpc/server @trpc/client`
+++ pnpm
`pnpm add @trpc/server @trpc/client`
+++ bun
`bun add @trpc/server @trpc/client`
+++

## Pacotes recomendados

Para projetos em Next.js é recomendado a instalação de uma versão que é uma combinação da versão para React (React Query) com algumas ferramentas específicas a mais de integração para o Next:

+++ npm
`npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod`
+++ yarn
`yarn add @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod`
+++ pnpm
`pnpm add @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod`
+++ bun
`bun add @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query zod`
+++

Para projetos somente em React, basta o mesmo procedimento anterior, agora sem o parâmetro `@trpc/next` e `zod` (caso não use zod em React)
