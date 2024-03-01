---
order: 2
icon: rocket
label: "Como instalar o Git ?"
author:
  name: Araújo
  avatar: ../../Imagens DocStruct/Logos/logo_struct.png
date: 2023-09-24
category: Instalação
---

## Windows

1. Acesse o site oficial do [Git](https://git-scm.com/) e clique no botão de download para Windows;
2. Aguarde o arquivo de instalação ser baixado e execute-o;
3. Siga as instruções do assistente de instalação, aceitando as configurações padrão, a menos que você queira personalizá-las;
4. Selecione o editor de texto padrão que você deseja associar ao Git (recomenda-se usar o editor padrão sugerido);
5. Na etapa de "Seleção de Componentes", verifique se todas as opções estão selecionadas e clique em "Avançar";
6. Selecione "Git from the command line and also from 3rd-party software" para habilitar o uso do Git a partir da linha de comando;
7. Escolha o mecanismo de conversão de fim de linha (recomenda-se a opção padrão);
8. Marque a opção "Use OpenSSL" para garantir uma conexão segura;
9. Selecione o terminal padrão que você deseja usar com o Git (recomenda-se usar o Git Bash);
10. Conclua a instalação clicando em "Avançar" e, em seguida, em "Concluir";

## MacOS

Existem várias opções para instalar o Git no macOS, porém iremos utilizar como base a [domentação oficial](https://git-scm.com/download/mac) do git que utiliza o Homebrew, um gerenciador de pacotes, para instalar o Git. 

1. Abra o Terminal(Digite "Terminal" na barra de pesquisa e abre o aplicativo que aparecer)
2. Se você ainda não possui o [Homebrew](https://brew.sh/) instalado, execute o seguinte comando no Terminal: 

```bash Terminal
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
```

3. Depois que o Homebrew estiver instalado, execute o seguinte comando para instalar o Git:

```bash Terminal
brew install git
```

4. Aguarde até que a instalação seja concluída.

## Linux

O Git já vem instalado com a maioria das distribuições do Linux, porém se o git não estiver instalado, você pode instalar o Git usando o gerenciador de pacotes padrão da sua distribuição.Além disso, é importante ressaltar que distribuições diferentes tem comandos diferentes para instalação, logo caso sua distribuição no seja ubuntu, olhe a [documentação oficial](https://git-scm.com/download/linux) para mais instruções.

1. Abra o Terminal.
2. No Ubuntu e em distribuições baseadas no Debian, execute o seguinte comando:

```bash Terminal
sudo apt-get update
sudo apt-get install git
```

3. Aguarde até que a instalação seja concluída.

## Como verificar se o Git esta instalado?

Após concluir a instalação no seu respectivo sistema operacional, você pode verificar se o Git está corretamente instalado digitando o comando abaixo no terminal, o qual devera retornar a versão do git instalada.

```bash Terminal
git --version
```

## Tem mais alguma coisa para fazer?

Após concluir a instalação do Git e verificar se ele esta instalado, siga os proximos passos para fazer configuração inicial do Git.

1. Abra seu terminal;
2. Execute os seguintes comando, para salvar seu usuario e email do GitHub:

```bash Terminal
git config --global user.name <seu_nome>
git config --global user.email <email_utilizado_no_cadastro_github> 
```

## Quer saber mais sobre Git ?

------------------->[Documentação oficial do Git](https://git-scm.com/docs/git/pt_BR)<--------------------