const allureReporter = require('@wdio/allure-reporter').default;
const { expect, Assertion, assert } = require('chai');
let csvToJson = require('convert-csv-to-json');
var RandExp = require('randexp');

const Utilities = require("./utilities.js");
const RandomDataGenerator = require("./randomDataGenerator.js");



class Operations {

    async waitTillAllRequestsDone() {
        return new Promise( (resolve, reject) => {
            while( browser.hasPendingRequests()) {
                console.log("Test Requests")
                 browser.pause(50);
            }
            return resolve(true);
        })
    }

    async toClick(element) {
        if (element != null) {
            try {
                // await this.waitForElement(element)
                //this.waitUntilElementExists(element)
                await this.scrollIntoView(element)
                await element.click()
            }
            catch (err) {
                console.error('**********' + err.message + '****************')
            }
        }

    }

    async waitforElementAndClick(element){
        
        await this.waitForElement(element);
        await element.click()

    }

    async toSetValue(element, value) {
        await element.waitForDisplayed();
        await element.clearValue();
        await element.setValue(value);
    }

    async toSetValue_JSExecutor(element, value) {
        await element.waitForDisplayed();
        return browser.execute(`arguments[0].value='${value}'`, element);
    }

    /**
     * @azman4
     * @param {*} element 
     * @param {*} value 
     */
    async toAddValue(element, value) {
        await element.waitForDisplayed()
        await element.addValue(value)
    }
    /**
     * @azman4
     * @param {*} element - checkbox/option button
     * @returns - True/False
     */
     async toGetIfSelected(element) {
        await element.waitForDisplayed()
        return element.isSelected()
    }

    async toGetText(element) {
        await element.waitForDisplayed()
        await element.scrollIntoView();
        return await element.getText()
    }

    /**
     * @azman4
     * @param {*} element -  //a
     * @param {*} propertyName - eg: title
     * @returns - property value of the element
     */
    async toGetProperty(element, propertyName) {
        await element.waitForDisplayed()
        await element.scrollIntoView();
        return await element.getProperty(propertyName);
    }

    async toIsDisplayed(element) {
        await element.waitForDisplayed()
        return await element.isDisplayed()

    }

    async toGetTitle() {
        return browser.getTitle()
    }

    /**
     * @azman4
     * @description : Click function using JavaScriptExecutor
     */
    async toclick_JSExecutor(element) {
        await element.scrollIntoView();
        return browser.execute("arguments[0].click();", element)
    }

    async toWaitAndClick_JSExecutorWait(element) {
        await browser.pause(2000);
        return browser.execute("arguments[0].click();", element)
    }
    /**
     * @azman4
     * @description Scroll into view using JS Executor
     * @param {*} element 
     * @returns 
     */
    async toscroll_JSExecutor(element) {
        return browser.execute("arguments[0].scrollIntoView(true);", element)
    }

    async moveToElement(element) {
        await element.waitForDisplayed();
        await element.moveTo();
    }

    async scrollIntoView(element) {
        await browser.pause(1000)
        await element.scrollIntoView();
    }


    async waitForElementDisplayed(element, sec) {
        await element.waitForDisplayed({ timeout: sec });
    }

    async waitForElementClicked(element, sec) {
        await element.waitForClickable({ timeout: sec });
    }

    async waitForElementEnabled(element, sec) {
        await element.waitForEnabled({timeout:sec})
    }

    async switchToFrame(element) {
        await browser.switchToFrame(element);
    }

    async dropDownScrollToElementAndClick(element) {
        await element.scrollIntoView();
        await this.toClick(element);
    }
    /**
     * @description - With JS Click
     * @azman4
     * @param {*} element - element to click
     */
    async dropDownScrollToElementAndClick1(element) {
        await element.scrollIntoView();
        await this.toclick_JSExecutor(element);
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select value
     */
    async dropDownClickAndSelectValue(dropDownField, dropDownValue) {
        await dropDownField.waitForClickable(10000);
        await this.toClick(await dropDownField);
        await dropDownValue.waitForClickable(10000);
        await this.dropDownScrollToElementAndClick(await dropDownValue)
    }

    async dropDownClickAndSelectValue1(dropDownField, dropDownValue) {
        await this.waitForElement(dropDownField);
        await this.scrollIntoView(dropDownField);
        await this.toclick_JSExecutor(dropDownField);
        await dropDownValue.waitForClickable(10000);
        await this.dropDownScrollToElementAndClick1(dropDownValue)
    }
    
    /**
     * @description - JS Click followed by JS Click
     * @azman4
     * @param {*} dropDownField - List
     * @param {*} dropDownValue  - Option(s)
     */
    async dropDownClickAndSelectValue2(dropDownField, dropDownValue) {
        await this.toclick_JSExecutor(dropDownField);
        await this.dropDownScrollToElementAndClick1(dropDownValue)
    }

    /**
     * @azman4
     * @description : Select value from the listbox and move the option
    */

    async dropDownSelectElementToMove(selectDropDownValue, moveIcon) {
        await this.toclick_JSExecutor(selectDropDownValue);
        await this.toClick(moveIcon)
    }
    /**
     * @azman4
     * @param {*} selectDropDownValue 
     * @param {*} moveIcon 
     */
    async dropDownSelectElementToMove1(selectDropDownValue, moveIcon) {
        await this.toclick_JSExecutor(selectDropDownValue);
        await this.toclick_JSExecutor(moveIcon);
    }


    async dropDownSelectByIndex(element, index) {
        await element.selectByIndex(index)
    }

    /**
     * @malateshpatilDH
     * @description - wait for the element to display till the specified time
     * @param {*} element 
     */
    async waitForElement(element) {
        await browser.waitUntil(
            async () => (await element.isDisplayed()) === true,
            {
                timeout: 90000,
                timeoutMsg: element.selector + 'didnt load afer 80 seconds of wait',
                interval: 1000
            }
        )
    }

    /**
     * @azman4
     * @description - check if the element is disabled
     * @param {*} selector - element xpath
     */
    async isElementDisabled(selector) {
        const element = await $(selector);
      
        // Check if the element is disabled
        const isDisabled = !(await element.isEnabled());
      
        return isDisabled;
    }
    
    /**
     * @azman4
     * @description - Waits until elements exists on DOM
     * @param {*} element 
     */
    async waitUntilElementExists(element) {
        await browser.waitUntil(
            async () => (await element.isExisting()) === true,
            {
                timeout: 100000,
                timeoutMsg: "Element "+element.selector+ 'does not exist',
                interval: 1000
            }
        )
    }

    // done
    /**
     * @azman4
     * @description - Generate Random Birthdate in MM/DD/YYYY format and it must be lesser than 31 Dec,2005
     * @param {*} dateString 
     */
    async generateRandomBirthDate(to='01/01/1970', from='12/31/2005', dateFormat='MM/dd/yyyy') {
        return await RandomDataGenerator.getRandomBirthdate(to, from, dateFormat);
      }

    //remove
    /**
     * @azman4
     * @description - Convert date format from mm/dd/yyyy to dd.mm.yyyy
     * @param {*} dateString 
     */
    async convertDateFormat(dateString, dateFormat="MM.dd.yyyy") {
        return await Utilities.formatDate(dateString, dateFormat);
        
      }

    /**
     * @azman4
     * @description - Convert date format from dd/MMM/yyyy to dd.mm.yyyy
     * @param {*} dateString 
     */
    async DateFormatter(dateString, format) {
        // Parse the input date string into a Date object
        let date = new Date(dateString);
      
        // Extract day, month, and year from the Date object
        let day = date.getDate();
        let month = date.getMonth() + 1; // Add 1 to get the month (January is 0)
        let year = date.getFullYear();
      
        // Pad day and month with leading zeros if needed (to ensure 2-digit format)
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
      
        // Construct the new date string in "dd.mm.yyyy" format
        let formattedDate="";
        if(format == "dd.mm.yyyy"){
            formattedDate = `${day}.${month}.${year}`;
        } else if((format == "mm.dd.yyyy")){
            formattedDate = `${month}.${day}.${year}`;
        }
        
        return formattedDate;
    }

    /**
     * @azman4
     * @description - Convert date format from MMM DD, yyyy to dd.mm.yyyy
     * @param {*} dateString 
     */
    async DateFormatterMDY(dateString) {
        // Split the input date string by space and get the month, day, and year
        let dateParts = dateString.split(' ');
        let month = dateParts[0];
        let day = (dateParts[1]).slice(0, -1); // Remove the comma from the day
        let year = dateParts[2];
      
        // Create a Date object using the extracted parts (for validation)
        let dateObj = new Date(`${month} ${day}, ${year}`);
      
        // Validate if the Date object is valid
        if (isNaN(dateObj.getTime())) {
          return 'Invalid date format'; // Return an error message for invalid date format
        }
      
        // Format the date in "dd.mm.yyyy" format
        let formattedDate = `${day}.${await this.getMonthNumber(month)}.${year}`;
      
        return formattedDate;
    }

    async getMonthNumber(monthName) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (months.indexOf(monthName) + 1).toString().padStart(2, '0');
    }

