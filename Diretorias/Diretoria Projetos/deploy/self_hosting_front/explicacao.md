---
order: 3
icon: rocket
label: "O que é Self-Hosting (Front-End)?"
---

<!-- Ultima atualização: 23/09/2023 -->
<!-- Autor(es): Artur Padovesi -->

Self-hosting, também conhecido como auto-hospedagem, é um conceito em tecnologia que se refere à prática de hospedar e gerenciar seus próprios serviços, aplicativos ou plataformas em infraestrutura própria, em vez de utilizar serviços e plataformas de terceiros ou fornecedores externos. Em outras palavras, quando você opta por self-hosting, você é responsável por configurar, administrar e manter todos os aspectos do serviço ou aplicativo que está executando.Considerando que nenhum framework, e nem SSR, está sendo usado, a aplicação react não inclui servidor. No ambiente de desenvolvimento são usadas ferramentas para servir a aplicação na porta determinada (na Struct determinamos como 3000), mas no deploy utilizamos o NGinx, um servidor web que pode ser usado para servir arquivos estáticos, como imagens, css, js, etc. Sendo assim, depois que nossa aplicação react é buildada, ela é mantida pelo NGinx.