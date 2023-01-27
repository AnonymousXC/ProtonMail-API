import { Page } from "puppeteer";

interface EmailData {
    to: string,
    subject: string,
    message: string,
    debug?: boolean
}

class Email {

    _PAGE : Page;
    _TO: string;
    _SUBJECT: string;
    _MESSAGE: string;

    constructor() {
    }

    setPage(page : Page) {
        this._PAGE = page;
    }

    async sendEmail(emailData : EmailData) {
        if(emailData.debug === true)
        {
            await console.log('Message sending...');
            await console.time('message sent in')
        }
            
        this._TO = await emailData.to;
        this._SUBJECT = await emailData.subject;
        this._MESSAGE = await emailData.message;
        await this._PAGE.click('body > div.app-root > div.flex > div > div > div > div.sidebar > div > button')
        await this._PAGE.waitForSelector('body > div.app-root > div:nth-child(5) > div > div > div > footer > div > div.button-group > button', {visible: true})
        const emailInput = await this._PAGE.$x('//*[@placeholder="Email address"]')
        const subjectInput = await this._PAGE.$x('//*[@placeholder="Subject"]')
        await emailInput[0].type(emailData.to)
        await subjectInput[0].type(emailData.subject)

        await this._PAGE.waitForSelector('body > div.app-root > div:nth-child(5) > div > div > div > div > section > div > div > div.h100 > div > iframe')
        const msgIFrame = await this._PAGE.$('body > div.app-root > div:nth-child(5) > div > div > div > div > section > div > div > div.h100 > div > iframe')
        const contentFrame = await msgIFrame?.contentFrame()
        const msg = emailData.message;
        await contentFrame?.evaluate((msg) => {
            (document.getElementById('rooster-editor') as HTMLDivElement).innerHTML = msg;
        }, msg)
        
        await this._PAGE.click('body > div.app-root > div:nth-child(5) > div > div > div > footer > div > div.button-group > button')
        await new Promise(r => setTimeout(r, 2500));
        if(emailData.debug === true)
            await console.timeLog('message sent in');
    }
}

export default Email;