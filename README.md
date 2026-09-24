# Sinapse

## Rodar o frontend

O aplicativo Angular e suas dependências ficam na pasta `frontend`. Após baixar o projeto ou atualizar a branch, instale as dependências nessa pasta:

```bash
cd frontend
npm ci
npm start
```

Abra `http://localhost:4200/`. O pacote `qrcode`, usado nas páginas Home e Compartilhar, é instalado pelo `npm ci` a partir de `frontend/package.json` e `frontend/package-lock.json`. A pasta `node_modules` é criada localmente e não faz parte do repositório.

Para conferir a compilação, execute `npm run build` ainda dentro de `frontend`.

Se aparecer `Cannot find module 'qrcode'`, pare o servidor, rode `npm ci` dentro de `frontend` e inicie novamente com `npm start`.

O QR Code atual abre uma página pública de demonstração com conteúdo fictício. Os registros adicionados ao histórico ficam apenas na sessão do navegador.
