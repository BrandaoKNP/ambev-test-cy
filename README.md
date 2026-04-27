# Ambev Test Cypress

Testes automatizados E2E e API com Cypress para o [ServeRest](https://serverest.dev/).

## Tecnologias

- **Cypress** — Framework de testes E2E
- **JavaScript** — Linguagem dos testes
- **Node.js** — Runtime

## Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── api/              # Testes de API
│   └── frontend/         # Testes E2E do frontend
├── fixtures/             # Dados de teste (JSON)
├── support/
│   ├── commands.js       # Comandos customizados do Cypress
│   ├── e2e.js            # Arquivo de suporte carregado antes dos testes
│   └── pages/            # Page Objects
│       ├── LoginPage.js
│       ├── RegisterPage.js
│       ├── ProductsPage.js
│       └── RegisterProductPage.js
```

## Padrões Adotados

- **Page Object Model** — Encapsula seletores e ações de cada página
- **Custom Commands** — Reutilização de ações comuns (login, criação de usuário via API)
- **Fixtures** — Dados de teste centralizados em arquivos JSON
- **Separação API/Frontend** — Testes organizados por tipo

## Pré-requisitos

- Node.js >= 18
- npm >= 9

## Instalação

```bash
npm install
```

## Execução

```bash
# Abrir Cypress (modo interativo)
npm run cy:open

# Executar todos os testes (headless)
npm run cy:run

# Executar apenas testes de API
npm run cy:run:api

# Executar apenas testes do frontend
npm run cy:run:frontend
```

## Aplicações Testadas

| Tipo     | URL                              |
|----------|----------------------------------|
| Frontend | https://front.serverest.dev      |
| API      | https://serverest.dev            |
