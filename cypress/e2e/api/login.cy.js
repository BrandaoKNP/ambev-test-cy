describe('Login API', () => {
  const uniqueEmail = `login_${Date.now()}@qa.com`
  const password = 'teste123'
  let userId

  before(() => {
    cy.createUser({
      nome: 'Login Tester',
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

  it('should login successfully and return a token', () => {
    cy.apiLogin(uniqueEmail, password).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.message).to.eq('Login realizado com sucesso')
      expect(res.body.authorization).to.include('Bearer ')
    })
  })

  it('should return 401 for invalid credentials', () => {
    cy.apiLogin(uniqueEmail, 'senhaerrada').then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq('Email e/ou senha inválidos')
    })
  })
})
