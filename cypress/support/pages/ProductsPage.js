class ProductsPage {
  get registerProductButton() { return '[data-testid="cadastrarProdutos"]' }
  get logoutButton() { return '[data-testid="logout"]' }

  verifyIsOnProductsPage() {
    cy.url().should('include', '/admin/listarprodutos')
  }

  clickRegisterProduct() {
    cy.get(this.registerProductButton).click()
  }

  verifyProductExists(productName) {
    cy.contains(productName).should('be.visible')
  }

  logout() {
    cy.get(this.logoutButton).click()
  }
}

export default new ProductsPage()
