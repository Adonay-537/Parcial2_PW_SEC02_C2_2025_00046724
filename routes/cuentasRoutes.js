const express = require('express');
const router = express.Router();

const {
  getAllCuentas,
  getCuentaById,
  getCuentaByQuery,
  getBalanceTotal
} = require('../controllers/cuentasController');


router.get('/cuentas', (req, res, next) => {
  if (req.query.queryParam) {
    getCuentaByQuery(req, res);
  } else {
    getAllCuentas(req, res);
  }
});

router.get('/cuenta/:id', getCuentaById);

router.get('/cuentasBalance', getBalanceTotal);

module.exports = router;
