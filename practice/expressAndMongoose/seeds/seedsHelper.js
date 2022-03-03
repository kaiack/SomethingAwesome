const { uniqueNamesGenerator, adjectives, starWars, animals} = require('unique-names-generator');

const users = [];
const titles = [];

for (let i =0; i < 10; i++){
    let shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, starWars], // colors can be omitted here as not used
        length: 2
    }).replace(/\s/g, "-");;
    let title = uniqueNamesGenerator({
        dictionaries: [animals], 
        length: 1
    });
    titles.push(title);
    users.push(shortName);
}
console.log(users, titles);
//module.exports.Users = users;