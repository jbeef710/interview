const BaseElement = require('../lib/BaseElement');
const by = require('selenium-webdriver').By;
const config = require('./../lib/config');

class MtgCalcPage {
    constructor() {
        this.url = config.BASE_URL;
    }

    get elements() {
        return {
            loanAmount: new BaseElement(by.id('calculator_widget_amount')),
            interestRate: new BaseElement(by.id('calculator_widget_interest')),
            mortgageTerm: new BaseElement(by.id('calculator_widget_Length')),
            homeValue: new BaseElement(by.id('calculator_widget_HomeValue')),
            annualTaxes: new BaseElement(by.id('calculator_widget_PropertyTaxes')),
            annualInsurance: new BaseElement(by.id('calculator_widget_Insurance')),
            PMI: new BaseElement(by.id('calculator_widget_PMI')),
            nextButton: new BaseElement(by.className('calculator-button next-button')),
            showResultsButton: new BaseElement(by.css('li.next.finish a.finish-button')),
            resultTable: new BaseElement(by.id('analysisDiv')),
            monthlyPAndIText: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr/th")),
            monthlyPAndI: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr/td")),
            loanToValueText: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr[4]/th")),
            loanToValue: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr[4]/td")),
            totalMonthlyPaymentsText: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr[7]/th")),
            totalMonthlyPayments: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr[7]/td")),
            resultValuesCount: new BaseElement(by.xpath("//div[@id='analysisDiv']/table/thead/tr"))
        }
    }

    navigateTo() {
        return driver.getCurrentUrl()
            .then((url) => {
                if (url !== this.url) {
                    return driver.get(this.url)
                        .then(this.validateUrl());
                }
                console.log('already on URL, no navigation done');
                return Promise.resolve();
            });
    }

    validateUrl() {
        return driver.getCurrentUrl()
            .then((currentUrl) => {
                expect(currentUrl).toBe(this.url);
            });
    }
}

module.exports = new MtgCalcPage;
