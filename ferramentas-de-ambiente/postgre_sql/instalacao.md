---
order: 2
icon: rocket
label: "Como instalar o PostgreSQL ?"
author:
  name: Araújo
  avatar: ../../Imagens DocStruct/Logos/logo_struct.png
date: 2023-09-24
category: Instalação
---

## Comandos para instalar o PostgreSQL

1. Crie a configuração do repositório de arquivos

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

2. Instale o pacote PostgresSQL

```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

3. Atualize as listas de pacotes

```bash
sudo apt-get update
```

4. Instale a versão mais recente do PostgreSQL

```bash
sudo apt-get -y install postgresql
```

5. Verifique se a instalação deu certo

```bash
psql --version
```

## Quer saber sobre mais sobre PostgreSQL ?

---------------------->[Documentação oficial PostgreSQL](https://www.postgresql.org/docs/online-resources/)<-----------------------