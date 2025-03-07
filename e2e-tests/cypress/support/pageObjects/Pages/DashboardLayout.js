// Класс для работы с дашбордом. Включаем сюда методы для работы с элементами на странице Дашборд
class DashboardLayout {
    getRootLayout() {
        return cy.get('#layout-root')
    }
    // Виджет Мои заявки
    getMyApplicationsWidget() {
        return cy.get('.custom-tables:has([href*="d347c802-f390-4eee-a609-704218586afe"])')
    }
    // Кнопка Создать в виджете Мои заявки
    getCreateApplicationButton() {
        return cy.get('.custom-tables__header-right-button')
    }
    // ФИО пользователя в меню
    getUserName() {
        return cy.get('.user-menu-user')
    }
}
export default DashboardLayout