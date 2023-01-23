import puppeteer from "puppeteer";

interface UserConfig {
    username: string,
    password: string,
}

class ProtonMail {

    _Username : string;
    _Password : string;
    _BROWSER : any;
    _PAGE : any;

    constructor(config : UserConfig) {
        if(!config.username) throw new Error('Username not found');
        if(!config.password) throw new Error('Password not found')
        this._Username = config.username || '';
        this._Password = config.password || '';
        this.congifurePuppeteer()
    }

    async congifurePuppeteer() {
        this._BROWSER = await puppeteer.launch({ headless: true })
        this._PAGE = await this._BROWSER.newPage();
        await this._PAGE.goto('https://www.typescriptlang.org/docs/handbook/esm-node.html/')
        await this._PAGE.screenshot({path: '1.png'})
    }

}

export { ProtonMail };