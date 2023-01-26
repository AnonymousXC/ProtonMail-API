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
            await console.log("Message sending started.");
            
        this._TO = await emailData.to;
        this._SUBJECT = await emailData.subject;
        this._MESSAGE = await emailData.message;
        await this._PAGE.click('body > div.app-root > div.flex > div > div > div > div.sidebar > div > button')
        await this._PAGE.waitForSelector('body > div.app-root > div:nth-child(5) > div > div > div > footer > div > div.button-group > button', {visible: true})
        const emailInput = await this._PAGE.$x('//*[@placeholder="Email address"]')
        const subjectInput = await this._PAGE.$x('//*[@placeholder="Subject"]')
        const messageInput = await this._PAGE.$x('//*[@id="rooster-editor"]')
        await emailInput[0].type(emailData.to)
        await subjectInput[0].type(emailData.subject)

        if(emailData.debug === true)
            await console.log("Message send.");
    }
}

export default Email;