    /**
     * @azman4
     * @description - Waits until elements exists on DOM
     * @param {*} element 
     */
     async waitUntilElementEnabled(element) {
        await browser.waitUntil(
            async () => (await element.waitForEnabled()) === true,
            {
                timeout: 100000,
                timeoutMsg: "Element "+element.selector+ 'is not enabled',
                interval: 1000
            }
        )
    }

    //remove
    /**
     * @azman
     * @description - Convert date format from dd-MM-yyyy to dd/mm/yyyy
     * @param {*} dateString 
     */
    async convertDateFormat3(dateString, dateFormat='dd/MM/yyyy') {
        let parts = dateString.split('-');
        
        //converting them to mm/dd/yyyy format so that Date class can parse it
        return await Utilities.formatDate(`${parts[1]}-${parts[0]}-${parts[2]}`, dateFormat);
    }



    /**
     * @azman4dh
     * @description - wait for the element to display till the specified time
     * @param {*} element 
     */
    async waitForNotDisplayed(element, timeoutmsg) {
        try{
            await browser.waitUntil(
                async () => (await element.isDisplayed()) === false,
                {
                    timeout: 300000,
                    timeoutMsg: timeoutmsg,
                    interval: 3000
                }
            )
        }catch(error){
            console.log(error);
        }
    }

    //done
    /**
     * @malateshpatilDH
     * @description : generates the random string of defined length
     * @param {*} lengthofRandomNumberString 
     */
    async generateRandomString(lengthofRandomNumberString) {
        return Math.random().toString(36).substr(2, lengthofRandomNumberString)
    }

    /**
     * @azman4
     * Scrolls to the top of the Page
     */

    async scrollToTopOfPage() {
        await browser.execute('window.scrollTo(0,0)')
    }

    /**
     * @malateshpatilDH
     * @description :  Scrolls to the middle of the page
     */


    async scrollToMiddleOfThePage() {
        await browser.execute('window.scrollBy(0, window.innerHeight)')
    }
    async scrollToEndOfThePage() {

        await browser.execute('window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)')
    }

    /**
     * @azman4
     * @description : Scroll by lines bottom x and y coordinates
     */
    async scrollByLines(){
        await browser.execute('window.scrollTo(1000,1000)')
    }

    /**
     * @azman4
     * @description :  Scrolls to the end of the page
     */
    async scrolltoEndOfThePage() {
        await browser.execute('window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)')
    }

    async scrollAndFill(element){
        await browser.execute('window.scrollBy(0, window.innerHeight)')
        browser.pause(3000)
        await this.scrollIntoView(element)
    }

    /**
    * @malateshpatilDH
    * @param {*} label 
    * @param {*} elementToClick 
    * @param {*} actualSFValues 
    * @param {*} expectedValues 
    * @param {*} needToSelect  : is optional parameter, pass the element if you want to select any dropdown value.
    */

    async verifyCompareAndSelectValue(label, elementToClick, actualSFValues, expectedValues, needToSelect) {

        await this.waitForElement(label)
        await this.toclick_JSExecutor(elementToClick)
        await Utilities.compareTwoList(actualSFValues, expectedValues.split(','))

        if (needToSelect != null) {
            await this.dropDownScrollToElementAndClick(needToSelect)
        }
    }

    /**
    * @azman4
    * @param {*} actualSFValues 
    * @param {*} expectedValues 
    * @param {*} needToSelect  : is optional parameter, pass the element if you want to select any dropdown value.
    */

    async verifyCompareAndSelectValueDropdown(actualSFValues, expectedValues, needToSelect) {

        await Utilities.compareTwoList1(actualSFValues, expectedValues.split(','))

        if (needToSelect != null) {
            await this.dropDownScrollToElementAndClick(needToSelect)
        }
    }

    /**
     * @malateshpatilDH
     * @description switches to the parent frame
     */
    async switchToDefaultFrame() {
        await browser.switchToParentFrame()
    }

    /**
     * @azman4 
     * @description : Method to fetch the URL
     */

