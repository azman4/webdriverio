const { expect } = require('chai');
const Operations = require('../Utilities/Operations');
const parameters = require('../TestData/parameters').parameters;
const apiHelper = require('../Utilities/api');
const allureReporter = require("@wdio/allure-reporter").default;
var avgResponseTime = 1;
describe("Calculate performance of the User Registeration API", async () => {

    /**
     * @azman4
     * Verify the API response time for the POST API is less than a second
     * @param {string} clientName
     * @param {string} clientEmail
     * @returns {object} response of the post request 
     */
    it("Calculate and Verify the response of the POST API", async () => {
        var start, finish, time =[], res
        for (i=0; i<10; i++){
        const body = {
        'clientName': `${await Operations.generateRandomString(6)}`,
        'clientEmail': `${await Operations.generateRandomString(6)}${await Operations.generateRandomEmail('ab')}`
        }
        start = Date.now()
        res = await apiHelper.postRequest(`${parameters.url}${parameters.apiclients}`, body);
        finish = Date.now()
        time[i] = (finish - start) / 1000
        expect(res.status).equals(201);
        allureReporter.addStep('Response time for the API is - ' + time[i] +' second(s)')
        }
        const sum = time.reduce((a, b) => a + b, 0);
        let avg = (sum / time.length) || 0;
        avg = parseFloat(avg).toFixed(2)
        if (avg > avgResponseTime){
            allureReporter.addStep('The avegare Response time for the API for 10 requests concurrently is is more than - ' + avgResponseTime +' second(s)')
            expect.fail("The avegare Response time for the API for 10 requests concurrently is greater than 1 second - " + avg);
        }
        else{
            allureReporter.addStep('The avegare Response time for the API for 10 requests concurrently is - ' + avg +' second(s)')
        }
        
    });
})