const {accounts, writeJSON} = require('../data');
const express = require('express');
const router = express.Router();

router.get('/transfer', (req,res) => {
    res.render('transfer');
});

router.post('/transfer', (req,res) => {
    const body = req.body
    const newBalanceFrom = accounts[body.from].balance - body.amount;
    const newBalanceTo = parseInt(accounts[body.to].balance) + parseInt(body.amount,10);

    accounts[body.from].balance = newBalanceFrom;
    accounts[body.to].balance = newBalanceTo;
    writeJSON();

    res.render('transfer',{message:'Transfer Completed'});
});

router.get('/payment', (req,res) => {
    res.render('payment', {account:accounts.credit});
});

router.post('/payment', (req,res) => {
    const body = req.body;
    accounts.credit.balance -= body.amount;
    accounts.credit.available += parseInt(body.amount,10);
    writeJSON();

    res.render('payment', {message:'Payment Sucessfull', account: accounts.credit});
});

module.exports = router;