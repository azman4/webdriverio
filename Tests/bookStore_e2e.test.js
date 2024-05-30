const { expect } = require('chai');
const axios = require('axios').default;
const Operations = require('../Utilities/Operations');
const parameters = require('../TestData/parameters').parameters;
const allureReporter = require("@wdio/allure-reporter").default;

var newToken, orderIdValue, id, customerNameValue = ""
var accessToken = {
    'Authorization': `Bearer ${newToken}`,
}
describe("Book Store - E2E flow", async () => {

    /**
     * @azman4
     * Verify if the API call gets the API status
     * @returns {object} response of the get request 
     */
    it("1. Get API Status", async () => {
        await axios.get(`${parameters.url}${parameters.status}`,).then((res) => {
            expect(res.status).equals(200)
            allureReporter.addStep('Response status is - ' + res.status)
        })
    });


    /**
     * @azman4
     * Verify if the API call gets the List of Non Fiction Books
     * @param {string} bookType_nonFiction
     * @param {string} book_toOrder
     * @returns {object} response of the get request 
     */
    it("2. Get List of Non Fiction Books", async () => {
        await axios.get(`${parameters.url}${parameters.books}`,{
            params: {
                type: parameters.bookType_nonFiction,
              }
        }).then((res) => {
            expect(res.status).equals(200)
            allureReporter.addStep('Response status is - ' + res.status)

            var noOfBooks = Object.keys(res.data).length;
            for ( var i = 0; i < noOfBooks; i++)
            {
                if (res.data[i].name == parameters.book_toOrder)
                    {
                        id = res.data[i].id
                        allureReporter.addStep(`Id for the book ${parameters.book_toOrder} is - ` + id)
                        break;
                    }
            }
        })
    });

    /**
     * @azman4
     * Verify if the API call Registers user as a client on the app
     * @param {string} clientName
     * @param {string} clientEmail
     * @returns {object} response of the post request 
     */
    it("3. Register as a client on the app", async () => {
        await axios.post(`${parameters.url}${parameters.apiclients}`,
        {
            'clientName': `${await Operations.generateRandomString(6)}`,
            'clientEmail': `${await Operations.generateRandomEmail('ab')}`
        }, {
        }).then((res) => {
                expect(res.status).equals(201);
                allureReporter.addStep('Response status is - ' + res.status)
                newToken = res.data.accessToken
                accessToken.Authorization = 'Bearer ' + res.data.accessToken
                allureReporter.addStep('Access Token for the user is - ' + newToken)
            })
    }).timeout(30000)

    /**
     * @azman4
     * Verify if the API call creates an order with the given book id for the customer
     * @param {string} id
     * @param {string} customerNameValue
     * @param {string} accessToken
     * @returns {object} response of the post request 
     */    
    it("4. Create an order of a book", async () => {
        customerNameValue = await Operations.generateRandomString(6)
        await axios.post(`${parameters.url}${parameters.orders}`,
            {
            'bookId': id,
            'customerName': customerNameValue
            }, {
            headers: accessToken
        }).then((res) => {
            expect(res.status).equals(201)
            allureReporter.addStep('Response status is - ' + res.status)
            orderIdValue = res.data.orderId
            allureReporter.addStep('Order Id for the order is - ' + orderIdValue)
        })
    });

    /**
     * @azman4
     * Verify if the API call gets Order details of the placed order
     * @param {string} orderIdValue
     * @param {string} accessToken
     * @returns {object} response of the get request 
     */
    it("5. Get the Order details of the placed order", async () => {
        await axios.get(`${parameters.url}${parameters.orders}`,{
            params: {
                orderId: orderIdValue,
            },
            headers: accessToken
        }).then((res) => {
            expect(res.status).equals(200)
            allureReporter.addStep('Response status is - ' + res.status)
            expect(res.data[0].id).equals(orderIdValue)
            allureReporter.addStep('Order Id for the order is as expected - ' + res.data[0].id)
            expect(res.data[0].bookId).equals(id)
            allureReporter.addStep('Book Id for the order is as expected - ' + res.data[0].bookId)
            expect(res.data[0].customerName).equals(customerNameValue)
            allureReporter.addStep('Customer Name for the order is as expected - ' + res.data[0].customerName)
            expect(res.data[0].quantity).equals(1)
            allureReporter.addStep('Quantity for the order is as expected - ' + res.data[0].quantity)
        })
    });

    /**
     * @azman4
     * Verify if the API call Updates the Custormer name of the placed order
     * @param {string} orderIdValue
     * @param {string} customerNameValue
     * @param {string} accessToken
     * @returns {object} response of the patch request 
     */
    it("6. Update the Custormer name of the placed order", async () => {
        customerNameValue = await Operations.generateRandomString(6)
        await axios.patch(`${parameters.url}${parameters.orders}${orderIdValue}`,
        {
            'customerName': customerNameValue
        },
        { 
            headers: accessToken,
        },
        ).then((res) => {
            expect(res.status).equals(204)
            allureReporter.addStep('Response status is - ' + res.status)
            allureReporter.addStep('The new Customer name is - ' + customerNameValue)
        })
    });

    /**
     * @azman4
     * Verify if the Customer name of the placed order is updated
     * @param {string} orderIdValue
     * @param {string} accessToken
     * @returns {object} response of the get request 
     */
    it("7. Get the Updated name of the placed order", async () => {
        await axios.get(`${parameters.url}${parameters.orders}`,{
            params: {
                orderId: orderIdValue,
            },
            headers: accessToken
        }).then((res) => {
            expect(res.status).equals(200)
            allureReporter.addStep('Response status is - ' + res.status)
            expect(res.data[0].customerName).equals(customerNameValue)
            allureReporter.addStep('New Customer Name for the order is as expected - ' + res.data[0].customerName)
        })
    });

    /**
     * @azman4
     * Verify if the user is able to Delete the order
     * @param {string} orderIdValue
     * @param {string} accessToken
     * @returns {object} response of the delete request 
     */
    it("8. Delete the placed order", async () => {
        await axios.delete(`${parameters.url}${parameters.orders}${orderIdValue}`,{
            headers: accessToken
        }).then((res) => {
            expect(res.status).equals(204)
            allureReporter.addStep('Response status is - ' + res.status)
        })
    });

    /**
     * @azman4
     * Verify if the Customer name of the placed order is updated
     * @param {string} orderIdValue
     * @param {string} accessToken
     * @returns {object} response of the get request 
     */
    it("9. Get the status of the deleted order", async () => {
        await axios.get(`${parameters.url}${parameters.orders}`,{
            params: {
                orderId: orderIdValue,
            },
            headers: accessToken
        }).then((res) => {
            expect(res.status).equals(200)
            allureReporter.addStep('Response status is - ' + res.status)
            expect(JSON.stringify(res.data)).equals('[]')
            allureReporter.addStep('Order for the customer deleted as expected')
        })
    });
})