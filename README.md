### Components of the Task

#### 1. API Design and Implementation

•⁠  As Discussed with Ahmad I have decided to use an Open API project developed and maintained by Postman themseleves
Post man collection here -> https://www.postman.com/science-geoscientist-92587966/workspace/test/collection/18419543-a1ab8d9e-9d94-4769-9979-1c5f5030decf
•⁠  ⁠Below are the endpoints that we will be interacting with:
a. GET API status
b. GET List of books
c. POST Register as a customer
d. POST Place an order for a book
e. GET Order details 
f. PATCH Customer name 
g. DELETE Order 

#### 2. API Automation Testing
*Programming Languages and Frameworks:*
I have used Webdriverio as the Automation tool along with Axios and designed test cases on Mocha.
What is WebdriverIO - WebdriverIO is an all in one framework for your web app development. It enables you to run small and lightweight component tests as well as running e2e test scenarios in the browser or on a mobile device. 

*Project Structure:*
```
/webdriverio
  /TestData
    /parameters (test data parameters for API requests and response verifications)
  /tests (Details enlisted below)
    /bookStore_e2e
    /calculateAPIResponseTime
    /userRegisteration_negative
  /Utilities
    /apiClient (functions designed for different API calls using the axios interfaces)
    /Operations (Some generic functions based on Webdriverio)
    /randomDataGenerator (Common random data generator functions)
    /utilities (Some other utility functions)
  README.md
  wdioAsync.conf.js (Project confifuration file - User can select tests to run and browser from here)
```

*Deliverables:*
•⁠  ⁠Automated test scripts for integration tests.
I have designed the below 3 tests:
1. bookStore_e2e -> This tests the endpoints E2E with correlation between all the APIs
a. GET API status -> Gets the status of the API
b. GET List of books -> Gets the list of the books with paramters (eg. book type = non-fiction). Here we are storing a book's id as a var that we will place order for in the forthcoming API
c. POST Register as a customer -> Registers a customer with unique client name and email address and returns an access token (which will be used for user session and all the below forthcoming endpoints)
d. POST Place an order for a book -> Places an order for a customer for a specific book id (we got in step b) & customer name, with an access token to maintain the session and returns an order id
e. GET Order details -> Gets the order details that can be verfication point for the order placed and its details (like bookID, Customer name, quantity etc)
f. PATCH Customer name -> Updates the customer name of the order
g. DELETE Order -> Deletes the Order
2. calculateAPIResponseTime -> This test Calculates performance of the User Registeration API by requesting the endpoint for 10 times concurrently and checking that the average response time for all the requests combined is less than a second
3. userRegisteration_negative -> This tests the various 4xx errors for the POST APIs

•⁠  ⁠Postman collections for manual testing. - https://www.postman.com/science-geoscientist-92587966/workspace/test/collection/18419543-a1ab8d9e-9d94-4769-9979-1c5f5030decf
•⁠  ⁠A detailed ⁠ README.md ⁠.

How to run this project local machine?
Pre Requisites:
a. Node v16 and above
b. npm v9 and above

1. Clone this Git repo on your local machine and open it on any IDE 
2. Install all the npm dependencies by simply running the command npm install
3. Once the dependencies are installed without any issues, run the test simply running the command -> npm run test
4. Once the test is run (it will be indicated on the terminal, which takes approx 13 secs). To view the report run command -> npm run report (An html report would open automatically on your default browser)