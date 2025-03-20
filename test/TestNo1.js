//Seleniume
//1 failas 1 testas
//Seleniumas visus testus leidzia paraleliai

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
// const should = require('chai').should();
// const {expect} = require('chai');
// import { should } from 'chai';


describe('should add new todo tests', function() {

    after(async function() {
        await driver.quit();
    })
    
    it('should add a new to do', async function() {
        //atsidaryti narsykle
        driver = await new Builder().forBrowser('chrome').build();
        // await driver.sleep(10000);
        //atsidarytume puslapi
        await driver.get('https://todolist.james.am/');
        //By.css('.new-todo') -> cy.get
        //By.xpath()
        //By.className('new-do)
        //By.id()
        //laukiam kol puslapis uzsikrove
        await driver.wait(until.elementLocated(By.className('new-todo')),2000);
        //mes susirastume inputa
        //cy.get('.new-todo')
        const newTodoInput = await driver.findElement(By.css('.new-todo'));
        //imituotume klaviaturos paspaudimus
        newTodoInput.sendKeys('Buy groceries', Key.RETURN);
        await driver.sleep(1000);
        //ir patikrintume ar naujas elementas i sarasa isidejo
        //cy.get('.elementas').contains('kazkoks tai tekstas')
        const addedTodoItem = await driver.findElement(By.xpath("//label[text()='Buy groceries']")).getText(); //Buy groceries
        // addedTodoItem == 'Buy groceries'
        assert.strictEqual(addedTodoItem, 'Buy groceries', 'To do items not equals')
        // /html/body/ng-view/section/section/ul/li[1]/div/label
        
        // Chai
        // addedTodoItem.should.equal('Buy groceries');
        
        console.log(addedTodoItem);
        
    });
});