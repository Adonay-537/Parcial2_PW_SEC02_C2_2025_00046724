
const cuentas = require('../data/cuentas.json');

const getAllCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};


const getCuentaById = (req, res) => {
  const cuenta = cuentas.find(c => c._id === req.params.id);
  res.json({
    finded: !!cuenta,
    account: cuenta || null
  });
};


const getCuentaByQuery = (req, res) => {
  const { queryParam } = req.query;

  if (!queryParam) {
    return res.json({
      finded: false,
      message: "No se proporcionó queryParam"
    });
  }

  const results = cuentas.filter(c =>
    c._id === queryParam ||
    c.client.toLowerCase().includes(queryParam.toLowerCase()) ||
    c.gender.toLowerCase() === queryParam.toLowerCase()
  );

  if (results.length === 1) {
    res.json({ finded: true, account: results[0] });
  } else if (results.length > 1) {
    res.json({ finded: true, data: results });
  } else {
    res.json({ finded: false });
  }
};


const getBalanceTotal = (req, res) => {
  const activos = cuentas.filter(c => c.isActive);
  const total = activos.reduce((acc, c) => {
    const valor = parseFloat(c.balance.replace('$', '').replace(',', ''));
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);

  res.json({
    status: activos.length > 0,
    accountBalance: `$${total.toFixed(2)}`
  });
};


module.exports = {
  getAllCuentas,
  getCuentaById,
  getCuentaByQuery,
  getBalanceTotal
};