    async getBrowserURL() {
        var url = await browser.getUrl();
        return url

    }

    /**
     * @malateshpatilDH
     * @param {*} label 
     * @param {*} element 
     * @param {*} text 
     */
    async selectByVisibleText(label, element, text) {
        //this.waitForElement(label) --replaced by ish: since Exists wait is faster and efficient
        await this.waitUntilElementExists(label)
        await element.selectByVisibleText(text)
    }


    /**
  * @azman4
  * @param {*} element 
  * @param {*} text 
  */
    async select_ByVisibleText(element, text) {
        await element.selectByVisibleText(text)
    }

    /**
     * @malateshpatilDH
     * @param {*} label - of the the dropdown 
     * @param {*} element - dropdown element
     * @param {*} index - dropdownvalue to select
     */
    async selectByIndex(label, element, index) {
        await this.waitForElement(label)
        await element.selectByIndex(index)
    }

    //done
    /**
     * @malateshpatilDH
     * Generates the single digit random number between specified range
     * @param {} min 
     * @param {*} max 
     */
    async generateRandomNumber(min, max) {
        //return await RandomDataGenerator.generateRandomNumber(min, max);
        return await Math.floor(Math.random() * (max - min)) + min;
    }
    
    //done
    /**
     * @azman4
     * Generates fixed digit random number
     * @param {} length 
     */

    async generateRandomFixedNumber(length) {
        //return await RandomDataGenerator.generateRandomFixedNumber(length);
        return await Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }

    //done
    /**
     * @azman4
     * Generates fixed digit random number
     * @param {} length 
     */
     async generateBigRandomFixedNumber(length) {
        return await RandomDataGenerator.generateRandomFixedNumberString(length);
     }

    //done
    /**
     * @azman4
     * @param {*} domain 
     */
    async generateRandomEmail(domain) {
        return await RandomDataGenerator.generateRandomEmail(domain + ".com");

    }

    /**
     * @azman4
     * @description - To generate random coordinates latitude or longitude
     * @param {*} from eg: -180
     * @param {*} to eg: 180
     * @param {*} fixed - Number of decimals, eg: 3
     * @returns 
     */
    async generateRandomCoordinates(from, to, fixed) {
        return await RandomDataGenerator.generateRandomCoordinates(from, to, fixed);
    }

    /**
    * @azman4DH
    * @param {*} filePath : complete file path 
    * convert CSV file to JSon Array
    */

    async convertCsvToJSonArray(filePath) {
        if (filePath != null) {
            try {
                const json = await csvToJson.getJsonFromCsv(filePath);
                return json
            }
            catch (err) {
                console.error('**********' + err.message + '****************')
            }

        }
    }

    async getAttributeValue(element, attribute) {
        await this.waitForElement(element)
        console.log(await element.getAttribute(attribute))
        await allureReporter.addStep('Attribute Value is ' + (await element.getAttribute(attribute)))

    }

    async getAttribute(element, attribute) {
        await this.waitForElement(element)
        //this.waitUntilElementExists(element)
        return element.getAttribute(attribute)
    }


    /**
     * @azman4
     * @param {*} elements 
     * @param {*} attribute 
     */
    async getAttributeListAtXpath(elements, attribute) {
        let elementList = [];
        for (let i = 0; i < elements.length; i++) {
            elementList.push(await elements[i].getAttribute(attribute));
        }
        return elementList
    }

    /**
     * @azman4
     * @description :  Scrolls slowly to the end of the page
     */


    async scrollToText(element) {
        try {
            for (let i = 0; i <= 5; i++) {

                if (await $(element).isDisplayedInViewport()) {
                    await $(element).scrollIntoView();
                    return true;
                }
                else {
                    await this.scrollToMiddleOfThePage()
                }
            }
        }
        catch (err) {
            console.error('Unable to perform scroll to the text' + err.message)
        }
        return false;
    }

    /**
    * @malateshpatilDH
    * @param {*} GID Global Country Entity ID
    * @param {*} Property Required Property for the Country Entity
    */

    async GetMappingSheetProperty(GID, Property) {
        for (let id in GlobalCountryEntityMapping) {
            if (GID === id) {
                await allureReporter.addStep('For the GID ' + GID + ' the value is ' + GlobalCountryEntityMapping[id][Property])
                console.log('For the GID ' + GID + ' the value is ' + GlobalCountryEntityMapping[id][Property])
            }
        }
    }

    /**
    * @azman4s
    * @description : Click on a dropdown_selectTomove and select random value
    */
    async dropDownSelectElementToMove_random(dropDownListXpath, moveIcon) {
        await this.toClick((await $$(dropDownListXpath))[await this.generateRandomNumber(1, (await $$(dropDownListXpath)).length - 1)])
        await browser.pause(3000)
        await this.toClick(moveIcon)
    }
    /**
     * @azman4
     * @param {*} dropDownListXpath - Items in the list
     * @param {*} moveIcon - Button used to move the item in the list
     */
    async dropDownSelectElementToMove_random1(dropDownListXpath, moveIcon) {
        await this.toClick((await $$(dropDownListXpath))[await this.generateRandomNumber(1, (await $$(dropDownListXpath)).length - 1)])
        await browser.pause(3000)
        await this.toclick_JSExecutor(moveIcon)
    }

    /**
     * @azman4
     * @param {*} dropDownListXpath - List of items on the From list
     * @param {*} moveIcon - Move To button
     */ 
    async dropDownSelectElementToMove_random2(dropDownListXpath, moveIcon) {
        let itemIndex = await this.generateRandomNumber(1, (await $$(dropDownListXpath)).length - 1)
        let element = (await $$(dropDownListXpath))[itemIndex]
        await browser.pause(4000);
        await element.scrollIntoView();
        console.log("*** Is clickable:- "+(await element.isClickable()))
        await this.toclick_JSExecutor(element);
        await browser.pause(5000);
        await this.toclick_JSExecutor(moveIcon);
    }
    /**
     * @azman4
     * @param {*} dropDownListXpath - List of items on the From list
     * @param {*} moveIcon - Move To button
     */ 
     async dropDownSelectElementToMove_random3(dropDownListXpath, moveIcon) {
        let itemIndex = await this.generateRandomNumber(1, (await $$(dropDownListXpath)).length - 1)
        let element = (await $$(dropDownListXpath))[itemIndex]
        await element.scrollIntoView();
        await this.toClick(element);
        //await browser.pause(3000);
        await this.toclick_JSExecutor(moveIcon);
    }
    /**
     * @azman4
     * @param {*} dropDownListXpath 
     * @returns - value from the drop down options
     */
    async getRandomOptionText(dropDownListXpath) {
        //let itemIndex = 5;
        let itemIndex = await this.generateRandomNumber(1, (await $$(dropDownListXpath)).length - 1);
        console.log("**itemIndex: "+itemIndex);
        let element = (await $$(dropDownListXpath))[itemIndex];
        let option = await this.toGetText(element);
        return option;
    }

