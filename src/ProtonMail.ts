import puppeteer, { Page, Browser } from "puppeteer";
import UserAgent from 'user-agents';
import Email from './Email.js';

interface UserConfig {
    username: string,
    password: string,
}

interface EmailData {
    to: string,
    subject: string,
    message: string,
    debug?: boolean,
}

class ProtonMail {

    _Username : string;
    _Password : string;
    _BROWSER : Browser;
    _PAGE : Page;
    _EMAIL : Email;
    INVALID_LOGIN : boolean;

    constructor(config : UserConfig) {
        if(!config.username) throw new Error('Username not found');
        if(!config.password) throw new Error('Password not found')
        this._Username = config.username || '';
        this._Password = config.password || '';
        this._EMAIL = new Email();
    }

    async connect(opts: { debug? : boolean}) {
        if(opts.debug === true)
        {
            await console.log('connecting...')
            await console.time('connect in')
        }

        await this.congifurePuppeteer()

        if(opts.debug === true)
            await console.timeLog('connect in')
    }

    async congifurePuppeteer() {
        const userAgent = new UserAgent({deviceCategory:'desktop'})
        this._BROWSER = await puppeteer.launch({ headless: true })
        this._PAGE = await this._BROWSER.newPage();
        this._PAGE.setUserAgent(userAgent.data.userAgent)
        this._PAGE.setViewport({ 
            width: userAgent.data.viewportWidth, 
            height: userAgent.data.viewportHeight,
            deviceScaleFactor: 1
        });
        await this.loginProton(this._PAGE)
    }

    async loginProton(PAGE : Page) {
        await PAGE.goto('https://account.proton.me/login', { waitUntil: 'networkidle0' })
        await PAGE.waitForSelector('body > div.app-root > div.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed.relative > div.sign-layout-container.flex-item-fluid-auto.flex.flex-nowrap.flex-column.flex-justify-space-between > div > main > div.sign-layout-main-content > form > button')
        await PAGE.type('#username', this._Username)
        await PAGE.type('#password', this._Password)
        await PAGE.click('body > div.app-root > div.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed.relative > div.sign-layout-container.flex-item-fluid-auto.flex.flex-nowrap.flex-column.flex-justify-space-between > div > main > div.sign-layout-main-content > form > button')
        await PAGE.waitForSelector('body > div.app-root > div.flex.flex-row.flex-nowrap.h100 > div > div > div > div.sidebar.flex.flex-nowrap.flex-column.no-print.outline-none > div.flex-item-fluid.flex-nowrap.flex.flex-column.scroll-if-needed.pb1 > nav')
            .then(async () => {})
            .catch(err => {  
                this.INVALID_LOGIN = true;
                throw new Error("Invalid login.")
            })        
        await PAGE.waitForNetworkIdle({ idleTime: 250 })
        await this._EMAIL.setPage(this._PAGE)
    }

    async sendEmail(emailData : EmailData) {
        await this._EMAIL.sendEmail(emailData)
    }

    async close() {
        await this._BROWSER.close()
    }
}

export { ProtonMail };