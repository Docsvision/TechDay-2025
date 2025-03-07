import "./Authentication.js";
import AuthorizationPage from "../pageObjects/Pages/AuthorizationPage.js";


// Авторизация с вводом логина и пароля
Cypress.Commands.add("manualLogin", (login, password) => {
    const authorizationPage = new AuthorizationPage();
    
    authorizationPage.getLoginInput().type(login);
    authorizationPage.getPasswordInput().type(password);
    authorizationPage.getLoginButton().click();
})