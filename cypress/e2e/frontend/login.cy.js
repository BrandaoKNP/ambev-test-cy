import LoginPage from '../../support/pages/LoginPage'
import ProductsPage from '../../support/pages/ProductsPage'

describe('Login Frontend', () => {
  const uniqueEmail = `login_front_${Date.now()}@qa.com`
  const password = 'teste123'
  let userId

  before(() => {
    cy.createUser({
      nome: 'Login Frontend',
      email: uniqueEmail,
      password,
      administrador: 'true'
    }).then((res) => {
      userId = res.body._id
    })
  })

  after(() => {
    if (userId) {
      cy.deleteUser(userId)
    }
  })

  it('should login and redirect to products page', () => {
    LoginPage.visit()
    LoginPage.doLogin(uniqueEmail, password)
    ProductsPage.verifyIsOnProductsPage()
  })

  it('should show error for invalid credentials', () => {
    LoginPage.visit()
    LoginPage.doLogin(uniqueEmail, 'senhaerrada')
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })
})
