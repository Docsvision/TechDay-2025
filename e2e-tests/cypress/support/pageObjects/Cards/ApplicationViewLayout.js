// Класс для работы с разметкой просмотра заявки
class ApplicationViewLayout {
    // Кнопка Отправить в отдел кадров
    getSendToHrButton() {
        return cy.get('.state-buttons-container .state-button')
    }
}
export default ApplicationViewLayout