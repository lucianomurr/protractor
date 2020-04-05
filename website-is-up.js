describe('Protractor Testing', function () {
    it('to check the page title', function () {
        browser.ignoreSynchronization = true;
        browser.get('https://www.protractortest.org');
        browser.driver.getTitle().then(function (pageTitle) {
            expect(pageTitle).toEqual('Protractor - end-to-end testing for AngularJS');
        });
    });
});