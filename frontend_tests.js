const puppeteer = require("puppeteer");

const url = "https://salty-island-05394.herokuapp.com/";

async function getPage() {
    const browser = await puppeteer.launch({headless: false, slowMo: 100});
    const page = await browser.newPage();
    await page.goto(url);
    return [browser, page]
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

async function testMovingAheadBlackWrong(page) {
    const initialPoint = 'button[data-y="3"][data-x="6"]';
    await page.waitForSelector(`${initialPoint}`);
    const initialPosition = await page.$(`${initialPoint}`);
    await initialPosition.click();

    const newPoint = 'button[data-y="4"][data-x="6"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();

    const oldClass = (await (await initialPosition.getProperty('className')).jsonValue());
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "V" && oldClass === "B" ? "Move ahead in wrong direction (Black): Success" : "Move ahead in wrong direction  (Black): Failure");
    // const NinitialPoint = 'button[data-y="3"][data-x="6"]';
    // const NinitialPosition = await page.$(`${NinitialPoint}`);
    // const NoldClass = (await (await NinitialPosition.getProperty('className')).jsonValue());
    // console.log(oldClass, NoldClass, newClass);
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

async function testMovingAheadBlackWrongTurn(page) {
    const initialPoint = 'button[data-y="3"][data-x="4"]';
    await page.waitForSelector(`${initialPoint}`);
    const initialPosition = await page.$(`${initialPoint}`);
    await initialPosition.click();

    const newPoint = 'button[data-y="4"][data-x="3"]';
    await page.waitForSelector(`${newPoint}`);
    const newPosition = await page.$(`${newPoint}`);
    await newPosition.click();

    const oldClass = (await (await initialPosition.getProperty('className')).jsonValue());
    const newClass = (await (await newPosition.getProperty('className')).jsonValue());
    console.log(newClass === "V" && oldClass === "B" ? "Move ahead - wrong turn - (Black): Success" : "Move ahead - wrong turn - (Black): Failure");
}

async function run() {
    const [browser, page] = await getPage();
    await testMovingAheadWhiteWrong(page);
    await testMovingAheadWhite(page);
    try {
        await testMovingAheadBlackWrong(page);
    } catch {
        console.log("#3 testMovingAheadBlackWrong is broken");
    }
    try {
        await testMovingAheadBlack(page);
    } catch {
        console.log("#4 testMovingAheadBlack is broken");
    }
    try {
        await testMovingAheadBlackWrongTurn(page);
    } catch {
        console.log("#5 testMovingAheadBlackWrongTurn is broken")
    }
    await browser.close();
    
}

run();