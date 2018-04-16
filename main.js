const twitter = require("twitter")
const atoms = require("./atoms.json")
const cron = require("node-cron")
const moment = require("moment")
const http = require("http")
const date_format = "YYYY-MM-DD hh:mm:ss"
const tclient = new twitter({
  consumer_key: process.env.twitter_suiso_consumer_key,
  consumer_secret: process.env.twitter_suiso_consumer_secret,
  access_token_key: process.env.twitter_suiso_access_token_key,
  access_token_secret: process.env.twitter_suiso_access_token_secret
})

console.log("started: " + moment().format(date_format))

//app running check for heroku
http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text:plain"})
  res.end(process.env.app_status)
}).listen(process.env.PORT || 8080)

cron.schedule(`0 0 * * * * *`, () => {
  const random_atom = atoms[Math.floor(Math.random() * atoms.length)]
  const tweet_text = `あぁ～！ ${random_atom} の音ォ〜！！`
  tclient.post('statuses/update', {status: tweet_text}, (error, tweet, response) => {
    if(error) console.log(error);
  })
})