var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");

router.get("/ultimas/:idAquario", function (req, res) {
    votoController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    votoController.buscarMedidasEmTempoReal(req, res);
})

router.post("/criar", function (req, res) {
    votoController.criar(req, res);
})

router.get("/votos", function (req, res) {
    votoController.listar(req, res);
})

module.exports = router;