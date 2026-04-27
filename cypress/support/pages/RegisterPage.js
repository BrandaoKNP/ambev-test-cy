class RegisterPage {
  get nameInput() { return '[data-testid="nome"]' }
  get emailInput() { return '[data-testid="email"]' }
  get passwordInput() { return '[data-testid="password"]' }
  get adminCheckbox() { return '[data-testid="checkbox"]' }
  get registerButton() { return '[data-testid="cadastrar"]' }

  visit() {
    cy.visit('/cadastrarusuarios')
  }

  fillName(name) {
    cy.get(this.nameInput).clear().type(name)
  }

  fillEmail(email) {
    cy.get(this.emailInput).clear().type(email)
  }

  fillPassword(password) {
    cy.get(this.passwordInput).clear().type(password)
  }

  toggleAdmin() {
    cy.get(this.adminCheckbox).click()
  }

  submit() {
    cy.get(this.registerButton).click()
  }

  registerUser(name, email, password, isAdmin = false) {
    this.fillName(name)
    this.fillEmail(email)
    this.fillPassword(password)
    if (isAdmin) this.toggleAdmin()
    this.submit()
  }
}

export default new RegisterPage()
