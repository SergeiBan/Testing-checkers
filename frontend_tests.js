const puppeteer = require("puppeteer");

const url = "https://salty-island-05394.herokuapp.com/";

async function testMovingAhead() {
    const initialPoint = 'button[data-y="6"][data-x="7"]';
    const browser = await puppeteer.launch({headless: false, slowMo: 100});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(`${initialPoint}`);
    const man = await page.$(`${initialPoint}`);
    await man.click();
    
    const newPoint = 'button[data-y="5"][data-x="6"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();
    
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "W" ? "Move ahead: Success" : "Move ahead: Failure");
    await browser.close();
}

testMovingAhead()