---
order: 1
icon: book
label: "Guia prático"
author:
    name: "Matheus das Neves"
category: Explicação
date: 2023-10-26
---

# Guia prático para desenvolver em Next

Como citado, Next é um framework que implementa a biblioteca React. React estrutura a organização de suas páginas através da componentização, ou seja, as páginas são componentes (funções) chamadas em determinado momento, que irão retornar trechos HTML.

Deste modo, a primeira coisa que precisamos fazer é criar um componente React e fazer a estruturação dele.

## Criação de Páginas

Existem dois tipos de roteamento  usados no Next, Pages Router e App Router. Usamos a primeira opção, logo não é necessário conhecer a segunda aqui. 

Como usamos Pages Router, devemos criar nossas pastas e arquivos das páginas dentro da pasta pages.

Assim, criamos o componente React declarando uma função e exportando ela deste modo:

``` ts

function HelloWorld() {
    return(
        <div>
        <p> Hello world <p>
        </div>
    )
}

export default HelloWorld
```


Esta função retorna um trecho HTML, composto de tags e componentes do próprio HTML, porém o Next proporciona alguns componentes especiais:

### Componentes Next

#### Head

Este componente adiciona elementos para o head de uma página. Pode ser usado várias vezes em um mesmo componente e, assim, pode gerar duplicação, logo para evitar este problema identifique o head com o props key. Exemplo:

``` ts
import Head from 'next/head'

function HelloWorld() {
    return(
        <div>
            <Head>
                <title> Página do Hello World </title>
                <meta key="title" />
            </Head>
                <p> Hello world <p>
            <Head>
                <title> Página do Hello World 2 </title>
                <meta key="title" /> // Declarando a key do Head para não causar duplicação de Head's. 
            </Head>
        </div>
    )
}

export default HelloWorld
```

#### Image

O componente <Image> é usado para demonstrar imagens e possui propriedades bastante interessantes, sendo necessário importar o componente da biblioteca Next como no exemplo:

```ts

import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}
```

- `src` representa uma imagem estática importada no próprio código ou o caminho da imagem, podendo ser tanto um caminho local quanto um link URL. Para links URL's externos, deve-se configurar o remotePatterns no arquivo `next.config.ts`, mais detalhes [aqui](https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns).
- `width` e `height` representam, respectivamente, o comprimento e altura da imagem em pixeis. Ambas propriedades são requeridas exceto em caso de imagens estáticas importadas.
- `alt` é usado para definir uma descrição, caso aconteça algum erro que impossibilite o carregamento da imagem.

