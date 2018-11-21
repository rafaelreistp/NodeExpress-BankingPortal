const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'),{encoding: 'UTF8'});
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'),{encoding: 'UTF8'});
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

writeJSON = () => {
    let accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'),accountsJSON,'utf8');
}

module.exports = {
    accounts,
    users,
    writeJSON
}