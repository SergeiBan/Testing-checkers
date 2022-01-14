const puppeteer = require("puppeteer");

const url = "https://salty-island-05394.herokuapp.com/";

async function getPage() {
    const browser = await puppeteer.launch({headless: false, slowMo: 100});
    const page = await browser.newPage();
    await page.goto(url);
    return [browser, page]
}

async function testMovingAheadWhite(page) {
    const initialPoint = 'button[data-y="6"][data-x="7"]';
    await page.waitForSelector(`${initialPoint}`);
    const initialPosition = await page.$(`${initialPoint}`);
    await initialPosition.click();
    
    const newPoint = 'button[data-y="5"][data-x="6"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();
    
    const oldClass = (await (await initialPosition.getProperty('className')).jsonValue());
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "W" && oldClass === "V" ? "Move ahead (White): Success" : "Move ahead (White): Failure");
    
}

async function testMovingAheadWhiteWrong(page) {
    const initialPoint = 'button[data-y="6"][data-x="7"]';
    await page.waitForSelector(`${initialPoint}`);
    const initialPosition = await page.$(`${initialPoint}`);
    await initialPosition.click();
    
    const newPoint = 'button[data-y="5"][data-x="7"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();
    
    const oldClass = (await (await initialPosition.getProperty('className')).jsonValue());
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "V" && oldClass === "W" ? "Move ahead in wrong direction (White): Success" : "Move ahead in wrong direction (White): Failure");
    
}

async function testMovingAheadBlack(page) {
    const initialPoint = 'button[data-y="3"][data-x="6"]';
    await page.waitForSelector(`${initialPoint}`);
    const initialPosition = await page.$(`${initialPoint}`);
    await initialPosition.click();

    const newPoint = 'button[data-y="4"][data-x="7"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();

    const oldClass = (await (await initialPosition.getProperty('className')).jsonValue());
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "B" && oldClass === "V" ? "Move ahead (Black): Success" : "Move ahead (Black): Failure");
}

async function run() {
    const [browser, page] = await getPage();
    await testMovingAheadWhiteWrong(page);
    await testMovingAheadWhite(page);
    try {
        await testMovingAheadBlack(page);
    } catch {
        console.log("#2 testMovingAheadBlack is broken");
    }
    await browser.close();
    
}

run();