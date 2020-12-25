const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])
const got = require('got')

const getMetadata = async (targetUrl) => {
  const { body: html, url } = await got(targetUrl)
  const metadata = await metascraper({ html, url })
  // console.log('metadata 1 : ', metadata)
  return metadata
}

router.get('/', (req, res, next) => {

  // console.log('req : ', req)
  const { url } = req.query

  try {
    getMetadata(url)
      .then((r => {
        console.log('metadata 2 : ', r)
        const response = {
          "success": 1,
          "meta": {
            "title": r.title,
            "description": r.description,
            "image": {
              "url": r.image
            }
          }
        }
        res.send(response)
      }))
  } catch (error) {
    res.send({ success: false })
  }
});

router.all('*', function (req, res, next) {
  next(createError(404, 'siteInfo ... 그런 api 없어'));
});
module.exports = router;