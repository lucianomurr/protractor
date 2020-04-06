describe('#2 Protractor Testing', function () {
    
    /**
     * this function will be executed on every test case
     */
    beforeAll(function() { 
        browser.ignoreSynchronization = true;
        browser.get('https://www.protractortest.org');
    });
    
    /**
     * click on the specified item By ID
     */
    clickToId = (item) => {
        return element(by.id(item));
    }

    /**
     * 
     * Returns the first element of visible dropdown menu
     */
    menuFirstElement = () => {
        return element.all(by.css('.dropdown.open li')).first();
    }

    /**
     * 
     * Returns the pagename specified between the H1 html element
     */
    getTitle = () => {
        return element(by.tagName('h1'));
    }

    it('- It should navigate the quick start page', function () {
        var drop1 = clickToId('drop1');
        drop1.click();
        browser.sleep(500);
        expect(menuFirstElement(drop1).getText()).toEqual('Tutorial');
        menuFirstElement(drop1).click();
        browser.sleep(500);
        expect(getTitle().getText()).toEqual('Tutorial');
    });

    it('- It should navigate setting up protractor page', function () {
        var drop2 = clickToId('drop2');
        drop2.click();
        browser.sleep(500);
        expect(menuFirstElement(drop2).getText()).toEqual('Setting Up Protractor');
        menuFirstElement(drop2).click();
        browser.sleep(500);
        expect(getTitle().getText()).toEqual('Setting Up Protractor');
    });
});