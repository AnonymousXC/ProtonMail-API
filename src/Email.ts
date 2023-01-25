import { Page } from "puppeteer";

interface EmailData {
    to: string,
    subject: string,
    message: string,
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
        this._TO = await emailData.to;
        this._SUBJECT = await emailData.subject;
        this._MESSAGE = await emailData.message;
        await this._PAGE.click('body > div.app-root > div.flex > div > div > div > div.sidebar > div > button')
        // await this._PAGE.waitForSelector('[data-testid="composer:to]"', {visible: true})
        // await this._PAGE.type('[placeholder="Email address"]', this._TO)
        // await this._PAGE.screenshot({path: 'success.png'})
    }
}

export default Email;