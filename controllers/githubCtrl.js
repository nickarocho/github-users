var request = require('request');

function userDetails(req, res) {
    const rootURL = 'https://api.github.com/';
    var username = req.body.username || req.query.username;
    if (!username) return res.render('index', {userData: null});
    var options = {
      url: `${rootURL}users/${req.body.username}?access_token=${process.env.GITHUB_TOKEN}`,
      headers: {
        'User-Agent': process.env.USER_AGENT,
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }
    request(options, function(err, response, body) {
      var userData = JSON.parse(body);
      options.url = userData.repos_url;
      request(options, function(err, response, body) {
        userData.repos = JSON.parse(body);
        res.render('index', {userData});
      });
    });
}

function search(req, res) {
    const rootURL = 'https://api.github.com/';
    var username = req.body.username || req.query.username;
    if (!username) return res.render('index', {userData: null});
    var options = {
      url: `${rootURL}search/users?q=${req.body.username}+in:fullname?access_token=${process.env.GITHUB_TOKEN}`,
      headers: {
        'User-Agent': process.env.USER_AGENT,
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }
    request(options, function(err, response, body) {
      var userData = JSON.parse(body);
      console.log(userData)
        res.render('search-results', {userData})
    });
}

module.exports = {
    userDetails,
    search
}