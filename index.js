const express = require('express')
const axios = require('axios')

const clientID = 'xxxxxxxxxx'
const clientSecret = 'xxxxxxxxxxx'

const app = express();

app.set('view engine', 'ejs')
var access_token = "";

app.get('/github/callback', (req, res) => {
    const requestToken = req.query.code;

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        access_token = response.data.access_token;
        res.redirect('/success')
    })
})

app.get('/success', (req, res) => {
    axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            Authorization: `token  ${access_token}`
        }
    }).then((response) => {
        res.render('page/success', {userData: response.data})
    })
})

app.get('/', (req, res) => {
    res.render('page/index', {client_id: clientID})
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("App listening on port " + port ));