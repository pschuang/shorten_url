require('dotenv').config();
const { EC2_ENDPOINT } = process.env;
const {
  addShortUrl,
  getLongUrl1,
  getLongUrl2,
  getLongUrl3,
} = require('../models/shortenURL1_model');

const getURL = async (req, res) => {
  const shortURL = req.params.shortURL;

  // get first word
  const shortURLFirst = str.split(shortURL)[0];

  let longURL;
  switch (shortURLFirst) {
    case 'B':
      longURL = await getLongUrl1(shortURL);
    case 'C':
      longURL = await getLongUrl2(shortURL);
    case 'D':
      longURL = await getLongUrl3(shortURL);
  }

  res.redirect(301, longURL);
};

const postURL = async (req, res) => {
  const longURL = req.body.longURL;

  // 預計拿到"a123456"
  const shortURLBase62 = await addShortUrl(longURL);
  const shortURL = `http://${EC2_ENDPOINT}/api/v1/${shortURLBase62}`;
  res.status(200).json({ shortURL });
};

module.exports = { getURL, postURL };
