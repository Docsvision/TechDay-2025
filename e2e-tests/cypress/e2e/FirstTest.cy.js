describe('Первые тест', () => {
    it('Первый тест', () => {
        cy.visit('/Account/Login');

        // Настройка перехвата запроса и указание его псевдонима, который будем ожидать
        cy.intercept('POST', `/DocsvisionWebClient/api/employee/getEmployeeStatus`).as('getEmployeeStatus');

        // Заполняем логин/пароль, нажимаем кнопку Войти
		cy.get('[name="Логин"]').type(Cypress.env('user02Login'));
		cy.get('[name="Пароль"]').type(Cypress.env('user02Password'));
		cy.get('.login-button').click();

        // Ожидаение запроса по псевдониму
        cy.wait('@getEmployeeStatus');

        // Проверяем, что страница загрузилась
        cy.get('#layout-root').should('exist');
		
		// Проверяем, что виден виджет Мои заявки
        cy.get('.custom-tables:has([href*="d347c802-f390-4eee-a609-704218586afe"])').should('be.visible');

        // Проверяем, что пользователь авторизован
        cy.get('.user-menu-user').contains('Иванова');

        //Проверяем, что текущий адрес страницы - это адрес дашборда
        cy.url().should('eq', Cypress.config('baseUrl') + '/#/Dashboard');

        // Настрока перехвата запроса на разметку новой карточки
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/newCard**`).as('newCard');

        // Нажимаем кнопку Создать в виджете Мои заявки
        cy.get('.custom-tables__header-right-button').click();

        // Ожидаем запрос (ждем пока прогрузится разметка новой карточки)
        cy.wait('@newCard');

        // Кликаем в поле Вид заявки
        cy.get('[data-control-name="appKind"] .placeholder').should('be.visible').click();

        // Пишем в поле Вид заявки
        cy.get('[data-control-name="appKind"] input').type('2-НДФЛ');

        // Выбираем вид заявки из выпадающего списка
        cy.get('[data-control-name="appKind"] .variants-dropdown').should('be.visible');
        cy.get('[data-control-name="appKind"] .variants-dropdown').contains('2-НДФЛ').click();

        // Кликаем в поле Описание
        cy.get('.note-editable').click();

        // Пишем в поле Описание
        cy.get('.note-editable').type('Тестовая заявка');

        // Указываем в переменной путь к основному файлу
        let filePath = 'cypress/fixtures/MainFileDoc.docx';

        // Загружаем основной файл и ждем загрузки
        cy.intercept('POST', `/DocsvisionWebClient/api/LayoutFileApi/AddFiles`).as('AddFiles');
        cy.get('[data-testid="additionalFileUploadInput"]').selectFile(filePath, { force: true });
        cy.wait('@AddFiles');

        // Нажимаем кнопку Сохранить и ожидаем загрузки разметки просмотра
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/view?cardId**`).as('viewCard');
        cy.get('[data-button-name="save-layout"]').click();
        cy.wait('@viewCard');

        //Нажимаем кнопку Отправить в отдел кадров и перехватываем запрос с обновлением разметки
        cy.intercept('GET', `/DocsvisionWebClient/api/layoutCard/getLayout**`).as('getLayout');
        cy.get('.state-buttons-container .state-button').click();

        // Ожидаем загрузку разметки и из перехваченного запроса проверяем статус
        cy.wait('@getLayout').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const stateId = interception.response.body.data.cardInfo.state.stateId;
            const caption = interception.response.body.data.cardInfo.state.caption;
            expect(stateId).to.eq('1ec6065e-4335-476e-a60e-b477cfbe7575');
            expect(caption).to.eq('Обрабатывается в отделе кадров');
        })
    })
})