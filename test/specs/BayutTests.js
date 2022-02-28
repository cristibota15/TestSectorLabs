const search = require('../pageObjects/popularSearch')
const bayut = require('../pageObjects/bayutLanding')
const fetch = require('node-fetch');

describe('Validating Bayut.com', ()=> 
{
    it('Landing page ',()=>
    {
        browser.url("https://www.bayut.com/")
        
        // check if the title displayed is the same with the one expected
        expect(browser).toHaveTitleContaining("Bayut: UAE's Largest Real Estate Portal")

        // set location value 
        bayut.Location.setValue("Dubai Marina")

        //wait for location suggetion to be displayed 
        bayut.locationSugestion.waitForDisplayed()

        // click on the first suggestion
        bayut.locationSugestion.click()
        
        // select for sale propriety
        bayut.Property.click()

        bayut.forsale.waitForDisplayed()

        bayut.forsale.click()

        // find propriety
        bayut.findbutton.click()


        // check title is modified for proprieties in dubai marina
        expect(browser.getTitle()).toEqual("Properties for Sale in Dubai Marina | Bayut.com")

        // check each element that resulted from filtering has Dubai Marina displayed in the description
        const lista = $$("._7afabd84")
        lista.forEach(el=> expect(el).toHaveTextContaining('Dubai Marina'))
        
        
    })

    it('Suggested Proprieties', () =>
    {
        browser.url("https://www.bayut.com/")
        
        
        expect(browser).toHaveTitleContaining("Bayut: UAE's Largest Real Estate Portal")


        search.popular.scrollIntoView()
        search.torent.click()
        search.popular.scrollIntoView()        
        search.viewAll.click()
        
        const urls = search.searchpar.$$("li > a")
        
        
        urls.forEach(url => {
            
            // Open every link from ToRent in a new window 
            browser.newWindow(url.getAttribute('href'))
            //Check the new window has title containing location from location filter 
            expect(browser).toHaveTitleContaining(search.listFilter.getText().split('(')[0])
            //Check that every propriety displayed has the same description location as filter location field
            const lista = $$("._7afabd84")
            lista.forEach(el=> expect(el).toHaveTextContaining(search.listFilter.getText().split('(')[0]))

            //return to previous window
            //after closing the current one
            browser.closeWindow()
            browser.switchWindow("https://www.bayut.com/")

            
            
            
        })
        

        
        
    })

})