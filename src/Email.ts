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

        /*const frames = await this._PAGE.frames()
        const currFrame = await frames[0].content()
        await this._PAGE.focus('body > div.app-root > div:nth-child(5) > div > div > div > div > section > div > div > div.h100.flex-item-fluid.flex.flex-column.relative.composer-content--rich-edition.pl1-75.pr1-75 > div')
        await this._PAGE.keyboard.type(this._MESSAGE)*/

        await this._PAGE.click('body > div.app-root > div:nth-child(5) > div > div > div > footer > div > div.button-group > button')
        await this._PAGE.waitForSelector('body > div.app-root > div:nth-child(5) > div > div > div > footer > div > div.button-group > button', {hidden: true})
        await this._PAGE.screenshot({path: 'success.png'})

        if(emailData.debug === true)
            await console.timeLog('message sent in');
    }
}

export default Email;