const axios = require("axios");

const getData = (req, res, Country) => {
  console.log("DB inicializada");
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((countries) => {
      countries = countries?.data.map((country) => ({
        nombre: country.name.common,
        id: country.cca3,
        bandera: country.flags.png,
        continente: country.region,
        subregion: country.subregion,
        capital: country.capital || "Sin capital",
        area: country.area,
        poblacion: country.population,
      }));

      Country?.bulkCreate(countries);
    })
    .then(() => Country?.findAll())
    .then((countries) => res.status(200).send(countries))
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ error: "Something went wrong while loading countries..." });
    });
};

module.exports = getData;
