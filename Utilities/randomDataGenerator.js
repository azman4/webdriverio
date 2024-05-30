const { faker } = require('@faker-js/faker');
const format = require('date-fns/format');
const RandExp = require('randexp');

class RandomDataGenerator{
    
    /**
     * @azman4
     * Generate random birthdate between two ranges
     * @param {string} [from='01/01/1970'] 
     * @param {string} [to='12/31/2005'] 
     * @param {string} [dateFormat='dd-MM-yyyy']
     * @returns {string} the generated date between the range in the given format  
     */

    async getRandomBirthdate(from = '01/01/1970', to = '12/31/2005', dateFormat='MM/dd/yyyy'){
        return format(faker.date.between({
            
            from: new Date(from),
            
            to: new Date(to)
        }), dateFormat);        
    }

    /**
     * @azman4
     * @param {number} length
     * @returns {string} the generated string with fixed length 
     */

    async generateRandomString(length){
        length = Number(length);
        return (faker.string.sample(length));
    }

    /**
     * @azman4
     * @param {number} min 
     * @param {number} max 
     * @returns {number} generated number between min and max
     */
    async generateRandomNumber(min, max){
        return await Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * @azman4
     * @param {int} length
     * @returns {int} the generated number with fixed length 
     */
    async generateRandomFixedNumber(length){
        return await Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }

    /**
     * @azman4
     * @param {int} length
     * @returns {int} the generated number with fixed length 
     */
    async generateRandomFixedNumberString(length=5){
        length = Number(length);
        return faker.string.numeric(length);
    }

    /**
     * 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} provider 
     * @param {string} allowSpecialCharacters 
     * @returns{string} email 
     */
    async generateRandomEmail(provider){
        
        return (faker.internet.email({provider:provider}));
    }

    /**
     * @azman4
     * @param {number} from 
     * @param {number} to 
     * @param {number} fixed 
     * @returns {Array} numbers
     * ask ash about this functions useage 
     */

    async generateRandomLatLon(from, to, fixed=3){

        const coordinates = faker.location.nearbyGPSCoordinate({origin: [from, to]});
        const fixedCoordinates =  coordinates.map(coord =>  coord.toFixed(fixed));
        return fixedCoordinates;
    }

    /**
     * @azman4
     * @description - To generate random coordinates
     * @param {*} from eg: -180
     * @param {*} to eg: 180
     * @param {*} fixed - Number of decimals, eg: 3
     * @returns 
     */
    async generateRandomCoordinates(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    /**
     * @azman4
     * @param {number} [length=5] 
     * @returns {string}  
     */
    generateRandomCharactersString(length=5, casing='upper'){
        length = Number(length);
        return faker.string.alpha({ length: length, casing: casing,});

    }

    /**
     * @azman4
     * @param {int} [years=50] 
     * @param {string} [dateFormat=='dd-MM-yyyy']
     * @param {date|string|number} refDate
     * @returns {string} date
     */
    async generateRandomPastDate(years=50, dateFormat='dd-MM-yyyy', refDate=new Date()) {
        years = Number(years);
        let date = faker.date.past({ years: years, refDate:refDate });
        return format(date, dateFormat);
    }

    /**
     * @azman4
     * @param {int} days  
     * @param {string} [dateFormat=='dd-MM-yyyy'] 
     * @param {date|string|number} refDate
     * @returns {string} date
     */

    async generateRandomRecentDate(days=1, dateFormat='dd-MM-yyyy', refDate=new Date()) {
        days = Number(days);
        //refDate will always be yesterday
        refDate.setDate(refDate.getDate()-1);
        let date = faker.date.recent({ days: days, refDate:refDate });
        return format(date, dateFormat);
        
    }

     /**
     * @azman4
     * @param {int} years  
     * @param {string} [dateFormat=='dd-MM-yyyy'] 
     * @param {date|string|number} refDate
     * @returns {string} date
     */

    async generateRandomDateFuture(years=50, dateFormat='dd-MM-yyyy', refDate=new Date()) {
        years = Number(years);
        let date = faker.date.future({ years: years, refDate:refDate });
        return format(date, dateFormat);
       
    }

    /**
     * @azman4
     * @param {int} days  
     * @param {string} [dateFormat=='dd-MM-yyyy'] 
     * @param {date|string|number} refDate
     * @returns {string} date
     */
    async generateRandomDateSoon(days=2, dateFormat='dd-MM-yyyy', refDate=new Date()) {
        days = Number(days);
        let date = faker.date.soon({ days: days, refDate:refDate });
        return format(date, dateFormat);
        
    }

    async generateTodaysDate(days=0, dateFormat='dd/MM/yyyy') {
        days = Number(days);
        let date = new Date();

        let result = date.setDate(date.getDate() + days);
        date = new Date(result);
        return format(date, dateFormat);
        
    }

    async generateTodaysDateAltFormat(dateFormat='M/d/yyyy') {
        let date = new Date();
        let result = date.setDate(date.getDate());
        date = new Date(result);
        return format(date, dateFormat);
    }

    async addDaysToTodaysDate(days=0, dateFormat='dd-MM-yyyy') {
        days = Number(days);
        let date = new Date();
        
        let result = date.setDate(date.getDate() + days);
        date = new Date(result);
        
        return format(date, dateFormat);
        
    }

    /**
    * @azman4
    * @returns Generate random E-mail for SSU
    * @param {*} email
    * @param {*} regex 
    */ 
    async addRandomSubaddressToEmail(email, regex=/^\+[a-z0-9]{5}$/) {
        //Generate a random alphanumeric character
        const alphanumericChar = new RandExp(regex).gen();
      
        //Split the email into two parts: the part before "@" and the part after "@"
        const [emailPart1, emailPart2] = email.split('@');
      
        //Combine the parts with the added alphanumeric character
        const modifiedEmail = `${emailPart1}${alphanumericChar}@${emailPart2}`;
      
        return modifiedEmail;
    }

}

module.exports = new RandomDataGenerator()