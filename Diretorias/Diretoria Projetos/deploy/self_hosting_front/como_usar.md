---
order: 1
icon: rocket
label: "Como faz Self-Hosting (Front-End)?"
---

<!-- Ultima atualização: 23/09/2023 -->
<!-- Autor(es): Artur Padovesi -->

## Configurando o projeto

!!!
Considere a [branch production do projeto front-end-template](https://github.com/StructCE/react-template/tree/production) e [suas alterações](https://github.com/StructCE/react-template/compare/main...production).
!!!

## Configurando o NGinx

1. Criar um arquivo `nginx.conf` para configuração do NGinx na raíz do projeto.
2. Colocar o seguinte conteudo dentro do arquivo criado:

``` Conteudo
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /usr/share/nginx/html;
  server_name dominio.exemplo.ex www.dominio.exemplo2;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

3. Trocar os valores de `dominio.exemplo.ex` e `www.dominio.exemplo2` pelos domínios que o aplicação que será feito o deploy.Se o app for servido em `www.struct.com.br`, o arquivo deve conter:

``` Exemplo
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /usr/share/nginx/html;
  server_name www.struct.com.br;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

## Mudando as urls de localhost

!!!
A aplicação React usa urls locais para acessar a API, por exemplo, `http://localhost:3333/api/v1`. Essas urls devem ser alteradas para as urls de produção, por exemplo, `https://api.struct.com.br/api/v1`.É possível fazer isso usando variáveis de ambiente, mas no momento deve ser trocado manualmente, como no nosso repositório de exemplo (talvez esse gitbook esteja desatualizado em relação ao repositório, verifique).
!!!

## Mudando o `index.html`

1. Alterar o arquivo `index.html` para conter informações corretas sobre a aplicação, bem como os metadados.
2. Criar um `robots.txt`, para ajudar os mecanismos de busca, além indexar o site conforme necessario.
3. Colocar o título correto, colocar descrição, mudar o favicon e a linguagem para pt-BR.

## Criando docker image

1. Vá para a branch production localmente. 
2. Crie um arquivo chamado `Dockerfile` na raíz do projeto.
3. Atualize o url do git presente no arquivo, mudando o nome do projeto e o token de autenticação do GitHub.

## Criando container

1. Atualize o repositório de docker_compose da Struct com o seguinte comando:

```bash Terminal
git pull
```

2. Crie uma pasta com o nome do projeto.
3. Modifique o template de `docker-compose.yml` do Traefik com os nomes que podem ser usados para identificar o projeto nos logs, caso ocorra algum erro.
4. Definir a imagem que será usada com o valor de `image`.
5. Alterar os valores de `environment`, `restart`, `volumes`, e `networks`.
6. Crie o container usando o comando:

```bash Terminal
`docker-compose up -d`
```