    /**
     * @azman4DH
     * @description : Click on a dropdown and select random value
     */

    async dropDownClickAndSelectRandomValue(dropDownFieldXpath, dropDownlistXpath) {
        await this.toClick(dropDownFieldXpath);
        //await browser.pause(3000)
        await this.toClick((await $$(dropDownlistXpath))[await this.generateRandomNumber(1, (await $$(dropDownlistXpath)).length - 1)])
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select random value by index
     */

    async dropDownClickAndSelectRandomValueByIndex(dropDownFieldXpath, dropDownlistXpath, start, end) {
        await this.toClick(dropDownFieldXpath);
        //await browser.pause(3000)
        if (end == null || end == undefined) {
            end = (await $$(dropDownlistXpath)).length - 1;
        }
        await this.toClick((await $$(dropDownlistXpath))[await this.generateRandomNumber(start, end)])
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select random value by index
     */

     async dropDownClickAndSelectRandomValueByIndex1(dropDownFieldXpath, dropDownlistXpath, start, end) {
        await this.waitForElementDisplayed(dropDownFieldXpath, 30000);
        await this.toclick_JSExecutor(dropDownFieldXpath);
        //await browser.pause(3000)
        if (end == null || end == undefined) {
            end = (await $$(dropDownlistXpath)).length - 1;
        }
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[await this.generateRandomNumber(start, end)])
    }

    /**
     * @azman4
     * @description : Check for Account status
     */
    async checkElementStatus(element, expectedValue) {
        
        // 5 minutes from now
        let endTime = Date.now() + 300000; 
        let currentValue = '';
        
        while (Date.now() < endTime) {
          currentValue = await element.getText();
          
          if (currentValue === expectedValue) {
                return true;
          } else {
                browser.refresh();
                // wait 10 seconds before checking again
                browser.pause(5000); 
          }
        }
        
        //Fail the test if we get here
        assert.fail(`Element value did not match expected value after 5 minutes. Expected: ${expectedValue}, Actual: ${currentValue}`);
      }

    /**
     * @azman4
     * @description : Draw signature inside canvas element
     */
      async  drawRandomSignature(canvasElement) {
      
        try {
          const canvasLocation = await canvasElement.getLocation();
          const canvasWidth = await canvasElement.getSize('width');
          const canvasHeight = await canvasElement.getSize('height');
      
          // Calculate the center position of the canvas
          const canvasCenterX = canvasLocation.x + canvasWidth / 2;
          const canvasCenterY = canvasLocation.y + canvasHeight / 2;
      
          // Simulate mouse actions to draw a random signature
          await browser.performActions([
            {
              type: 'pointer',
              id: 'finger1',
              parameters: { pointerType: 'mouse' },
              actions: [
                { type: 'pointerMove', duration: 0, x: canvasCenterX, y: canvasCenterY },
                { type: 'pointerDown', button: 0 },
                // Add more pointerMove actions with random coordinates to draw the signature
                { type: 'pointerMove', duration: 100, x: canvasCenterX + 10, y: canvasCenterY + 10 },
                { type: 'pointerMove', duration: 100, x: canvasCenterX + 20, y: canvasCenterY + 20 },
                // Add more pointerMove actions as needed to create a random signature
                { type: 'pointerUp', button: 0 },
              ],
            },
          ]);
      
          allureReporter.addStep('Random signature drawn inside the canvas element!');
        } catch (error) {
          console.error('Error occurred while drawing the signature:', error);
        }
      }    
    
    /**
     * @azman4
     * @description : Click on a dropdown and select  by index
     */
    async dropDownClickAndSelectValueByIndex(dropDownFieldXpath, dropDownlistXpath, index) {
        await this.toClick(dropDownFieldXpath);
        //await browser.pause(3000);
        await this.toClick((await $$(dropDownlistXpath))[index]);
    }
    /**
     * @azman4
     * @param {*} dropDownFieldXpath 
     * @param {*} dropDownlistXpath 
     * @param {*} index 
     */
    async dropDownClickAndSelectValueByIndex1(dropDownFieldXpath, dropDownlistXpath, index) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        //await browser.pause(3000);
        await this.toClick((await $$(dropDownlistXpath))[index]);
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select  by index
     */
     async dropDownClickAndSelectValueByIndex2(dropDownFieldXpath, dropDownlistXpath, index) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[index]);
    }

    /**
     * @azman4DH
     * @description : Click on a dropdown and select random value
     */

    async dropDownClickAndSelectRandomValue1(dropDownFieldXpath, dropDownlistXpath) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await browser.pause(3000);
        const number = await this.generateRandomNumber(1, (await $$(dropDownlistXpath)).length - 1)
        const optionValue = this.toGetText((await $$(dropDownlistXpath))[number])
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[number]);
        await browser.pause(5000);
        return optionValue
    }

    /**
     * @azman4
     * @description - To skip the first element on index 0 as it is mostly "None"
     * @param {*} dropDownFieldXpath 
     * @param {*} dropDownlistXpath 
     * @returns 
     */
    async dropDownClickAndSelectRandomValue4(dropDownFieldXpath, dropDownlistXpath) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await browser.pause(3000);
        const number = await this.generateRandomNumber(1, (await $$(dropDownlistXpath)).length - 1)
        const optionValue = this.toGetText((await $$(dropDownlistXpath))[number])
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[number]);
        await browser.pause(5000);
        return optionValue
    }

    /**
     * @azman4
     * @param {*} dropDownFieldXpath 
     * @param {*} dropDownlistXpath 
     * @param {*} value - nth element
     */
    async dropDownClickAndSelectSpecificValue1(dropDownFieldXpath, dropDownlistXpath, value) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await browser.pause(3000);
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[value]);
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select random value except first value
     */
     async dropDownClickAndSelectRandomValue2(dropDownFieldXpath, dropDownlistXpath) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await browser.pause(3000)
        await this.toClick((await $$(dropDownlistXpath))[await this.generateRandomNumber(2, (await $$(dropDownlistXpath)).length - 1)])
    }

    /**
     * @azman4
     * @description : Click on a dropdown and select random value
     */

     async dropDownClickAndSelectRandomValue3(dropDownFieldXpath, dropDownlistXpath) {
        await this.toclick_JSExecutor(dropDownFieldXpath);
        //await browser.pause(3000)
        await this.toclick_JSExecutor((await $$(dropDownlistXpath))[await this.generateRandomNumber(1, (await $$(dropDownlistXpath)).length - 1)])
    }

    /**@azman4
     * @param {*} dropDownFieldXpath 
     * @param {*} dropDownListXpath 
     */
    async dropDownClickWithXpath(dropDownFieldXpath, dropDownListXpath) {
        await this.toscroll_JSExecutor(dropDownFieldXpath);
        await this.toclick_JSExecutor(dropDownFieldXpath);
        await browser.pause(3000)
        await this.toClick(dropDownListXpath);
    }

    //remove
    /**
     * @azman4DH
     * @param {*} fileLocation - location of test data file
     * @param {*} testScriptName - Test Script Name for which the data is required
     * @returns JSON array of objects
     * @TestDataFormatinCSVfile - TestScriptName,DataKey:DataValue,DataKey:DataValue,DataKey:DataValue,DataKey:DataValue..
     */
    async getTest_rowData_fromCSVFile_and_convertToJSON(fileLocation, testScriptName) {

        return await Utilities.getTest_rowData_fromCSVFile_and_convertToJSON(fileLocation, testScriptName);

    }

    /**
     * @malateshpatilDH
     * @param {*} Element to be passed that needs to be waited for
     */
    async waitForNotVisible(element) {
        await browser.waitUntil(async () => {
            try {
                return !(await element.isVisible());
            } catch (error) {
                return true
            }
        })
    }
    async waitAndClickChatButton(element) {
        while (!(await element.isDisplayed())) {
            await browser.refresh()
            await this.toClick(element)
        }
    }

    /**
    * @azman4
    * @param {*} element field element
    * @param {*} property Required CSS Property of the element
    */
    async getCSSValue(element, property) {
        await this.waitForElement(element);
        return element.getCSSProperty(property);
    }


    //done
    /**
    * @azman4
    * @param {*} string_length length of the string
    */
    async generateRandomCharactersString(string_length) {
       
        return await RandomDataGenerator.generateRandomCharactersString(string_length);
    }


    //remove
    /**
    * @azman4
    * @description : Add hypen between digits
    * @param {*} number number
    * @param {*} positions An array which cointains the positions
    */
    async addHyphensAtPositions(number, positions) {
        return await Utilities.addHyphensAtPositions(number, positions);
    }

    /**
    * @azman4
    * @param {*} element field element
    */
    async clear(element) {
        await this.waitForElement(element);
        await element.clearValue();
    }

    /**
    * @azman4
    * @param {*} element field element
    */
    async getTextBoxValue(element) {
        await this.waitForElement(element);
        //this.waitUntilElementExists(element)
        return element.getValue();
    }

    /**
    * @azman4
    * @param {*} Language Global Country Entity ID
    * @param {*} Property Required Property for the Country Entity
    */
    async GetSSUJsonValues(Language, Property) {
        for (let id in SSUMapping) {
            if (Language == id) {
                return SSUMapping[id][Property];
            }
        }
    }

    /**
    * @azman4
    * @description : Waits untill the entire web page loads
    */
    async waitForPageLoad() {
        await browser.waitUntil(async function() {
            const state = await browser.execute(function () {
                return document.readyState;
            });
            console.log("state:" + state)
            return state === 'complete';
        },
            {
                timeout: 60000, //60secs
                timeoutMsg: 'Oops! Check your internet connection'
            });
    }

    /**
    * @azman4
    * @description : Uploads file to browser
    * @param {*} element field element
    * @param {*} path path the file to be uploaded
    */
    async fileUpload(element, filePath) {
        await this.waitForElement(element);

        const remoteFilePath = await browser.uploadFile(filePath);
        await element.setValue(remoteFilePath);
    }

    /**
    * @azman4
    * @description : Read the SSU Dropdown Options 
    * @param {*} entity field element
    * @param {*} country Country Code
    * @param {*} language language 
    * @param {*} vertical Business Type
    * @param {*} verticalSegment Category
    */
    async GetDropdownProperty(entity, country, language, vertical, verticalSegment) {
        let array = [];
        if (entity == "talabat" || entity == "foodpanda") {
            if (vertical == "Restaurant") {
                for (let id in SSUDropdown[entity][country][language][vertical][verticalSegment]) {
                    array.push(SSUDropdown[entity][country][language][vertical][verticalSegment][id]);
                }
            } else if (vertical == "Shop") {
                for (let id in SSUDropdown[entity][country][language][vertical]) {
                    array.push(SSUDropdown[entity][country][language][vertical][id]);
                }
            } else if (vertical == "Vertical" || vertical == "VerticalSegment") {
                for (let id in SSUDropdown[entity][country][language][vertical]) {
                    array.push(SSUDropdown[entity][country][language][vertical][id]);
                }
            }
        } else if (entity == "pedidosya") {
            for (let id in SSUDropdown[entity][country][vertical]) {
                array.push(SSUDropdown[entity][country][vertical][id]);
            }
        } else if (entity == "yemeksepeti") {
            for (let id in SSUDropdown[entity][language][vertical]) {
                array.push(SSUDropdown[entity][language][vertical][id]);
            }
        } else if (entity == "foodora") {
            for (let id in SSUDropdown[entity][country][language][vertical]) {
                array.push(SSUDropdown[entity][country][language][vertical][id]);
            }
        } else if (entity == "hungerstation") {
            if (vertical == "Vertical" || vertical == "Shop") {
                for (let id in SSUDropdown[entity][country][language][vertical]) {
                    array.push(SSUDropdown[entity][country][language][vertical][id]);
                }
            }
        }

        return array;
    }


    async waitUntil_elementIsDisplayed(element, displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.isDisplayed()) === true,
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )
    }

    /**
     * @azman4
     * @param {*} element 
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntilElementIsNotDisplayed(element, displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.isDisplayed()) === false,
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )
    }

    /**
     * @azman4
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
     async waitUntilPageIsLoaded(displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )
    }

    /**
     * @azman4
     * @param {*} element 
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
     async waitUntilElementIsNotClickable(element, displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.isClickable()) === false,
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )
    }

    async waitUntilElementIsClickableWithTimeout(element, displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.isClickable()) === true,
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )
    }
    /**
     * @azman4
     * @param {*} text 
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntilURLContainsText(text, displaymsg, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(text),
            {
                timeout: time,
                timeoutMsg: displaymsg,
                interval: timeoutinterval
            }
        )

    }
    /**
     * @azman4
     * @param {*} element 
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntilElementIsClickable(element, displaymsg, time, timeoutinterval) {
        await element.waitForClickable({ timeout: time, timeoutMsg: displaymsg, interval: timeoutinterval })
    }


    /**
     * @azman4
     * @param {*} element 
     * @param {*} displaymsg 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
     async waitForExist(element, displaymsg, time, timeoutinterval) {

        await element.waitForExist({
            timeout: time,
            timeoutMsg: displaymsg,
            interval: timeoutinterval

        })
    }



    /**
     * @azman4
     * @param {*} element 
     * @param {*} attribute 
     * @param {*} attributevalue 
     * @param {*} timeoutmessage 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntil_elementAttribute_equal_toValue(element, attribute, attributevalue, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.getAttribute(attribute)) == attributevalue,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }
   
    /**
     * @azman4
     * @description -  To wait until the text value of an element is loaded
     * @param {*} element 
     * @param {*} timeoutmessage 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntil_element_has_notNull_textValue(element, fieldValue, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.getText()) === fieldValue,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }

    /**
     * @azman4
     * @description - To wait until the text value of an element changes to a different value
     * @param {*} element 
     * @param {*} fieldValue 
     * @param {*} timeoutmessage 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntil_element_has_notEqual_textValue(element, fieldValue, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.getText()) != fieldValue,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }



    async waitUntil_elementAttribute_notNull(element, attribute, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.getAttribute(attribute)) != null,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }

    /**
     * @azman4
     * @param {*} element 
     * @param {*} attribute 
     * @param {*} attributevalue 
     * @param {*} timeoutmessage 
     * @param {*} time 
     * @param {*} timeoutinterval 
     */
    async waitUntil_elementAttribute_Notequal_toValue(element, attribute, attributevalue, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.getAttribute(attribute)) != attributevalue,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }

    async waitUntil_element_isEnabled(element, timeoutmessage, time, timeoutinterval) {
        await browser.waitUntil(
            async () => (await element.isEnabled()) == true,
            {
                timeout: time,
                timeoutMsg: timeoutmessage,
                interval: timeoutinterval
            }
        );
    }


    async waitUntil_FrameExisiting(frameXpath) {


        await browser.waitUntil(
            async () => (await frameXpath.isExisting()) === true,
            {
                timeout: 30000,
                timeoutMsg: 'Frame not loaded',
                interval: 20000
            }
        );
    }

    async scrollToText1(element) {
        try {
            for (let i = 0; i <= 5; i++) {

                if (await (await $(element)).isDisplayed()) {
                    return true;
                }
                else {
                    await this.scrollToMiddleOfThePage()
                }
            }
        }
        catch (err) {
            console.error('Unable to perform scroll to the text' + err.message)
        }
        return false;
    }

    /**
     * @azman4
     * wait until center spinning wheel is invisible
     */
    async waitUntilCenterSpinningWheelInvisible() {
        await browser.waitUntil(
            async () => ((await ((await commonPage.get_loadingSpinner()).getAttribute('aria-hidden')))) === 'true',

            {
                timeout: 35000,
                timeoutMsg: 'Spinning wheel is still running',
                interval: 3000
            }
        );
    }
    /**
     * @azman4
     * wait until center small spinning wheel is invisible
     */
     async waitUntilCenterSmallSpinningWheelInvisible() {
        await browser.waitUntil(
            async () => ((await ((await commonPage.getSmallLoadingSpinner()).getAttribute('aria-hidden')))) === 'true',

            {
                timeout: 25000,
                timeoutMsg: 'Spinning wheel is still running',
                interval: 3000
            }
        );
    }
    /**
     * @azman4
     * wait until center spinning wheel element vanishes from DOM
     */
    async waitUntilCenterSpinningWheelVanishes() {
        await browser.waitUntil(
            async () => (await (await commonPage.get_loadingSpinner()).isDisplayed()) == false,

            {
                timeout: 50000,
                timeoutMsg: 'Spinning wheel still exists in the DOM',
                interval: 3000
            }
        );
    }

    /**
     * @azman4
     * wait until center spinning wheel element vanishes from DOM
     */
    async waitUntilSpinningWheelVanishes(element) {
        await browser.waitUntil(
            async () => (await element.isDisplayed()) == false,
            {
                timeout: 60000,
                timeoutMsg: 'Spinning wheel still exists in the DOM',
                interval: 1000
            }
        );
    }

    /**
     * @azman4
     * wait until pop up dialogbox is visible
     */
    async waitUntilPopUpDialogBoxVisible() {
        await browser.waitUntil(
            async () => await (await commonPage.get_error_popUp_message()).isDisplayed(),
            {
                timeout: 50000,
                timeoutMsg: 'Pop up dialog not displayed',
                interval: 3000
            }
        );
    }
    /**
     * @azman4
     * @param {*} errType 
     */
    async waitUntilPopUpDialogBoxVisibleByErrType(errType, timeOut, timeOutInterval) {
        await browser.waitUntil(
            async () => await (await commonPage.getPopUpDialogBoxByErrType(errType)).isDisplayed(),
            {
                timeout: timeOut,
                timeoutMsg: 'Pop up dialog not displayed for Error Type: '+errType,
                interval: timeOutInterval
            }
        );
    }

    /**
     * @azman4
     * @param {*} element - 
     * @param {*} value - "Open"
     * @param {*} timeOut - 50000
     * @param {*} timeOutInterval - 3000
     * @param {*} ErrMsg - "Value of Contact is not updated"
     */
    async waitUntilFieldvalueChanges(element, value, timeOut, timeOutInterval, ErrMsg) {
        await browser.waitUntil(
            async () => ((await (element.getText()))) === value,
            {
                timeout: timeOut,
                timeoutMsg: ErrMsg,
                interval: timeOutInterval
            }
        );
    }


    /**
     * @azman4
     * @description - wait until the browser url changes to the given url
     * @param {*} url - complete or partial url to be loaded
     * @param {*} timeOut - 60000
     */
    async waitUntilBrowserUrlIsChangedTo(url, timeOut=60000, pollingInterval = 1000) {
        await browser.waitUntil(
            async () => ((await (browser.getUrl()))).includes(url) ,
            {
                timeout: timeOut,
                interval: pollingInterval
            }
        );
    }

    /**
     * @azman4
     * @param {*} fieldName 
     * @param {*} valueName 
     * @returns boolean:true if the value exists
     *          boolean:false if the value does not exists
     */
    async verifyValuePresentInDropDownField(fieldName, valueName) {
        let fieldElement = await commonPage.get_dropDown_field(fieldName)
        await this.toclick_JSExecutor(fieldElement);
        let valueElement = await commonPage.get_dropDownList_byValue(fieldName, valueName)
        await valueElement.scrollIntoView();
        if ((await fieldElement.isExisting()) && (await valueElement.isExisting())) {
            return true
        }
        else {
            return false
        }
    }

    //remove
    /**
    * @azman4
    * @description : Generate random expression
    * @param {*} exp Expression pattern
    */
     async randomExpression(exp) {
        return await Utilities.randomExpression(exp);
    }

    //done
    //replace with the generateRandomFixedNumber
    /**
     * @azman4
     * @param {*} digit E.g - 6 or 15 or 25
     * @returns generated random number of any digit 
     */ 
    async generate_RandomNumber(digit) {
        return await RandomDataGenerator.generateRandomFixedNumberString(digit);
    }

    //remove
    /**
     * This will modify the regex if you are passing using csv if includes commas in it.
     * Here we are modifying regex for making it readable on csv file test data.
     * @azman4
     * @param {*} regex 
     * @returns 
     */
    async modifyRegExWithCommas(regex) {
        return await Utilities.modifyRegExWithCommas(regex);
    }
    /**
     * @azman4
     * @returns generated random date in past within 50 years from todays date 
     */ 
    async generate_RandomDate(years=50, dateFormat='dd/MM/yyyy') {
        return await RandomDataGenerator.generateRandomPastDate(years, dateFormat);
    }

    /**
     * @azman4
     * @returns generated random date in future 50 years from todays date 
     */ 
     async generate_RandomDateFuture(years=50, dateFormat='dd/MM/yyyy') {
        return await RandomDataGenerator.generateRandomDateFuture(years, dateFormat);
    }

    /**
     * @azman4
     * @returns generated random date in future 50 years from todays date 
     */ 
     async generate_RandomDateFutureUS(years=25, dateFormat='MM/dd/yyyy') {
        return await RandomDataGenerator.generateRandomDateFuture(years, dateFormat);
    }
    //remove
    /**
     * @azman4
     * @returns generated random date in future in DD-MMM-YYYY format
     */ 
    async generateRandomFutureDate() {
        // Create a new date object for today
        let currentDate = new Date();
      
        // Get a random number of days to add (between 1 and 365 days)
        let randomDays = Math.floor(Math.random() * 365) + 1;
      
        // Add the random number of days to the current date
        currentDate.setDate(currentDate.getDate() + randomDays);
      
        // Get day, month, and year from the date object
        let day = currentDate.getDate();
        let month = currentDate.toLocaleString('default', { month: 'short' }); // Short month name (e.g., "Dec")
        let year = currentDate.getFullYear();
      
        // Format the date in "dd-MMM-yyyy" format
        let formattedDate = `${day}-${month}-${year}`;
      
        return formattedDate;
    }

    /**
     * @azman4
     * @returns generated random date in future in MMM DD, YYYY format
     */ 
    async generateRandomFutureDateMDY() {
        // Get current date
        let currentDate = new Date();
      
        // Set maximum range for future date (365 days from today)
        let maxRange = 365;
        
        // Generate a random number of days (between 1 and maxRange)
        let randomDays = Math.floor(Math.random() * maxRange) + 1;
      
        // Add random number of days to the current date
        currentDate.setDate(currentDate.getDate() + randomDays);
      
        // Extract month, day, and year from the date object
        let month = currentDate.toLocaleString('default', { month: 'short' });
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
      
        // Format the date in "Month Day, Year" format (e.g., "Dec 14, 2023")
        let formattedDate = `${month} ${day}, ${year}`;
      
        return formattedDate;
    }

     /**
     * @azman4
     * @returns Convert Date format from MM/DD/YYYY to YYYY-MM-DD 
     */ 
      async convertDateFormat1(dateString, dateFormat = 'yyyy-mm-dd') {
        return await Utilities.convertDateFormat1(dateString, dateFormat);
      }

      //remove
      /**
     * @azman4
     * @returns Convert Date format from DD/MM/YYYY to YYYY-MM-DD 
     */ 
      async convertDateFormat2(dateString, dateFormat = 'dd-MM-YYYY') {
        return await Utilities.convertDateFormat2(dateString, dateFormat);
      }

    /**
    * @azman4
    * @returns Generate random E-mail for SSU
    * @param {*} email
    * @param {*} regex 
    */ 
    async addRandomSubaddressToEmail(email, regex=/^\+[a-z0-9]{5}$/) {
      
        return await RandomDataGenerator.addRandomSubaddressToEmail(email, regex);
    }

    //remove
    /**
    * @azman4
    * @returns Removes all the special characters from the string
    * @param {*} inputString
    */ 
    async removeSpecialCharacters(inputString) {
        return await Utilities.removeSpecialCharacters(inputString);
    }

    /**
     * @azman4
     * @param {*} element - element to click on 
     * @param {*} index - nth element to be accessed
     */
    async toSelectNthElement(element, index) {
        await this.toClick(element)
        for(let i=0; i<index;i++){
            await browser.keys("\uE015")
        }
        await browser.keys("\uE007")
        //await browser.pause(2000)
    }

    // Generate Future date with format -> 01/12/2000
    async generateFutureDate(days=1, dateFormat='d/M/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat);
    }

    // Generate Future date with format -> 01/12/2000
    async generateFutureDate1(days=15, dateFormat='dd-MMM-yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat);
    }

    // Generate Future date with format -> 1.12.2000
    async generateFutureDateAltFormat(days=1, dateFormat='d.M.yyyy') {
       
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat );
    }

    // Generate Future date with format -> 12/01/2000
    async generateFutureDateAltFormat2(days=1, dateFormat='d.M.yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Future date with format -> 2000/12/01
    async generateFutureDateAltFormat3(days=1, dateFormat='yyyy/M/d') {
        await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Future date with format -> 01/20/2000
    async generateFutureDateAltFormat4(days=2, dateFormat='M/d/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Past date with format -> 01/12/2000
    async generatePastDate(days=-1, dateFormat='d/M/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Past date with format -> 12/01/2000
    async generatePastDateAltFormat(days=-1, dateFormat='M/d/yyyy') {
       return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Past date with format -> 2000/12/01
    async generatePastDateAltFormat2(days=-1, dateFormat='d/M/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat)
    }

    // Generate Today's date with format -> 01/12/2000
    async generateTodaysDate(addDaysToCurrentDate = 0, dateFormat='dd/MM/yyyy') {
        return await RandomDataGenerator.generateTodaysDate(addDaysToCurrentDate, dateFormat);
    }

    // Generate Today's date with format -> 01/12/2000
    async generateTodaysDateAltFormat4(addDaysToCurrentDate = 0, dateFormat='d/M/yyyy') {

        return await RandomDataGenerator.addDaysToTodaysDate(addDaysToCurrentDate, dateFormat);
    }

    // Generate Yesterday's date with format -> 01/12/2000
    async generateYesterdaysDate(days=-1, dateFormat='dd/MM/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat);
    }

     // Generate Yesterday's date with format -> 01/12/2000
     async generateYesterdaysDatAltFormat(days=-1, dateFormat='M/d/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat);
    }

     // Generate Yesterday's date with format -> 01/12/2000
     async generateYesterdaysDatAltFormat2(days=-1, dateFormat='d/M/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(days, dateFormat);
    }

    // Generate Today's date with format -> 12/01/2000
    async generateTodaysDateAltFormat( dateFormat='M/d/yyyy') {
       return await RandomDataGenerator.generateTodaysDateAltFormat(dateFormat);
    }

    // Generate Today's date with format -> 2000/12/01
    async generateTodaysDateAltFormat2( dateFormat='yyyy/M/d') {
        return await RandomDataGenerator.generateTodaysDate(dateFormat);
    }

    // Generate Date with format -> 01/12/2000
    async generateDateAltFormat6(addDaysToCurrentDate = 0, dateFormat='dd/MM/yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(addDaysToCurrentDate,dateFormat);
    }

    // Generate Date with format -> 01-12-2000
    async generateDateAltFormat4(addDaysToCurrentDate = 0, dateFormat='dd-MM-yyyy') {
        return await RandomDataGenerator.addDaysToTodaysDate(addDaysToCurrentDate,'dd-MM-yyyy');
    }

    /**
     * @azman4
     * @description - async function to store array into csv file
     * @param {*} inputDataAsArray - Multidimentional array eg: [[grid=123,country="Uruguay"],[grid=234,country="Uruguay"]]
     * @param {*} fileName - String with the File Name
     */
    async putDataIntoCsv(inputDataAsArray, fileName) {
        let csvContent = "data:text/csv;charset=utf-8,";
        var row
        for (const rowArray of inputDataAsArray) {
            row = await Array.prototype.join.call(rowArray,",");
            csvContent += row + "\r\n";
        };
        
        var encodedUri = encodeURI(csvContent);
        await browser.execute("var link = document.createElement('a'); link.setAttribute('href', arguments[0]); link.setAttribute('download', arguments[1] +'.csv'); document.body.appendChild(link); link.click();",encodedUri,fileName) 
        
        //Wait until the file is downloaded. Cannout be handled explicitly
        await browser.pause(20000);  
    }

    /**
     * @azman4
     * @description - Sync function to store array data into csv file
     * @param {*} inputDataAsArray - Input data as multi dimentional array - eg: [[grid=123,country="Uruguay"],[grid=234,country="Uruguay"]]
     * @param {*} fileName - Name of the csv file
     */
    storeDataInCsvFile(inputDataAsArray, fileName) {
        let csvContent = "data:text/csv;charset=utf-8,";
        var row
        for (const rowArray of inputDataAsArray) {
            row = Array.prototype.join.call(rowArray,",");
            csvContent += row + "\r\n";
        };
        
        var encodedUri = encodeURI(csvContent);
        browser.execute("var link = document.createElement('a'); link.setAttribute('href', arguments[0]); link.setAttribute('download', arguments[1] +'.csv'); document.body.appendChild(link); link.click();",encodedUri,fileName) 
        
        //Wait until the file is downloaded. Cannout be handled explicitly
        browser.pause(20000);  
    }

    /**
     * @azman4
     * @description - Sync function to store array data into csv file
     * @param {*} inputDataAsArray - Input data as multi dimentional array - eg: [[grid=123,country="Uruguay"],[grid=234,country="Uruguay"]]
     * @param {*} fileName - Name of the csv file
     */
     async storeDataInCsvFileAsync(inputDataAsArray, fileName) {
        let csvContent = "data:text/csv;charset=utf-8,";
        var row
        for (const rowArray of inputDataAsArray) {
            row = Array.prototype.join.call(rowArray,",");
            csvContent += row + "\r\n";
        };
        
        var encodedUri = encodeURI(csvContent);
        //browser.execute("var link = document.createElement('a'); link.setAttribute('href', arguments[0]); link.setAttribute('download', arguments[1] +'.csv'); document.body.appendChild(link); link.click();",encodedUri,fileName) 
        const result = await browser.executeAsync(function(a,b,done) {
             setTimeout(() => {
                var link = document.createElement('a'); 
                link.setAttribute('href', a); 
                link.setAttribute('download', b +'.csv'); 
                document.body.appendChild(link); 
                link.click(); 
                done(a);   
            }, 3000);
        },encodedUri,fileName);

        //Wait until the file is downloaded. Cannout be handled explicitly
        await browser.pause(20000);  
    }

    /**
     * @azman4
     */
    async dispatchEventOnElement(element, event) {
        return browser.execute(`arguments[0].dispatchEvent(new Event('${event}'))`, element)
    }

    //remove
    /**
     * @azman4
     * @description - Synchronous function to read data from Csv File and Store it as JSON Object
     * @param {*} fileLocation - Absolute Path to the File
     * @param {*} testScriptName - Test Name
     * @returns 
     */
    getDataFromCsv(fileLocation, testScriptName) {
        return Utilities.getDataFromCsv(fileLocation, testScriptName);
    }

    //remove
    /**
     * @azman4
     * assert if the toTest json object's key has the same value as the main object's key
     * @param {object) main - json object
     * @param {object) toTest - json object 
    */
    
    async assertJSONObjectValues(main, toTest){
        await this.assertJSONObjectValues(main, toTest);
      }

    //remove    
    /**
     * @azman4
     * assert if the toTest json object's key has the same value as the main object's key
     * @param {object) main - json object
     * @param {object) toTest - json object 
    */
    
    assertJSONObjectValues(main, toTest){
        Utilities.assertJSONObjectValues(main, toTest);
      }

    getRandomCountry(countries, count) {
        if (count > countries.length) {
          console.error("Count cannot be greater than the array length");
          return [];
        }
        const shuffledArray = countries.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
      }

}


module.exports = new Operations()