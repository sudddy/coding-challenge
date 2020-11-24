var ledger = require("./data.json");
var constants = require("./constant");

var calRevOrExp = (ledger, constant) => {
  let data = ledger.data;
  let totalValue = data
    .filter(data => data.account_category === constant)
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);
  console.log(
    constant,
    "$" + totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })
  );
  return totalValue;
};

var grossProfit = (ledger, constants, revenue) => {
  let data = ledger.data,
    totalValue = 0;
  let value = data
    .filter(
      data =>
        data.account_type === constants.ACCOUNT_TYPE_SALES &&
        data.value_type === constants.VALUE_TYPE_DEBIT
    )
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);

  totalValue = (value / revenue) * 100;
  console.log(
    "Gross Profit : ",
    totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "%"
  );
  return totalValue;
};

var netProfit = (expense, revenue) => {
  let remainder = revenue - expense;
  let value = (remainder / revenue) * 100;
  console.log(
    "Net Profit Margin",
    value.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "%"
  );
  return value;
};

var calculateAssets = (ledger, constants) => {
  let data = ledger.data,
    totalValue = 0;

  let addValues = data
    .filter(
      data =>
        data.account_category === constants.ACCOUNT_CATEGORY_ASSETS &&
        data.value_type === constants.VALUE_TYPE_DEBIT &&
        (data.account_type === constants.ACCOUNT_TYPE_CURRENT ||
          data.account_type === constants.ACCOUNT_TYPE_BANK ||
          data.account_type ===
            constants.ACCOUNT_TYPE_CURRENT_ACCOUNT_RECEIVABLE)
    )
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);

  let subractvalues = data
    .filter(
      data =>
        data.account_category === constants.ACCOUNT_CATEGORY_ASSETS &&
        data.value_type === constants.VALUE_TYPE_CREDIT &&
        (data.account_type === constants.ACCOUNT_TYPE_CURRENT ||
          data.account_type === constants.ACCOUNT_TYPE_BANK ||
          data.account_type ===
            constants.ACCOUNT_TYPE_CURRENT_ACCOUNT_RECEIVABLE)
    )
    .reduce((total, data) => {
      return total - data.total_value;
    }, 0);

  totalValue = addValues + subractvalues;
  return totalValue;
};

var calculateLiabilites = (ledger, constants) => {
  let data = ledger.data,
    totalValue = 0;

  let addValues = data
    .filter(
      data =>
        data.account_category === constants.ACCOUNT_CATEGORY_LIABILITY &&
        data.value_type === constants.VALUE_TYPE_CREDIT &&
        (data.account_type === constants.ACCOUNT_TYPE_CURRENT ||
          data.account_type === constants.ACCOUNT_TYPE_CURRENT_ACCOUNT_PAYABLE)
    )
    .reduce((total, data) => {
      return total + data.total_value;
    }, 0);

  let subractvalues = data
    .filter(
      data =>
        data.account_category === constants.ACCOUNT_CATEGORY_ASSETS &&
        data.value_type === constants.VALUE_TYPE_CREDIT &&
        (data.account_type === constants.ACCOUNT_TYPE_CURRENT ||
          data.account_type === constants.ACCOUNT_TYPE_CURRENT_ACCOUNT_PAYABLE)
    )
    .reduce((total, data) => {
      return total - data.total_value;
    }, 0);

  totalValue = addValues + subractvalues;
  return totalValue;
};

var calculateWorkCapitalRatio = (assets, liability) => {
  let value = (assets / liability) * 100;
  console.log(
    "Working Capital Ratio: ",
    value.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "%"
  );
  return value;
};

var revenue = calRevOrExp(ledger, constants.ACCOUNT_CATEGORY_REVENUE);
var expense = calRevOrExp(ledger, constants.ACCOUNT_CATEGORY_EXPENSE);
var grossPro = grossProfit(ledger, constants, revenue);
var netPro = netProfit(expense, revenue);
var calAssets = calculateAssets(ledger, constants);
var calLiab = calculateLiabilites(ledger, constants);
var workCaptialRatio = calculateWorkCapitalRatio(calAssets, calLiab);
