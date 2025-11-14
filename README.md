# Alvorya Site

Site portfólio da Alvorya Vision desenvolvido com Vite, TailwindCSS e jQuery.

## 🚀 Comandos

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em `http://localhost:5173/`

### Build para Produção
```bash
npm run build
```
Compila o projeto para produção na pasta `dist/` e copia os assets necessários.

### Preview da Build
```bash
npm run preview
```
Visualiza a versão de produção localmente em `http://localhost:4173/`

## 📁 Estrutura após Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── images/
│       ├── min/
│       └── real/
```

## 🌐 Deploy

Para fazer deploy, use os arquivos da pasta `dist/`:
- GitHub Pages: Faça push da pasta `dist/`
- Netlify/Vercel: Configure o build command como `npm run build` e o output como `dist`

## 🛠️ Tecnologias

- **Vite** - Build tool e dev server
- **TailwindCSS 4** - Framework CSS
- **jQuery** - Manipulação DOM e animações
- **TypeScript** - Configuração do Vite
