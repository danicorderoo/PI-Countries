const { Router } = require("express");
const { Country } = require("../db");
const getData = require("../utils/funtions/getData.js");

const router = Router();
// Configurar los routers
router.get("/", async (req, res) => {
  let name = req.query.name;

  try {
    const stateDB = await Country?.findAll();
    if (stateDB.length === 0) getData(req, res, Country);

    if (name) {
      const countryName = await Country?.findOne({
        where: { nombre: name },
      });
      if (!countryName) throw Error();
      res.status(200).send(countryName);
    }
    if (!name && stateDB.length) {
      console.log("DB 'Country' Consultada");
      res.status(200).send(stateDB);
    }
  } catch (error) {
    console.log("Not found!");
    res
      .status(400)
      .send({ error: "Something went wrong while loading countries..." });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const countrie = await Country.findByPk(id.toUpperCase());
  if (countrie === null) {
    console.log("Not found!");
    res
      .status(400)
      .send({ error: "Something went wrong while loading countries..." });
  } else {
    console.log(`DB 'Country' Consultada con id:${id.toUpperCase()}`);
    res.status(200).send(countrie);
  }
});

module.exports = router;
