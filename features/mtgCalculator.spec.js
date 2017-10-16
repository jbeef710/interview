const mtgCalcPage = require('./mtgCalculator.po');
const by = require('selenium-webdriver').By;

describe('Mortgage Payment Calculator Feature', () => {
    let loanAmount = '200000';
    let interestRate = '5.0';
    let mortgageTerm = '30';
    let homeValue = '235000';
    let annualTaxes = '2000';
    let annualInsurance = '1865';
    let PMI = '0.52';
    let monthlyPAndI = '$1,073.64';
    let loanToValue = '85.11%';
    let totalMonthlyPayments = '$1,482.39';
    let tableRowCount = 7;

    it('should input correct values and calculate payment', (done) => {
        mtgCalcPage.navigateTo()
            .then(mtgCalcPage.elements.loanAmount.waitFor())
            .then(mtgCalcPage.elements.loanAmount.sendKeysToClearedField(mtgCalcPage.elements.loanAmount, loanAmount))
            .then(mtgCalcPage.elements.interestRate.sendKeysToClearedField(mtgCalcPage.elements.interestRate, interestRate))
            .then(mtgCalcPage.elements.mortgageTerm.sendKeysToClearedField(mtgCalcPage.elements.mortgageTerm, mortgageTerm))
            .then(mtgCalcPage.elements.homeValue.sendKeysToClearedField(mtgCalcPage.elements.homeValue, homeValue))
            .then(mtgCalcPage.elements.nextButton.click())
            .then(mtgCalcPage.elements.annualTaxes.sendKeysToClearedField(mtgCalcPage.elements.annualTaxes, annualTaxes))
            .then(mtgCalcPage.elements.annualInsurance.sendKeysToClearedField(mtgCalcPage.elements.annualInsurance, annualInsurance))
            .then(mtgCalcPage.elements.PMI.sendKeysToClearedField(mtgCalcPage.elements.PMI, PMI))
            .then(mtgCalcPage.elements.showResultsButton.click())
            .then(done, done.fail);
    });

    it('should verify calculated payment', (done) => {
        mtgCalcPage.elements.resultTable.waitFor()
            .then(mtgCalcPage.elements.resultValuesCount.assertCount(tableRowCount))
            // TODO fix assignVariables function, to remove hardcoded values
            //.then(mtgCalcPage.elements.resultValuesCount.assignVariables('Monthly Principal & Interests'))
            //.then(mtgCalcPage.elements.resultValuesCount.assignVariables('Loan To Value Ratio'))
            //.then(mtgCalcPage.elements.resultValuesCount.assignVariables('Total Monthly Payments'))
            .then(mtgCalcPage.elements.monthlyPAndIText.assertText('Monthly Principal & Interests'))
            .then(mtgCalcPage.elements.monthlyPAndI.assertText(monthlyPAndI))
            .then(mtgCalcPage.elements.loanToValueText.assertText('Loan To Value Ratio'))
            .then(mtgCalcPage.elements.loanToValue.assertText(loanToValue))
            .then(mtgCalcPage.elements.totalMonthlyPaymentsText.assertText('Total Monthly Payments'))
            .then(mtgCalcPage.elements.totalMonthlyPayments.assertText(totalMonthlyPayments))
            .then(done, done.fail);
    });
});
