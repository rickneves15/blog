# Blog

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/): Framework back-end para Node.js.
  - NestJS é um framework back-end para Node.js que utiliza TypeScript e segue uma arquitetura modular. Ele oferece uma estrutura organizada, injeção de dependência e suporte para APIs RESTful. Ao escolher o NestJS, você beneficia-se de uma arquitetura sólida e da tipagem estática do TypeScript.
- [Next.js](https://nextjs.org/): Framework React para construção de aplicações web.
- [React Query](https://react-query.tanstack.com/): Biblioteca para gerenciamento de estado em aplicações React.
- [Tailwind CSS](https://tailwindcss.com/): Framework de utilitários CSS para estilização eficiente.
- [Headless UI](https://headlessui.dev/): Coleção de componentes de interface do usuário sem estilos prontos.
- [Shadcn/UI](https://ui.shadcn.com/): Coleção de componentes de interface do usuário sem estilos prontos.

## Pré-requisitos

- NODE: >21.5.0
- Docker e Dockerfile

## Instalação

1. Clone este repositório: `git clone https://github.com/rickneves15/blog.git`
2. Configuração:
   1. Server
      1. `cd server`
      2. `npm install` ou `yarn install`
      3. `docker-compose up -d --build`
      4. Copie o arquvio [a relative link](server/env.example)
   2. Web:
      1. `cd web`
      2. `npm install` ou `yarn install`
      3. Copie o arquvio [a relative link](server/env.example)
3. Rodar:
   1. Server
      1. `cd server`
      2. `npm run start:dev` ou `yarn start:dev`
   2. Web:
      1. `cd web`
      2. `npm run dev` ou `yarn dev`
