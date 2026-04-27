describe('Usuarios API', () => {
  let userId

  const uniqueEmail = `user_${Date.now()}@qa.com`
  const user = {
    nome: 'QA Tester',
    email: uniqueEmail,
    password: 'teste123',
    administrador: 'true'
  }

  afterEach(() => {
    if (userId) {
      cy.deleteUser(userId)
      userId = null
    }
  })

  it('should register a new user successfully', () => {
    cy.createUser(user).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.message).to.eq('Cadastro realizado com sucesso')
      expect(res.body).to.have.property('_id')
      userId = res.body._id
    })
  })

  it('should not register user with duplicate email', () => {
    cy.createUser(user).then((res) => {
      userId = res.body._id

      cy.createUser(user).then((duplicateRes) => {
        expect(duplicateRes.status).to.eq(400)
        expect(duplicateRes.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })
})
