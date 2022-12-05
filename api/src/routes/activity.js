const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  try {
    res.send("soy la ruta activity");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const { nombre, dificultad, duracion, temporada } = req.body;
    Activity.create({ nombre, dificultad, duracion, temporada });
    res.status(200).send("Creada Actividad con éxito");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR 400");
  }
});

module.exports = router;
