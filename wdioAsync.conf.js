var rimraf = require("rimraf");
const video = require('wdio-video-reporter');
const deepmerge = require('deepmerge');

const baseConf = require('./wdio.base.conf');
const utilities = require("./Utilities/utilities"); 

exports.config = deepmerge(baseConf.config, {
    username: 'azman.ansari@talabat.com.qa1',
    password: 'Youolonce@123',
    username_uat: 'salesforsalesforce.sales@deliveryhero.com.uat1',
    password_uat: 'Salesforce_082023',
    
    specs: [
        './Tests/*.test.js',
    ],
});
    
exports.config.capabilities[0].acceptInsecureCerts = true;
        
exports.config.logLevel = 'info';
    
exports.config.reporters.push(
        // ['json', {
        //     outputDir: 'json-report',
        //     outputFileFormat: function (options) {
        //         return `results-${operations.generateTodaysDateAltFormat3()}-${options.cid}.json`
        //     }
        // }],
        // [video, {
        //     saveAllVideos: true,       // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        // }]
        );



exports.config.mochaOpts.timeout = 9999999;

exports.config.onPrepare = function () {
    rimraf('./_results_', function () { console.log("Allure video and images files have been deleted "); });
    rimraf('./json-report', function () { console.log("Json reports deleted "); });
    utilities.deleteAllureJunitReports();
};
    

exports.config.before =  function (capabilities, specs) {
        global.datadogApiKey = process.env.datadog_api_key
    };

/**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
exports.config.beforeTest = function () {
    utilities.configureChaiAndWebDriver();
    utilities.setWdioBrowserTimeout();
    
};