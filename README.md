# Sinapse

## Instalação e desenvolvimento

O aplicativo Angular fica na raiz deste repositório. Depois de clonar ou extrair o projeto, execute os comandos a partir desta pasta (a que contém `package.json`):

```bash
npm ci
npx ng serve
```

Abra `http://localhost:4200/`. O `npm ci` instala o Angular CLI, o pacote `qrcode` e todas as demais dependências do `package-lock.json`. A pasta `node_modules` é criada localmente e não faz parte do projeto.

Se aparecer `ng: command not found` ou `Cannot find module`, confirme que o terminal está na raiz do projeto e execute `npm ci` novamente. Não é necessário instalar o Angular CLI globalmente.

Para gerar a versão de produção:

```bash
npm run build
```

O resultado será salvo em `dist/projeto_final`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.34.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
