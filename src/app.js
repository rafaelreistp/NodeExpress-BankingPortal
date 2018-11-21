const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'),{encoding: 'UTF8'});
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'),{encoding: 'UTF8'});
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (req,res) => {
    res.render('account', {account: accounts.savings});
});

app.get('/checking', (req,res) => {
    res.render('account', {account: accounts.checking});
});

app.get('/credit', (req,res) => {
    res.render('account', {account: accounts.credit});
});

app.get('/profile', (req,res) => {
    res.render('profile', {user:users[0]});
});

app.get('/transfer', (req,res) => {
    res.render('transfer');
});

app.post('/transfer', (req,res) => {
    const body = req.body
    const newBalanceFrom = accounts[body.from].balance - body.amount;
    const newBalanceTo = parseInt(accounts[body.to].balance) + parseInt(body.amount,10);

    accounts[body.from].balance = newBalanceFrom;
    accounts[body.to].balance = newBalanceTo;
    var accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'),accountsJSON,'utf8');

    res.render('transfer',{message:'Transfer Completed'});
});

app.get('/payment', (req,res) => {
    res.render('payment', {account:accounts.credit});
});

app.post('/payment', (req,res) => {
    const body = req.body;
    accounts.credit.balance -= body.amount;
    accounts.credit.available += parseInt(body.amount,10);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'),accountsJSON,'utf8');

    res.render('payment', {message:'Payment Sucessfull', account: accounts.credit});
})

app.listen(3000, () => {
    console.log('PS Project running on port 3000!');
});