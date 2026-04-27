class LoginPage {
  get emailInput() { return '[data-testid="email"]' }
  get passwordInput() { return '[data-testid="senha"]' }
  get loginButton() { return '[data-testid="entrar"]' }
  get registerLink() { return '[data-testid="cadastrar"]' }

  visit() {
    cy.visit('/login')
  }

  fillEmail(email) {
    cy.get(this.emailInput).clear().type(email)
  }

  fillPassword(password) {
    cy.get(this.passwordInput).clear().type(password)
  }

  submit() {
    cy.get(this.loginButton).click()
  }

  doLogin(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }

  goToRegister() {
    cy.get(this.registerLink).click()
  }
}

export default new LoginPage()
