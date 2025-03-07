let savedFedAuthCookie;
let savedFedAuth1Cookie;
let savedAspNetCoreCookies;
let savedUserIdCookie;
let savedUserNameCookie;

// Команда для установки куков WebClient
Cypress.Commands.add("setWebClientCookies", () => {
    cy.session('cookies', () => {
        cy.setCookie('FedAuth', savedFedAuthCookie)
        cy.setCookie('FedAuth1', savedFedAuth1Cookie)
        cy.setCookie('UserId', savedUserIdCookie)
        cy.setCookie('UserName', savedUserNameCookie)
    })
})

// Команда для получения куков WebClient
Cypress.Commands.add("getWebClientCookies", () => {
    cy.getCookie('FedAuth').should('exist').then((c) => {
        savedFedAuthCookie = c.value
    })
    cy.getCookie('FedAuth1').should('exist').then((c) => {
        savedFedAuth1Cookie = c.value
    })
    cy.getCookie('UserId').should('exist').then((c) => {
        savedUserIdCookie = c.value
    })
    cy.getCookie('UserName').should('exist').then((c) => {
        savedUserNameCookie = c.value
    })
})