O componente Image possui vários props opcionais que podem ser úteis dependendo da situação, para saber mais consulte [aqui](https://nextjs.org/docs/pages/api-reference/components/image#optional-props)

#### Link

O componente Link é um componente React para navegação entre rotas pelo lado do cliente, otimizando essa transição e evitando carregamentos desencessários da página.

```ts
import Link from 'next/link'
 
function Home() {
  return (
    <Link href = "/paginaHelloWorld" replace = { false } scroll = { false }>
    </Link>
  )
}
 
export default Home
```

- `href` é o caminho que o navegador será redirecionado.
- `replace` é usado para configurar se o componente Link redirecionará a mesma página para a rota referida (caso `true`) ou se irá abrir uma nova aba com a rota (caso `false`).
- `scroll`, caso seja `true`, "scrolla" a página para o topo, caso seja `false` a posição se mantem a mesma. Por padrão, essa propriedade é `true`.

### Layouts

Agora que seus componentes React estão construídos, talvez precisemos de um layout. Pense na situação que seu site possui dois componentes que são fixos independente da página: a navbar e a footer. Podemos montar um layout, um modelo em que sempre possui a navbar e a footer envolvendo um componente dinâmico:

```ts components/layout.tsx
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({children}) {
    return (
        <>
        <Navbar />
        <main> {children} </main>
        <Footer />
        </>
    )
}
```

Fizemos o layout, o modelo que contém nossa navbar e nossa footer, e entre elas a `children` que vai ser o componente que o layout irá receber como parâmetro. Agora, precisamos colocar esse layout no componente `MyApp`, que é o componente primário da nossa aplicação, por onde todos os outros são executados:

```ts pages/_app.tsx
import Layout from '../components/layout'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

Agora, qualquer componente no `MyApp` será executado dentro do `Layout`.
Para mais informações sobre roteamento entre páginas, consulte na documentação do [Next](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#layout-pattern).

## Roteamento

Agora, como poderemos ter acesso às páginas construídas?

No Next, as páginas são roteadas de forma automática, ou seja, o caminho local (tirando o diretório raiz pages) da sua página será a rota. Assim, um componente no caminho `pages/hello_world.tsx` teria uma rota `/hello_world`.

Para rotas dinâmicas, o nome do arquivo do componente deve estar entre colchetes `[]`. Assim, o que estiver entre os colchetes será a parte dinâmica da rota. Exemplo:

O caminho `pages/user/profile/[id].tsx` poderá ter uma rota `/user/profile/3`. Os segmentos dinâmicos podem ser acessados pelo uso do `useRouter` que devolve um objeto, onde, no caso anteriormente citado, os segmentos dinâmicos estariam no `.query.id` do objeto recebido.

Para mais informações sobre roteamento entre páginas, consulte na documentação do [Next](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#layout-pattern).

## Métodos de busca de dados

Com os componentes React construídos e o roteamento entre eles definidos, talvez precisemos de alguns métodos de busca de dados para obter as informações necessárias para a construção da página ou para uma devida comunicação entre as páginas.

!!!
Os seguintes exemplos serão dados usando fetch para simular uma comunicação com a API, mas usamos Axios para, de fato, solicitar requisições HTTP. 
!!!

### getStaticProps

Imagine que você tem uma página que usa props estáticos ou propriedades que não mudam com grande frequência. Tendo isso em mente, não seria desnecessário minha página ser toda reconstruída e solicitar mais requests para o servidor quando eu quisesse, por exemplo, recarregá-la?

Percebendo isso, o getStaticProps resolve esse problema porque ele torna sua página estática, então quando tentamos recarregá-la não será preciso reconstruí-la novamente.

E, para tornar sua página estática, basta definir a função getStaticProps, atentando à tipagem característica do TypeSript:

```ts pages/page.tsx  
import type { InferGetStatiPropsType, GetStaticProps} from 'next'

type Repo = { // Vou supor que a página que queremos recebe um nome e uma idade do getStaticProps
  name: string
  age: number
}

export const getStaticProps = (async () => {
  const res = await fetch('endereço da api')
  const repo = res.json()
  return {props: { repo }, revalidate: 10}   // Estamos retornando um objeto com a resposta do server e
  // definindo o atributo revalidate (opcional) que é o tempo de espera em segundos para atualizar os props

}) satisfies GetStaticProps<{repo : Repo}>   // Declarando pelo operador 'satisfies' que retorna
// um objeto com uma propriedade repo do tipo Repo, que definimos anteriormente

export default function Page({ repo }: 
  InferGetStaticProps<typeof getStaticProps>){   // Acima estamos usando InferGetStaticProps para inferir
  // se os props recebidos são do tipo da função getStaticProps
    
    return(
      <h1> Nome: {repo.name} </h1>
      <h1> Idade: {repo.age} </h1>
    )
  }
```

Para mais informações, consulte a documentação do próprio [Next](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### getStaticPaths

De forma semelhante ao getStaticProps, o getStaticPaths é usado para evitar reconstruções e requisições desnecessárias do site a partir da construção de páginas estáticas quando usando rotas dinâmicas, para cada rota. 

Para usar o getStaticPaths, deve se definir a função na página, do mesmo modo que em getStaticProps. Além de que é necessário também definir o getStaticProps, pois a partir das rotas estáticas recebidas pelo getStaticPaths pegamos nossas propriedades/data, siga o exemplo:

```ts pages/user/profile/[id].tsx
import type {InferGetStaticPropsType, GetStaticProps, GetStaticPaths} from 'next'
 
// Neste exemplo vamos lidar com uma página de rota dinâmica que irá receber os possíveis ID's
// pelo getStaticPaths, pré-renderizando as páginas com estes ID's, e, pelo getStaticProps, vamos receber as informações do user

type User = { // Criando o tipo User que queremos receber no getStaticProps
  name: string
  idade: number
}

export const getStaticPaths = ( async () => {
  const res = await fetch('https://.../users') // Url de exemplo pegando todos os users do servidor
  const users = await res.json()
  const paths = users.map((user) => ({ // Pegando todos os ID's dos users e colocando numa array de objetos deste modo: [{id: post.id}....]
  path: { id: user.id },              //  Deste modo, o Next pré-renderiza todas as páginas com os ID's que buscamos
  })) 
  
  return { paths, fallback: false} // fallback: false significa que rotas não pré-renderizadas aqui serão tratadas como not found (404)
}) satisfies GetStaticPaths

export const getStaticProps = ( async(params) => {
  const res = await fetch(`https://.../users/${params.id}`) // Pegando informações de um user em específico pelo ID
  const user = await res.json()
  return { props: { user } }
}) satisfies GetStaticProps<{user : User}>

export default function Profile({ user } : InferGetStaticPropsType<typeof getStaticProps>) {
  // Componente profile.....
}
```

Para mais informações sobre `getStaticPaths` ou o atributo `fallback` do mesmo, consulte a documentação do [Next](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths).

### getServersideProps

Vimos os métodos getStaticProps e getStaticPaths, que são usados quando não há mudanças frequentes nas informações ou atualizações não são tão necessárias. Porém, caso precisemos de um método de busca de dados que envolva informações dinâmicas, que mudam constantemente, podemos usar o getServerSideProps. Nele, a página é construída no lado do servidor e, então, mandada para o cliente. Deste modo, o tempo para interação do cliente com a página é um pouco maior, porém promove maior segurança.

Para usar o getServerSideProps, basta definir a função:

```ts pages/user/profile/[id].tsx
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
type User = {
  name: string
  idade: number
}
 
export const getServerSideProps = (async (context) => {
  const { params } = context
  const res = await fetch(`https://.../users/${params.id}`) // As informações são buscadas e a página é construída no lado servidor
  const user = await res.json()                            //  E, ao contrário do getStaticProps, as informações são dinâmicas
  return { props: { user } }
}) satisfies GetServerSideProps<{ user: User }>
 
export default function Profile({user} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Componente profile...
}
```

Para mais informações sobre `getServerSideProps` consulte a documentação do [Next](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props).

## API

Tendo o conhecimento necessário de métodos de busca de dados, precisamos definir nossa API e suas rotas, que é por onde iremos fazer a comunicação do cliente com o servidor e ter acesso aos dados.

Nosso projeto Next é monorepo, ou seja, ambos cliente e servidor são feitos no mesmo repositório. Deste modo, definimos nossa API primeiramente criando um diretório `api` dentro de `pages`.

### Criando as rotas 

Assim como o roteamento das páginas, as rotas são organizadas pelos diretórios. Então, para fazermos uma chamada a uma determinada URL da api, o caminho será o diretório. Exemplo: `pages/api/user/[id].tsx` teria a rota `api/user/[com algum id ou não]`. E, então, podemos definir nossas rotas nela:

```ts pages/api/user/[id].tsx
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) { // Essa função tem como parâmetro req (requisição) e res (response) e declaramos o tipo desses parâmetros
  // O parâmetro req tem as propriedades da nossa requisição como: qual tipo de requisição, qualquer dado passado etc...
  // O parâmetro res é por onde setaremos nossa resposta: o código de status, o corpo json passado ao cliente...
  // Então aqui tratamos os diferentes tipos de requisições verificando o parâmetro req pela propriedade method, que nos diz qual tipo de requisição é
  
  if (req.method == 'GET') { // Caso seja uma requisição GET
    res.status(200).json({ message: 'Rota de GET da API' }) // No parâmetro res (response) seta o código de status pelo ".status" e o corpo do json passando pelo ".json"
  }
  if (req.method == 'POST') {
    // Requisição POST
  }
  if (req.method === 'DELETE') {
    // Requisição DELETE
  }
  // ...
}

