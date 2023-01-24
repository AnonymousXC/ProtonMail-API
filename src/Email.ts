import { Page } from "puppeteer";


class Email {

    _PAGE : Page;

    constructor(_page: Page) {
        this._PAGE = _page;
        _page.screenshot({path: 'sadad.png'})
    }
}

export default Email;