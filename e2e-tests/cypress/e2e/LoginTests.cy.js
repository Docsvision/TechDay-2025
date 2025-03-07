import DashboardLayout from "../support/pageObjects/Pages/DashboardLayout.js";
import AuthorizationPage from "../support/pageObjects/Pages/AuthorizationPage.js";

describe('Авторизация', () => {
    const dashboard = new DashboardLayout();
    const authorizationPage = new AuthorizationPage();

    it('Авторизация с корректными данными', () => {
        cy.visit('/Account/Login');

        // Настройка перехвата запроса и указание его псевдонима, который будем ожидать
        cy.intercept('POST', `/DocsvisionWebClient/api/employee/getEmployeeStatus`).as('getEmployeeStatus');

        // Заполняем логин/пароль, нажимаем кнопку Войти
		authorizationPage.getLoginInput().type(Cypress.env('user02Login'));
        authorizationPage.getPasswordInput().type(Cypress.env('user02Password'));
        authorizationPage.getLoginButton().click();

        // Ожидаение запроса по псевдониму
        cy.wait('@getEmployeeStatus');

        // Проверяем, что страница загрузилась
        dashboard.getRootLayout().should('exist');
		
		// Проверяем, что виден виджет Мои заявки
        dashboard.getMyApplicationsWidget().should('be.visible');

        // Проверяем, что пользователь авторизован
        dashboard.getUserName().contains('Иванова');

        //Проверяем, что текущий адрес страницы - это адрес дашборда
        cy.url().should('eq', Cypress.config('baseUrl') + '/#/Dashboard');
    })
})