var ledger = require("./data.json");
var constants = require("./constant");

var calRevOrExp = (ledger, constant) => {
  let data = ledger.data;
  let totalValue = data
    .filter(data => data.account_category === constant)
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);
  console.log(constant, totalValue);
};

calRevOrExp(ledger, constants.ACCOUNT_REVENUE);
calRevOrExp(ledger, constants.ACCOUNT_EXPENSE);
