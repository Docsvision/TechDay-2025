import DashboardLayout from "../support/pageObjects/Pages/DashboardLayout.js";
import ApplicationCreateLayout from "../support/pageObjects/Cards/ApplicationCreateLayout.js";
import ApplicationViewLayout from "../support/pageObjects/Cards/ApplicationViewLayout.js";
import { files } from "../fixtures/fixtures.js";

describe('Сценарии работы с заявками` ', () => {
    const dashboard = new DashboardLayout();
    const applicationCreateLayout = new ApplicationCreateLayout();
    const applicationViewLayout = new ApplicationViewLayout();

    // Выполняется один раз перед всеми тестами. Авторизуемся и сохраняем куки
    before('Initialize', () => {
        cy.visit("/Account/Login");
        cy.intercept('POST', `/DocsvisionWebClient/api/employee/getEmployeeStatus`).as('getEmployeeStatus');
        cy.manualLogin(Cypress.env('user02Login'), Cypress.env('user02Password'));
        cy.wait('@getEmployeeStatus');
        cy.getWebClientCookies();
    })

    // Выполняется перед каждым тестом. Устанавливаем куки, сохраненные ранее, пропускаем таким образом авторизацию в каждом тесте
    beforeEach(() => {
        cy.setWebClientCookies();
        cy.intercept('POST', `/DocsvisionWebClient/api/employee/getEmployeeStatus`).as('getEmployeeStatus');
        cy.visit("/");
        cy.wait('@getEmployeeStatus');
    })

    it('Создание заявки и отправка в отдел кадров', function () {
        let appKind = '2-НДФЛ';
        let appDescription = 'Тестовая заявка';
        let expectStateId = '1ec6065e-4335-476e-a60e-b477cfbe7575';
        let expectStateName = 'Обрабатывается в отделе кадров';

        // Нажимаем кнопку Создать в виджете Мои заявки
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/newCard**`).as('newCard');
        dashboard.getCreateApplicationButton().click();
        cy.wait('@newCard');

        // Выбираем вид заявки
        applicationCreateLayout.getApplicationKindPlaceholder().click();
        applicationCreateLayout.getApplicationKindInput().type(appKind);
        applicationCreateLayout.getApplicationKindList().should('be.visible');
        applicationCreateLayout.getApplicationKindList().contains(appKind).click();

        // Пишем в поле Описание
        applicationCreateLayout.getDescriptionInput().click();
        applicationCreateLayout.getDescriptionInput().type(appDescription);

        // Загружаем основной файл
        cy.intercept('POST', `/DocsvisionWebClient/api/LayoutFileApi/AddFiles`).as('AddFiles');
        applicationCreateLayout.getMainFileUploadInput().selectFile(files.mainFile, { force: true });
        cy.wait('@AddFiles');

        // Нажимаем кнопку Сохранить
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/view?cardId**`).as('viewCard');
        applicationCreateLayout.getSaveButton().click();
        cy.wait('@viewCard');

        //Нажимаем кнопку Отправить в отдел кадров и перехватываем запрос с обновлением разметки
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/getLayout**`).as('getLayout');
        applicationViewLayout.getSendToHrButton().click();

        // Ожидаем загрузку разметки и из перехваченного запроса проверяем статус
        cy.wait('@getLayout').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const stateId = interception.response.body.data.cardInfo.state.stateId;
            const caption = interception.response.body.data.cardInfo.state.caption;
            expect(stateId).to.eq(expectStateId);
            expect(caption).to.eq(expectStateName);
        })
    })
})