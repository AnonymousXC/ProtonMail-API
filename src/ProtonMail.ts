import puppeteer, { Page, Browser } from "puppeteer";
import UserAgent from 'user-agents';

interface UserConfig {
    username: string,
    password: string,
}

class ProtonMail {

    _Username : string;
    _Password : string;
    _BROWSER : Promise<Browser> | any;
    _PAGE : Promise<Page> | any;
    INVALID_LOGIN : boolean;

    constructor(config : UserConfig) {
        this._BROWSER = null;
        this._PAGE = null;
        if(!config.username) throw new Error('Username not found');
        if(!config.password) throw new Error('Password not found')
        this._Username = config.username || '';
        this._Password = config.password || '';
        this.congifurePuppeteer()
    }

    async congifurePuppeteer() {
        const userAgent = new UserAgent()
        console.log(userAgent);
        const _BROWSER = await puppeteer.launch({ headless: true })
        const _PAGE = await _BROWSER.newPage();
        await this.loginProton(_PAGE)
    }

    async loginProton(PAGE : Page) {
        await PAGE.goto('https://account.proton.me/login', { waitUntil: 'networkidle0' })
        await PAGE.waitForSelector('body > div.app-root > div.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed.relative > div.sign-layout-container.flex-item-fluid-auto.flex.flex-nowrap.flex-column.flex-justify-space-between > div > main > div.sign-layout-main-content > form > button')
        await PAGE.type('#username', this._Username)
        await PAGE.type('#password', this._Password)
        await PAGE.click('body > div.app-root > div.flex-no-min-children.flex-nowrap.flex-column.h100.sign-layout-bg.scroll-if-needed.relative > div.sign-layout-container.flex-item-fluid-auto.flex.flex-nowrap.flex-column.flex-justify-space-between > div > main > div.sign-layout-main-content > form > button')
        await PAGE.waitForSelector('body > div.app-root > div.flex.flex-row.flex-nowrap.h100 > div > div > div > div.sidebar.flex.flex-nowrap.flex-column.no-print.outline-none > div.flex-item-fluid.flex-nowrap.flex.flex-column.scroll-if-needed.pb1 > nav')
            .then(async () => {
                console.log("Logged in"); 
            })
            .catch(err => {  
                this.INVALID_LOGIN = true;
                throw new Error("Invalid login.")
            })        
        await PAGE.waitForNetworkIdle({ idleTime: 250 })
        await PAGE.screenshot({ path: '5.png'})
    }
}

export { ProtonMail };