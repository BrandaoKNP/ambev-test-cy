const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('createUser', (user) => {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/usuarios`,
    body: user,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUser', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl}/usuarios/${id}`,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: { email, password },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('createProduct', (product, token) => {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/produtos`,
    headers: { Authorization: token },
    body: product,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteProduct', (id, token) => {
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl}/produtos/${id}`,
    headers: { Authorization: token },
    failOnStatusCode: false
  })
})
