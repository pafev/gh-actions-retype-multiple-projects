---
order: 1
icon: rocket
label: "Quais comandos posso usar ?"
author:
  name: Araújo
  avatar: ../../Imagens DocStruct/Logos/logo_struct.png
date: 2023-09-24
category: Comandos
---

## Git Init

O comando `git init` é usado para inicializar um repositório Git em um diretório específico. Quando você executa o `git init` em um diretório vazio ou existente, ele cria um novo repositório Git local nesse local.

Aqui está uma explicação passo a passo do acontece quando você executa o comando `git init`:

1. Criação do repositório: O comando `git init` cria uma pasta oculta chamada ".git" no diretório atual. Essa estrutura é onde o Git armazenará todas as informações relacionadas ao controle de versão(**evitar mexer na pasta a não ser que seja necessario ou que voce saiba o que esta fazendo**).

2. Pronto para versionamento: Após a execução bem-sucedida do comando `git init`, o diretório atual está pronto para o versionamento. Agora você pode começar a adicionar arquivos ao repositório, realizar commits para registrar as alterações e usar outros comandos do Git para gerenciar o histórico e colaborar com outras pessoas.

!!!
**É importante lembrar que o git init cria apenas um REPOSITÓRIO LOCAL**. Se você deseja compartilhar seu repositório com outras pessoas ou colaborar em um projeto, você pode usar serviços de hospedagem em varias plataformas online (GitHub, GitLab, Bitbucket e etc), porém na Struct a platarforma principal e o GitHub para criar um **REPOSITÓRIO REMOTO onde outros desenvolvedores possam contribuir**.
!!!

## Git Remote

O comando `git remote` **é usado para visualizar, adicionar ou remover repositórios remotos em seu repositório local**. Os repositórios remotos são os locais onde você envia ou recebe as alterações do seu código.

Aqui está uma explicação passo a passo do que você pode fazer com o comando `git remote`:

1. Visualizar repositórios remotos: Quando você executa `git remote`, ele lista os repositórios remotos atualmente configurados para o seu repositório local. Por padrão, o repositório remoto principal é chamado de **origin**, que é usado para enviar e receber alterações.

2. Adicionar repositórios remotos: Você pode usar o comando `git remote add <link_do_repositorio>` para adicionar um novo repositório remoto ao seu repositório local. Isso é útil quando você deseja colaborar em um projeto hospedado em um serviço de hospedagem Git, como o GitHub, o GitLab ou o Bitbucket.

3. Remover repositórios remotos: Com o comando `git remote remove <nome_do_repositorio>`, você pode remover um repositório remoto existente do seu repositório local. Isso é útil se você não deseja mais colaborar com um determinado repositório remoto.

## Git Status

O comando `git status` é útil para entender o estado do seu repositório e tomar decisões sobre quais ações devem ser tomadas em relação aos arquivos modificados. Ele ajuda a garantir que você esteja ciente de todas as mudanças antes de realizar um commit ou realizar outras operações no Git.

Aqui está uma explicação passo a passo do acontece quando você executa o comando `git status`:

1. Status do branch: O `git status` mostrará em qual branch você está trabalhando no momento. Será exibido o nome da branch atual.

2. Ramificações: O comando irá informar se há commits na branch atual que ainda não foram enviados para o **BRANCH REMOTO** correspondente (se você estiver trabalhando com um **REPOSITÓRIO REMOTO**).

3. Mudanças não rastreadas: Se houver arquivos no seu diretório de trabalho que ainda não foram adicionados ao controle de versão do Git, o `git status` os listará como "untracked" (não rastreados). Isso significa que o Git não está acompanhando esses arquivos.

4. Mudanças a serem confirmadas: O `git status`  mostrará os arquivos modificados que já estão sob o controle do Git. Essas alterações estão prontas para serem adicionadas ao próximo commit.

5. Mudanças confirmadas: Se você já fez um commit, o `git status`  informará que o diretório de trabalho está limpo, ou seja, não há alterações pendentes.

6. Sugestões de próximos passos: O `git status`  também pode fornecer sugestões sobre o que fazer em seguida, com base no estado atual do repositório. Por exemplo, pode sugerir comandos como `git add`  para adicionar arquivos ao commit ou `git branch`  para listar as ramificações disponíveis.

## Git Add

O comando `git add` é usado para adicionar arquivos ao índice (também conhecido como área de stage) do Git. Ele prepara os arquivos para serem incluídos no próximo commit.

Aqui está uma explicação passo a passo do acontece quando você executa o comando `git add`:

1. Adicionando arquivos ao índice: O `git add` permite que você especifique um ou mais arquivos que deseja adicionar ao índice. Por exemplo, você pode usar `git add <nome_arquivo>` para adicionar um arquivo específico ou `git add .` para adicionar **TODOS** os arquivos modificados no diretório atual.

2. Preparação para o próximo commit: Ao adicionar os arquivos ao índice, você está preparando-os para serem incluídos no próximo commit. O índice é uma área intermediária entre o diretório de trabalho (onde você edita os arquivos) e o repositório Git (onde os commits são registrados).

3. Rastreamento de alterações: Quando você adiciona um arquivo ao índice, o Git começa a rastrear as alterações feitas nele. Isso significa que o Git será capaz de registrar essas alterações no próximo commit.

4. Preparando um commit parcial: O `git add` também pode ser usado para criar commits parciais, selecionando apenas partes específicas de um arquivo para serem adicionadas ao índice. Isso é útil quando você fez várias alterações em um arquivo, mas deseja commitar apenas algumas delas.

