
const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

describe('should edit specific todo tests', function() {

    after(async function() {
        await driver.quit();
    })
    
    it('should edit specific todo', async function() {
        //atsidaryti narsykle
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://todolist.james.am/');
        await driver.wait(until.elementLocated(By.className('new-todo')),2000);

        const newTodoInput = await driver.findElement(By.className('new-todo'));

        await newTodoInput.sendKeys('1 uzduotis',Key.RETURN);
        await newTodoInput.sendKeys('2 uzduotis',Key.RETURN);
        await newTodoInput.sendKeys('3 uzduotis',Key.RETURN);
        await newTodoInput.sendKeys('4 uzduotis',Key.RETURN);
        await newTodoInput.sendKeys('5 uzduotis',Key.RETURN);
        await newTodoInput.sendKeys('6 uzduotis',Key.RETURN);

        await driver.sleep(1000);
        //3 uzduotis contains
        // const editableToDo = await driver.findElement(By.xpath("//ul[@class='todo-list']//li[contains(., '3 uzduotis')]"));
        const editableToDo = await driver.findElement(By.xpath("/html/body/ng-view/section/section/ul/li[3]"));
        //atliekame double click
        driver.actions().doubleClick(editableToDo).perform();

        const editField = await editableToDo.findElement(By.css('input.edit'));

        //editField.clear()
        //isvalome editField
        for(let i=0; i<100;i++) {
            await editField.sendKeys(Key.BACK_SPACE);
        }

        await editField.sendKeys('Redaguota uzduotis', Key.RETURN);

        const editedItem = await driver.findElement(By.xpath("//ul[@class='todo-list']//li[contains(., 'Redaguota uzduotis')]")).getText();

        assert.strictEqual(editedItem, 'Redaguota uzduotis', 'Todo not edited')

    });
});