// Класс для работы с разметкой создания заявки
class ApplicationCreateLayout {
    // Вид заявки
    getApplicationKindInput() {
        return cy.get('[data-control-name="appKind"] input')
    }
    // Плейсхолдер у поля Вид заявки
    getApplicationKindPlaceholder() {
        return cy.get('[data-control-name="appKind"] .placeholder')
    }
    // Выпадающий список при поиске вида заявки
    getApplicationKindList() {
        return cy.get('[data-control-name="appKind"] .variants-dropdown')
    }
    // Поле Описание
    getDescriptionInput() {
        return cy.get('.note-editable')
    }
    // Инпут для загрузки основного файла
    getMainFileUploadInput() {
        return cy.get('[data-testid="mainFileUploadInput"]')
    }
    // Инпут для загрузки дополнительного файла
    getExtraFileUploadInput() {
        return cy.get('[data-testid="additionalFileUploadInput"]')
    }
    // Кнопка Сохранить
    getSaveButton() {
        return cy.get('[data-button-name="save-layout"]')
    }
}
export default ApplicationCreateLayout