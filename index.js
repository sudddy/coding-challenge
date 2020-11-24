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
  return totalValue;
};

var grossProfit = (ledger, ...rest) => {
  let data = ledger.data,
    account_type = rest[0],
    value_type = rest[1],
    revenue = rest[2],
    totalValue = 0;

  let value = data
    .filter(
      data =>
        data.account_type === account_type && data.value_type === value_type
    )
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);

  console.log("before", value);
  totalValue = value / revenue;
  console.log("value", totalValue);
  return totalValue;
};

let revenue = calRevOrExp(ledger, constants.ACCOUNT_REVENUE);
let expense = calRevOrExp(ledger, constants.ACCOUNT_EXPENSE);
let grossPro = grossProfit(
  ledger,
  constants.ACCOUNT_TYPE,
  constants.VALUE_TYPE,
  revenue
);
