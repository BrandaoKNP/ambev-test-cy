import LoginPage from '../../support/pages/LoginPage'
import ProductsPage from '../../support/pages/ProductsPage'
import RegisterProductPage from '../../support/pages/RegisterProductPage'

describe('Produtos Frontend', () => {
  const adminEmail = `admin_front_${Date.now()}@qa.com`
  const userEmail = `user_front_${Date.now()}@qa.com`
  const password = 'teste123'
  const productName = `Produto E2E ${Date.now()}`
  let adminId
  let standardUserId

  before(() => {
    cy.createUser({
      nome: 'Admin E2E',
      email: adminEmail,
      password,
      administrador: 'true'
    }).then((res) => {
      adminId = res.body._id
    })

    cy.createUser({
      nome: 'User E2E',
      email: userEmail,
      password,
      administrador: 'false'
    }).then((res) => {
      standardUserId = res.body._id
    })
  })

  after(() => {
    if (standardUserId) cy.deleteUser(standardUserId)
    if (adminId) cy.deleteUser(adminId)
  })

  describe('Full E2E flow: admin creates product, standard user adds to cart', () => {
    it('should login as admin, create product, verify and logout', () => {
      LoginPage.visit()
      LoginPage.doLogin(adminEmail, password)
      ProductsPage.verifyIsOnProductsPage()

      ProductsPage.clickRegisterProduct()
      RegisterProductPage.registerProduct(productName, 69, 'Produto de teste E2E', 100)

      ProductsPage.verifyProductExists(productName)
      ProductsPage.logout()
      cy.url().should('include', '/login')
    })

    it('should login as standard user, find product and add to cart', () => {
      LoginPage.visit()
      LoginPage.doLogin(userEmail, password)
      cy.url().should('include', '/home')

      cy.contains(productName).should('be.visible')

      cy.contains('h5', productName)
        .parents('.card')
        .find('[data-testid="adicionarNaLista"]')
        .click()
    })
  })

  describe('Admin CRUD: create, verify and delete product', () => {
    const crudProductName = `CRUD Produto ${Date.now()}`

    it('should create a product, verify in listing and delete it', () => {
      LoginPage.visit()
      LoginPage.doLogin(adminEmail, password)
      ProductsPage.verifyIsOnProductsPage()

      // Create
      ProductsPage.clickRegisterProduct()
      RegisterProductPage.registerProduct(crudProductName, 150, 'Produto para CRUD', 50)

      // Verify in listing
      cy.visit('/admin/listarprodutos')
      cy.contains('td', crudProductName).should('be.visible')

      // Delete
      cy.contains('tr', crudProductName)
        .find('.btn-danger')
        .click()

      cy.contains('td', crudProductName).should('not.exist')
    })
  })
})
