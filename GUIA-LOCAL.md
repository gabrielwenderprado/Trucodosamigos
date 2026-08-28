# Campeonato dos 6 — Guia local

Este projeto é um dashboard React estático. Pode ser executado no computador e publicado no GitHub sem usar banco de dados ou servidor externo.

## Requisitos

Instale o **Node.js 20 ou superior**. Depois de extrair o ZIP, abra o terminal dentro da pasta do projeto.

## Abrir diretamente com Live Server

A forma mais simples é abrir a pasta `campeonato-dos-6` no Visual Studio Code, clicar com o botão direito no ficheiro `index.html` que está na raiz e escolher **Open with Live Server**. Não precisa de `npm install`, Vite ou configuração adicional. O navegador abrirá automaticamente um endereço parecido com `http://127.0.0.1:5500`.

Esta versão standalone já tem ranking, semanas, prémios, roleta e sorteio automático de duas equipas. A fotografia do truco fica em `assets/a-maior-dozada-do-truco.webp` e já aparece como destaque no topo. Para publicar no GitHub Pages, mantenha a pasta `assets` junto do `index.html` e do `data.js`.

## Executar a versão React opcionalmente

Se quiser trabalhar na versão React do projeto, use:

```bash
npm.cmd install --legacy-peer-deps
npm.cmd run dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

## Editar o campeonato

Os dados ficam em `client/src/data/championship.ts`. Nesse ficheiro você pode atualizar os nomes, pontos, datas, equipas e campeão de cada semana. Para adicionar uma semana, copie um bloco existente dentro de `weeks` e altere o `id`, a data, os jogadores, os pontos e o campo `champion`. Não é necessário editar o menu do site: todas as semanas que você colocar em `data.js` aparecem automaticamente no seletor.

O ranking geral usa os pontos definidos no array `players`. A roleta usa automaticamente esses seis jogadores e sorteia duas equipas de três quando a funcionalidade estiver ligada no dashboard.

## Verificar o projeto

```bash
npm run check
npm run build
```

## Publicar no GitHub

Crie um repositório vazio no GitHub e, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Adicionar dashboard Campeonato dos 6"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Para publicação automática como GitHub Pages, pode usar uma Action de deploy de Vite ou publicar a pasta `dist` através das configurações do repositório. O endereço e o nome final do repositório podem exigir a configuração de `base` no `vite.config.ts`.

## Nota sobre edição

O site é público e somente leitura para os seus amigos. As alterações são feitas localmente no ficheiro de dados e ficam visíveis depois de um novo `git push`.
