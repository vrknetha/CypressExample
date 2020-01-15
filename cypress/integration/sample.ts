
describe('TypeScript', () => {

    beforeEach(() => {
        cy.visit('/cs-admin-login');
        cy.get('[type="submit"]')
            .as('submit-button')
            .get('[formcontrolname="email"]')
            .as('username')
            .get('[formcontrolname="password"]')
            .as('password')
    });
    it('Verify the page title', () => {
        cy.title().should('be.eq', 'Convosight');
    });
    it('Verify page elelements', () => {
        cy.get('.mat-card-title')
            .should((title) => {
                expect(title.text()).equal('Welcome to Convosight Admin!');
            });
        cy.get('mat-card-subtitle')
            .should((title) => {
                expect(title.text()).equal('Login to your account');
            });

        cy.get('@submit-button')
            .should('be.disabled');
        cy.get('@username')
            .type('123')
            .get('.error-txt')
            .then(ele => {
                expect(ele.text).equal('Enter a valid email')
            })
            .get('@username')
            .clear();
        cy.get('.tooltip-text').then(ele => {
            expect(ele.text).equal('Email should be in the format mail@domain.com')
        });

        cy.get('@username')
            .click()
            .should('have.css', 'color')
            .should('be.colored', '#f44336');
        cy.get('@password')
            .click()
            .should('have.css', 'color')
            .and('equal', '#f44336');
    });

    it('Verify page throw error messages for invalid typein', () => {

    });
    it('Verify login using valid credentials', () => {
        cy.Login('***********', '************');
    });
    it('Verify the incorrect username or password message', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '*******************************',
            status: 400,
            headers: {
                'x- amz - target': 'AWSCognitoIdentityProviderService.RespondToAuthChallenge'
            },
            response: { "__type": "NotAuthorizedException", "message": "Incorrect username or password." }
        }).as('login-call');
        cy.Login('**************', '***********');
        cy.wait('@login-call')
            .get('.error-txt').then(ele => {
                expect(ele.text).equal('Incorrect username or password.')
            });
    });
})