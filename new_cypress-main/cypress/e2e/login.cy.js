  import * as data from "../helpers/default_data.json"
  import * as result_page from "../locators/result_page.json"
  import * as main_page from "../locators/main_page.json"
  import * as recovery_page from "../locators/recovery_password_page.json"

  describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/'); // зашла на сайт
         });

    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); //проверяю крестик
   });


    it('Верный пароль и верный логин', function () {
        
        cy.get(main_page.email).type(data.login); // ввела верный логин
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click(); // нажимаю войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю текст
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })

     it('Восстановление пароля', function () {

        cy.get(main_page.fogot_pass_btn).click(); // нажимаю на забыли пароль
        cy.get(recovery_page.email).type('german@dolnikov.ru'); // ввожу почту
        cy.get(recovery_page.send_button).click(); // нажимаю отправить на email
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })

     it('Верный логин и неверный пароль', function () {
        
        cy.get(main_page.email).type(data.login); // ввела верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // ввела неверный пароль
        cy.get(main_page.login_button).click(); // нажимаю войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // наличие текста
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })

  it('Неверный логин и верный пароль', function () {
        
        cy.get(main_page.email).type('german@dolnikov1.ru'); // ввела неверный логин
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click();// нажимаю войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // вижу текст
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })

    it('Валидация на наличие @', function () {
        
        cy.get(main_page.email).type('germandolnikov.ru'); // ввела логин без @
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click(); // нажимаю войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // вижу текст
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввела логин 
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click(); // нажимаю войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // наличие текста
        cy.get(result_page.title).should('be.visible'); // проверяю что текст виден пользователю
        
    })
})
