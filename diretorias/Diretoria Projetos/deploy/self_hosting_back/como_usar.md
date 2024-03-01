---
order: 1
icon: rocket
label: "Como fazer Self-Hosting (Back-End)?"
---

<!-- Ultima atualização: 22/09/2023 -->
<!-- Autor(es): Artur Padovesi e Pedro Augusto Ramalho Duarte -->

## Configurando o projeto para deploy

!!!
É mantido um repositório no GitBucket com os DockerFiles utilizados para construir as imagens do nosso servidor, bem como um repositório armazenado no servidor, com os arquivos do Docker Compose utilizados para rodar as imagens construídas.
!!!

1. Crie uma branch `production`;
2. Adicione `Dockerfile` ao `.gitignore` do projeto;

## Crie a imagem Docker

!!!
Não coloque Dockerfiles no repositório do projeto, utilize o repositório do GitBucket para isso. Colocar esse arquivo no projeto pode causar problemas de segurança. Muitos dos nossos Dockerfiles usam credenciais que **não devem** ser expostas.
!!!

1. Pegue o template de `Dockerfile` no GitBucket
2. Modifique conforme necessário, a fim de a imagem docker necessária.
3. Para construir a imagem, use o comando:

```bash Terminal
docker build -t structej/projetos:{nome_do_projeto_versão}
```

!!!
Várias das nossas imagens são um pull do projeto, e para isso é necessário um token de acesso no github. Para gerar esse token, pode ser seguida a [Documentação do GitHub](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic).
!!!


## Faça o Push da imagem Docker

1. Faça login no DockerHub, usando o comando:

```bash Terminal
docker login
```

2. Faça o push da imagem para o DockerHub, usando o comando:

```bash Terminal
docker push structej/projetos:{nome_do_projeto_versão}
```

!!!
O `structej/projetos` é o `usuário/projeto` que enviamos a imagem de tag `{nome_do_projeto_versão}`. É importante fazer assim, pois por padrão projetos no DockerHub são públicas, então enviamos ela para um repositório que sabemos ser privado.
!!!

## Faça o docker-compose no servidor

!!!
Os templates de `docker-compose.yml` ficam na pasta `templates` do repositório armazenado no servidor.
!!!

1. Fazer as atualizações localmente;
2. Fazer um push para o repositório;
3. Fazer um pull no servidor;
4. Faça o pull/clone do repositório do Docker Compose, usando o comando 

```bash Terminal
git pull/clone
```

5. Crie um docker-compose.yml com o serviço do projeto, usando o template de `docker-compose.yml`.

## Atualize a branch `production`

1. Crie uma PR para a branch `production`, com as adições que devem ser feitas no deploy;

!!!
Procure por coisas que podem quebrar ou requerem passos adicionais no deploy, como mudanças de banco de dados, ou mudanças de configuração de serviços.
!!!

## Atualize a imagem docker

1. Faça o build da imagem docker, usando o comando:

```bash Terminal
docker build -t structej/projetos:{nome_do_projeto_versão}
```

!!!
Agora a versão da imagem docker é `versão`. Sempre incrementamos a `versão` da imagem docker, para que possamos fazer o rollback caso algo aconteça de errado.
!!!

2. Faça o push da imagem para o DockerHub, usando o comando:

```bash Terminal
docker push structej/projetos:{nome_do_projeto_versão}
```

## Atualize o docker-compose no servidor

1. Mudar a propriedade `image` do serviço do projeto no `docker-compose.yml` para a versão atual da imagem docker;
2. Faça o commit das alterações;
3. Faça o push do `docker-compose.yml`;

```yml Exemplo
version: '3.7'

services:
    service-we-want-to-update:
        image: structej/projetos:nome-projeto-x.x
        ...
```