# Bem-Vindo à Wiki da \{struct\}

Este é um espaço no Retype com o objetivo de concentrar todo o conhecimento possível da Struct em um só lugar.

## Conteúdo

Neste espaço deve-se concentrar todos os conhecimentos de gestão e execução de projetos assim como gestão da Struct em si. Por favor, contribua toda vez que verificar que algo está faltando. Caso tenha dúvidas de como trabalhar aqui, acesse a documentação do [Retype](https://retype.com).

## Primeiros Passos

### Repositório

Para começar a trabalhar no DocStruct, clone o [repositório no GitHub](https://github.com/StructCE/DocStruct/), acesse a branch da sua diretoria e começe a fazer as modificações nela. É recomendado avisar os outros membros da sua diretoria, para que não haja duas pessoas trabalhando na mesma branch ao mesmo tempo.

#### Observações importantes:

- Use, preferencialmente, a branch de desenvolvimento da sua diretoria para fazer mudanças;
- **Jamais** faça mudanças diretamente na main \(boatos de que quem o fez não está mais na Struct para contar a história\);
- Antes de abrir um pull request, verifique o funcionamento da branch no ambiente de desenvolvimento;

### Rodando localmente

Instale a nova ferramenta para documentação com o gerenciador de pacotes desejado, e rode `retype start`:

+++ NPM

```
npm install retypeapp --global
retype start
```

+++ Yarn

```
yarn global add retypeapp
retype start
```

+++ dotnet

```
dotnet tool install retypeapp --global
retype start
```

+++

### Arquivos

Para poder começar a documentar com retype:

- Criação do diretório: os futuros diretórios e seus arquivos `.md` aparecerão na barra lateral, com seus próprios nomes caso não sejam personalizados/configurados.
- Configuração: cria-se um arquivo `.yml` para algumas configurações, como os nomes dos diretóros na barra lateral, ícones para representação etc.
- Conteúdo: enfim, cria-se um arquivo `.md`, onde será estruturada e organizada toda a documentação por meio das ferramentas do Retype.

####

É possível criar subdiretórios, basta fazer o mesmo processo só que dentro de um diretório.

#### Algumas ferramentas importantes

##### Alerta

+++ Aparência
!!! Alerta
Este é um alerta do retype
!!!
+++ Código

```
!!! Título do Alerta
Alerta
!!!
```

+++

##### Código

+++ Aparência

```js Hello World
const msg = "Hello World";
```

+++ Código

````
```js Hello World
const msg = 'Hello World'
```
````

+++

##### Container

A vantagem do container é você poder personalizar o css separadamente.

<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>

+++ Aparência
::: sample
Este é um container personalizado
:::
+++ Código

```
<style>
    .sample {
        text-align: center;
        color: #1956AF;
        border-radius: 10px;
        background-color: #E1EDFF;
        border: 1px solid #1956AF;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>
::: sample
Este é um container personalizado
:::
```

+++

##### Table

+++ Aparência
Para mostrar a diferência entre aparência e código, usamos o componente table
+++ Código

```
+++ Aparência
Para mostrar a diferência entre aparência e código, usamos o componente table
+++ Código
Tudo desta coluna
```

+++

####

Para mais informações sobre documentação em Retype, consulte a seção [especificações](/#especificações).

## Especificações

### Git e GitHub

Para realizar modificações nas páginas do Retype, é necessário ter um conhecimento básico em alguns conceitos de git, como: add, commit, pull, clone, push e branch. Caso não possua domínio sobre esses conceitos ou deseje revisar algum, a Struct possui um material apresentando uma explicação sucinta [dos principais comandos](https://drive.google.com/file/d/1tH0LaDnD14pHnqq4cymkAjvYX5wkVrCs/view?usp=sharing). Caso queira obter informações mais detalhadas, pode-se consultar o livro _[Pro Git](https://git-scm.com/book/en/v2)_ gratuitamente.

### Funcionamento

O Retype usa arquivos de formato markdown, como componentes, para a estruturação da documentação online, os exibindo na forma de páginas web. O roteamento dos componentes é feita de forma automática pelo Retype e de acordo com os diretórios do projeto. O diretório raiz do projeto pode conter um arquivo .yml que cuida da configuração do site, como a navbar, footer etc. Assim como, cada componente do projeto também pode conter um arquivo .yml para a configuração separada do componente e um arquivo .md para a própria estruturação em markdown.

- Em um arquivo `.yml`, com nome padrão de index.yml, é feita a personalização e configuração do site ou de um componente específico. Para a configuração do site, pode ser necessário a consulta das ferramentas providas pelo [Retype](https://retype.com/configuration/project/#project-configuration). Já para a configuração de um componente específico há outras [ferramentas](https://retype.com/configuration/page/#page-configuration) disponíveis.
- Em um arquivo `.md` é feita a estruturação em markdown do site ou componente, sem ele nada deve aparecer no site ou no componente. O Retype provê muitas [ferramentas](https://retype.com/components/) para estruturar o conteúdo da documentação. Caso deseje aprender mais sobre como escrever em arquivos markdown, seria interessante também dar uma olhada em sua [sintaxe básica](https://retype.com/guides/formatting/).
