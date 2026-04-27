class RegisterProductPage {
  get nameInput() { return '[data-testid="nome"]' }
  get priceInput() { return '[data-testid="preco"]' }
  get descriptionInput() { return '[data-testid="descricao"]' }
  get quantityInput() { return '[data-testid="quantity"]' }
  get registerButton() { return '[data-testid="cadastarProdutos"]' }

  visit() {
    cy.visit('/admin/cadastrarprodutos')
  }

  fillProductForm(name, price, description, quantity) {
    cy.get(this.nameInput).clear().type(name)
    cy.get(this.priceInput).clear().type(price.toString())
    cy.get(this.descriptionInput).clear().type(description)
    cy.get(this.quantityInput).clear().type(quantity.toString())
  }

  submit() {
    cy.get(this.registerButton).click()
  }

  registerProduct(name, price, description, quantity) {
    this.fillProductForm(name, price, description, quantity)
    this.submit()
  }
}

export default new RegisterProductPage()
