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

## Decisões Técnicas

- **Page Object Model** — Os seletores e ações de cada página ficam centralizados em uma classe. Isso facilita a manutenção, já que qualquer mudança no frontend precisa ser ajustada em um único lugar.
- **Custom Commands** — Operações recorrentes como login e criação de usuário foram extraídas para comandos reutilizáveis, mantendo os testes mais limpos e focados nas validações.
- **Setup via API** — Os testes de frontend preparam seus dados de pré-condição pela API. Além de mais rápido, garante que um problema na interface não comprometa testes que não são sobre ela.
- **Dados dinâmicos com `Date.now()`** — E-mails e nomes de produtos recebem um timestamp único a cada execução, evitando conflitos de duplicidade e permitindo que os testes rodem múltiplas vezes sem interferência.
- **`failOnStatusCode: false`** — Permite validar cenários negativos (como login inválido ou e-mail duplicado) normalmente, sem que o Cypress interrompa o teste antes da assertiva.
- **Fluxos sequenciais em um único `it`** — O Cypress limpa a sessão entre blocos `it`, então fluxos que dependem de estado contínuo são mantidos juntos para preservar a sessão do navegador. (Isso é um ponto negativo do Cypress ao meu ver que estou em grande contato com Playwright, mas totalmente contornável)
- **Separação `api/` e `frontend/`** — Organizar por tipo permite executar cada grupo de forma independente, o que é especialmente útil em pipelines de CI.
- **Page Object Model vs componentes simples** — Optei pelo POM clássico (uma classe por página com getters e métodos) por ser o padrão mais difundido em projetos Cypress e o mais legível para quem vai revisar. Em projetos maiores, poderia evoluir para composições menores por componente, mas para o escopo atual o POM por página atende bem.
- **Fixtures como referência** — O arquivo `products.json` não é consumido diretamente nos testes (os dados são criados inline com nomes dinâmicos), mas foi mantido como referência de estrutura. Em um cenário real, fixtures são úteis para testes com dados estáticos ou para alimentar múltiplos cenários com o mesmo payload.

## Observação sobre o fluxo de Git

Os commits foram feitos diretamente na `main` sem uso de branches e pull requests. Em um cenário real, o ideal seria trabalhar em uma feature branch e abrir um PR para revisão.