5. Verificação do status: Após executar `git add`, você pode usar o comando `git status` para verificar o status do repositório e ver quais arquivos foram adicionados ao índice.

!!!
**Lembrando que o `git add` não realiza um commit imediato**, apenas prepara os arquivos para serem incluídos no próximo commit. Para registrar as alterações no repositório, você ainda precisa executar o comando `git commit` posteriormente.
!!!

## Git Commit

O comando `git commit` é usado para criar um novo commit no repositório Git. Um commit é uma confirmação das alterações feitas em um conjunto de arquivos, representando um ponto específico no histórico do projeto.

Aqui está uma explicação passo a passo do acontece quando você executa o comando `git commit`:

1. Preparando o commit: Antes de executar o comando `git commit`, é importante ter usado o comando `git add` para adicionar os arquivos desejados ao índice (área de stage). Esses arquivos são preparados para fazer parte do commit.

2. Abrindo o editor de mensagens: Quando você executa `git commit`, o Git abre um editor de texto para que você possa fornecer uma mensagem de commit. Essa mensagem descreve as alterações que estão sendo adicionadas no commit.

3. Escrevendo a mensagem de commit: No editor de texto, você deve escrever uma mensagem clara e concisa que descreva as alterações realizadas. A mensagem de commit é uma parte essencial do histórico do projeto e ajuda a entender o que foi alterado no commit.

4. Salvando o commit: Após escrever a mensagem de commit, você salva e fecha o editor de texto. Nesse momento, o Git cria um novo commit contendo todas as alterações que foram adicionadas ao índice. O commit é identificado por um hash exclusivo, que o torna único dentro do repositório.

5. Registrando as alterações no histórico: O commit é registrado no histórico do projeto, criando um novo ponto no histórico do desenvolvimento. Ele armazena uma versão dos arquivos e suas alterações correspondentes.

6. Rastreando o histórico: O Git mantém um histórico completo dos commits, permitindo que você navegue entre diferentes versões dos arquivos e reverta alterações, se necessário.

!!!
**O comando `git commit` pode ser utilizado da seguinte forma `git commit -m <frase_sobre_o_que_fez_no_commit>`, a fim de simplificar o processo de abrir um editor de texto e aumentar a praticidade no versionamento.**
!!!

## Git Push

O comando `git push` é usado para enviar as **alterações locais do seu repositório Git para um repositório remoto. Ele atualiza o branch remoto com os commits feitos localmente.**

Aqui está uma explicação passo a passo do que acontece quando você executa o comando `git push`:

1. Identificando o repositório remoto: Antes de usar o `git push`, você precisa configurar um repositório remoto usando o comando `git remote add <link_repositorio>`. Isso define um nome para o repositório remoto, geralmente chamado de **origin**, que é usado como referência para o push.

2. Verificando o branch atual: O `git push` envia as alterações do branch atual para o branch correspondente no repositório remoto. **É importante garantir que você esteja no branch correto antes de executar o push**.

3. Autenticação e conexão: O Git irá autenticar você com o repositório remoto, solicitando suas credenciais, caso necessário. Ele também estabelecerá uma conexão segura com o repositório remoto.

4. Enviando os commits: Quando você executa `git push`, o Git **enviará os commits locais que não estão presentes no repositório remoto**. Esses commits incluem as alterações que você fez e registrou localmente usando o `git commit`.

5. Atualizando o branch remoto: O repositório remoto receberá os commits enviados e atualizará o branch correspondente. Se não houver conflitos, o branch remoto será atualizado com as alterações do branch local.

6. Confirmação do push: Após a conclusão do `git push`, você receberá uma confirmação de que os commits foram enviados com sucesso e o branch remoto foi atualizado.

## Git Clone

**Comando `git clone` é usado para criar uma cópia local de um repositório remoto existente**. Ele permite que você baixe todo o histórico do projeto, incluindo todos os branches e commits, para o seu ambiente de desenvolvimento local, como tambem é a maneira mais comum de iniciar o desenvolvimento em um projeto existente.

Aqui está uma explicação passo a passo do que acontece quando você executa o comando `git clone`:

1. Identificando o repositório remoto: Ao executar o comando `git clone <link_do_repositorio>`, você precisa fornecer o URL do repositório remoto que deseja clonar. O URL pode ser obtido, por exemplo, a partir da página do projeto no GitHub.

2. Criando uma cópia local: O `git clone` cria uma cópia exata do repositório remoto em seu diretório local. Ele cria um novo diretório com o nome do projeto e faz o download de todos os arquivos, commits e branches do repositório remoto.

3. Estabelecendo conexão: O Git estabelece uma conexão com o repositório remoto e autentica você, solicitando suas credenciais, se necessário. Isso permite que você acesse o repositório e baixe todas as informações relacionadas.

4. Baixando o histórico do projeto: Ao executar o `git clone`, o Git baixa todo o histórico do projeto, incluindo todos os commits e branches. Você terá uma cópia local completa do repositório, pronta para uso.

5. Configurações adicionais: Além do histórico do projeto, o `git clone` também pode baixar outras configurações do repositório, como hooks personalizados ou arquivos de configuração específicos.

## Quer saber mais comandos do Git ?

------------------->[Documentação oficial do Github](https://docs.github.com/pt/get-started/using-git/about-git)<--------------------