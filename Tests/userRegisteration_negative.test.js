const { expect } = require('chai');
const axios = require('axios').default;
const Operations = require('../Utilities/Operations');
const parameters = require('../TestData/parameters').parameters;
const apiHelper = require('../Utilities/api');
const allureReporter = require("@wdio/allure-reporter").default;

var newToken, orderIdValue, id, customerNameValue = ""
var accessToken = {
    'Authorization': `Bearer ${newToken}`,
}
describe("User Registeration API - Negative scenarios", async () => {

    /**
     * @azman4
     * Verify the API responds with status code 400 when body of the request is incorrect
     * @param {string} clientName
     * @param {string} clientEmail
     * @returns {object} response of the post request 
     */
    it("Register as a client on the app with invalid body", async () => {
        
        const body = {
            'clientName': `${await Operations.generateRandomString(6)}`,
        }
        const res = await apiHelper.postRequest(`${parameters.url}${parameters.apiclients}`, body);
        expect(res.response.status).equals(400);
        allureReporter.addStep('Response status is as expected - ' + res.response.status)
        expect(JSON.stringify(res.response.data.error).replace(/"/g, '')).equals(parameters.invalidEmail_error);
        allureReporter.addStep('Response error message is as expected - ' + res.response.data.error)
    });


    /**
     * @azman4
     * Verify the API responds with status code 404 when url of the request is incorrect
     * @param {string} clientName
     * @returns {object} response of the post request 
     */
    it("Register as a client on the app with invalid endpoint URL", async () => {
        
        const body = {
            'clientName': `${await Operations.generateRandomString(6)}`,
        }
        const res = await apiHelper.postRequest(`${parameters.url}${parameters.invalidEmail_error}`, body);
        expect(res.response.status).equals(404);
        allureReporter.addStep('Response status is as expected - ' + res.response.status)
    });

    /**
     * @azman4
     * Verify if the API responds with status code 401 when the API call is made with invalid access token
     * @param {string} id
     * @param {string} customerNameValue
     * @param {string} accessToken
     * @returns {object} response of the post request 
     */    
     it("Create an order with invalid Session access token", async () => {
        customerNameValue = await Operations.generateRandomString(6)
        const body = {
            'bookId': 1,
            'customerName': customerNameValue
        }
        const res = await apiHelper.postRequest(`${parameters.url}${parameters.orders}`, body);
        expect(res.response.status).equals(401)
        allureReporter.addStep('Response status is as expected - ' + res.response.status)
        expect(JSON.stringify(res.response.data.error).replace(/"/g, '')).equals(parameters.invalidToken_error);
        allureReporter.addStep('Response error message is as expected - ' + res.response.data.error)
    });
})