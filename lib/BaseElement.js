class BaseElement {
    constructor(locator) {
        this.locator = locator;
    }

    find() {
        return driver.findElement(this.locator);
    }

    waitFor() {
        return driver.wait(() => {
            return driver.findElements(this.locator)
                .then((elements) => {
                    return elements.length > 0;
                })
        })
    }

    click() {
        return this.find()
            .then((element) => {
                return element.click();
            });
    }

    sendKeys(keysToSend) {
        return this.find()
            .then((element) => {
                return element.sendKeys(keysToSend);
            });
    }

    getText() {
        return this.find()
            .then((element) => {
                return element.getText()
            })
    }

    getCount() {
        return driver.findElements(this.locator)
            .then((elements) => {
                return elements.length;
            })
    }

    clearText() {
        return this.find()
            .then((element) => {
                return element.clear()
            })
    }

    assertText(textToAssert) {
        return this.getText()
            .then((text) => {
                return expect(text).toBe(textToAssert);
            });
    }

    assertCount(countToAssert) {
        return this.getCount()
            .then((count) => {
                return expect(count).toBe(countToAssert);
            });
    }

    //TODO understand why this isn't working
    assignVariables(textToMatch) {
        return this.getCount()
            .then((totalRows) => {
                console.log('total rows ' + totalRows);
                console.log('passed in value ' + this.locator.value);
                for (let row = 1; row <= totalRows; row++) {
                    let test;
                    let value = this.locator.value + '[' + row + ']/th';
                    console.log('passed in locator ' + this.locator);
                    console.log('updated value ' + value);
                    this.getText(value)
                        .then((text) => {
                            console.log('text is: ' + text);
                            return text;
                        })
                        .then((text) => {
                            if (text.includes(textToMatch)) {
                                test = this.locator.value + '[' + row + ']/td';
                                console.log('passed in dollar value ' + test);
                            }
                        });
                }
            })
    }

    sendKeysToClearedField(field, text) {
        return this.clearText()
            .then(field.sendKeys(text))
    }
}

module.exports = BaseElement;