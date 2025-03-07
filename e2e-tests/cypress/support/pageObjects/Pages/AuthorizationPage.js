// Класс для работы со страницей авторизации. Включаем сюда методы для работы с элементами на странице авторизации
class AuthorizationPage {
    // Поле Логин
    getLoginInput() {
        return cy.get('[name="Логин"]')
    }
    // Поле Пароль
    getPasswordInput() {
        return cy.get('[name="Пароль"]')
    }
    // Кнопка Войти
    getLoginButton() {
        return cy.get('.login-button')
    }   
}
export default AuthorizationPage