```

Superficialmente, deste modo são definidas as rotas. Porém para informações mais detalhadas sobre API, consulte a documentação do [Next](https://nextjs.org/docs/pages/building-your-application/routing/api-routes).

### Chamando as rotas no cliente

Agora, definidas as rotas, precisamos chamá-las no cliente. Podemos fazer isso usando Axios, faremos exemplos para os métodos HTTP (GET, POST, DELETE):


#### GET

Primeiramente, vamos fazer uma demonstração de requisição GET fazendo uma função para consumir esta requisição no cliente:

```ts src/clientApi/users/useUsers.ts
import axios from 'axios';

function useUsers() {
    const [users, setUsers] = useState<User[]>(); // Criamos um estado para o nosso users para podermos setar os dados que recebermos da API
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        axios.get("/api/users/") // Fazemos a requisição para a API
            .then(res => {  // Se suceder, caimos no .then, onde receberemos a resposta do servidor
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => alert(err.message)) // Caso contrário, cairemos no .catch, onde receberemos o erro ocorrido
    }, [])

    return users; // Aqui retornamos para nosso client o users, onde os dados recebidos da API foram guardados
}
```

#### POST

Agora, fazendo para o método POST, o esquema é o mesmo, porém o uso do Axios é um pouco diferente:

```ts pages/user/register.tsx
import axios from 'axios'

// O método POST é usado para registrar informações no servidor
// Então usaremos um exemplo de registro de usuário

export default function Register() {
  
  const handleSubmit = (ev) => { // Função que será executada no onSubmit de um form
    ev.preventDefault()
    axios.post('api/users/', { data : {' dados do form'}}).then(response => { // Na função .post você manda a rota da api e, como é necessário mandar dados, um objeto com as devidas informações
      // Tratamento da resposta
    }).catch(err => {
      // Tratamento de erro
    })
  }

  return (
    <form onSubmit = {handleSubmit}> // Só um exemplo de form com a arrow function handleSubmit que definimos acima 
      <button type = 'submit'>
      </button>
    </form>
  )
}
```

#### DELETE

Com o método DELETE, geralmente manda-se uma rota dinâmica, com um ID que identifica o dado a ser deletado. Tendo isso em mente, a função pode trabalhar da seguinte maneira:

```ts pages/user/delete.tsx
import axios from 'axios'

// Neste exemplo, deletaríamos nossa conta. Teríamos que usar o axios.delete() e passar a rota dinâmica com o ID da nossa conta

export default function Delete() {

  const handleClick = (ev) => { 
    axios.delete(`api/users/${user.id}`).then(response => { // Neste caso precisaríamos obter nosso user.id de alguma maneira, talvez por contexto (não é o nosso foco aqui), e mandar uma rota dinâmica com o ID
      // Tratamento da resposta
    }).catch(err => {
      // Tratamento de erro
    })
  }
  
  return (
    <button onClick = { handleClick }>
      <p> Deletar Conta </p>
    </button>
  )
}
```

Para mais informações sobre chamadas da api, consulte a documentação do [Axios](https://axios-http.com/docs/intro).