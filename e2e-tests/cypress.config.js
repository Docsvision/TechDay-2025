const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Ширина и высота в пикселях области просмотра в интерфейсе Cypress
  viewportWidth: 1280,
  viewportHeight: 1024,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Шаблон для поиска спек-файлов с тестами
    specPattern: 'cypress/e2e/*.cy.js',
    // Файл поддержки - место, где вы можете хранить код, который будет выполняться перед каждым тестом
    supportFile: 'cypress/support/e2e.js',
    // Адрес тестируемого приложения
    // Cypress автоматически добавит этот адрес в качестве префекса в командах cy.visit() и cy.request()
    baseUrl: 'http://webclient-server/DocsvisionWebClient',
    // Таймаут в мс для команд Cypress, работающих с DOM-объектами. По умолчанию равен 4 секундам 
    defaultCommandTimeout: 10000,
    // Таймаут в мс ожидания запроса в команде cy.wait(). По умолчанию равен 5 секундам
    requestTimeout: 10000,
  },
  // Переменные окружения Cypress. Параметры, которые различаются на разных машинах разработчиков и/или различаются в разных средах
  env: {
    'user01Login': 'user1',
    'user02Login': 'user2',
    'user03Login': 'user3',
    'user04Login': 'user4',
    'user01Password': 'password',
    'user02Password': 'password',
    'user03Password': 'password',
    'user04Password': 'password',
  }
})