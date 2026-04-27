describe('Produtos API', () => {
  const apiUrl = Cypress.env('apiUrl')
  let token
  let userId
  let productId

  const uniqueEmail = `admin_prod_${Date.now()}@qa.com`

  before(() => {
    cy.createUser({
      nome: 'Admin Produtos',
      email: uniqueEmail,
      password: 'teste123',
      administrador: 'true'
    }).then((res) => {
      userId = res.body._id
    })

    cy.apiLogin(uniqueEmail, 'teste123').then((res) => {
      token = res.body.authorization
    })
  })

  after(() => {
    if (productId) {
      cy.deleteProduct(productId, token)
    }
    if (userId) {
      cy.deleteUser(userId)
    }
  })

  it('should create a new product', function () {
    const product = {
      nome: `Produto Teste ${Date.now()}`,
      preco: 69,
      descricao: 'Produto criado via automacao',
      quantidade: 100
    }

    cy.createProduct(product, token).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.message).to.eq('Cadastro realizado com sucesso')
      expect(res.body).to.have.property('_id')
      productId = res.body._id
    })
  })

  it('should find the created product by ID', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/produtos/${productId}`
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('nome')
      expect(res.body).to.have.property('preco')
      expect(res.body).to.have.property('descricao')
      expect(res.body).to.have.property('quantidade')
      expect(res.body._id).to.eq(productId)
    })
  })

  it('should delete the product', () => {
    cy.deleteProduct(productId, token).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.message).to.eq('Registro excluído com sucesso')
      productId = null
    })
  })
})
