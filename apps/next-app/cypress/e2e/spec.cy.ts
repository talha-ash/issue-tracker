describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form', () => {
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('fills and submits the login form', () => {
    // TODO: intercept server action with MSW before submission

    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
  });
});
