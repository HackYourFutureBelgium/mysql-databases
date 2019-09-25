var express = require('express');
var router = express.Router();
const countryRepo = require('../modules/countryRepository');

// In this file we will define all possible routes related with countries
// A get request to country will give you the list of all countries
router.get('/', async (req, res) => {

  try {
    // we retrieve all the countries
    const result = await countryRepo.getCountries();
    // and pass it to our render pug that will search for a template called countries.pug
    //and it will pass it an array called countryList with the list of countries selected from the database.
    res.send({ "countryList": result });
    // we could have done res.json(result); and then it will return a json containing all the countries
  } catch (e) {
    // Always use a catch for your errors
    res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
  }
});

// This route is to go and search for a specific country with a specific Id (code)
router.get('/:id', async (req, res) => {
  try {
    // we use the country repository to get the result and we pass it the parameter that we got from the url
    // since it is a GET request it is stored in req.params.id
    const result = await countryRepo.getCountryByCode(req.params.id);
    // we render the first result [0] in a pug file called countryDetail.pug and pass a title = "Detail page"
    res.send({ "country": result[0], "title": "Detail page" });
    // TODO: Possible exercise: add code so if the result gives 0 results or more than one a controlled error is shown.
  } catch (e) {
    res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
    throw e;
  }
});

module.exports = router;
