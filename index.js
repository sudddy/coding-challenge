var ledger = require("./data.json");
var constants = require("./constant");

var calculateRevenue = ledger => {
  let data = ledger.data;
  let totalValue = data
    .filter(data => data.account_category === constants.ACCOUNT_REVENUE)
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);

  console.log("Revenue: ", totalValue);
};

calculateRevenue(ledger);
