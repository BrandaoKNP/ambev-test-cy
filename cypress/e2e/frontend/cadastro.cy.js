import RegisterPage from '../../support/pages/RegisterPage'
import ProductsPage from '../../support/pages/ProductsPage'

describe('Cadastro de Usuario Frontend', () => {
  const uniqueEmail = `cadastro_front_${Date.now()}@qa.com`
  let userId

  after(() => {
    if (userId) {
      cy.deleteUser(userId)
    }
  })

  it('should register a new admin user and redirect to home', () => {
    RegisterPage.visit()
    RegisterPage.registerUser('Novo Admin', uniqueEmail, 'teste123', true)
    ProductsPage.verifyIsOnProductsPage()
  })

  it('should not register user with duplicate email', () => {
    cy.createUser({
      nome: 'Duplicado',
      email: uniqueEmail,
      password: 'teste123',
      administrador: 'true'
    }).then((res) => {
      userId = res.body._id
    })

    RegisterPage.visit()
    RegisterPage.registerUser('Outro Usuario', uniqueEmail, 'teste123', true)
    cy.contains('Este email já está sendo usado').should('be.visible')
  })
})
