# Proton Mail API

Unofficial API for interacting with ProtonMail.

Allows interaction with ProtonMail through a simple Node.js API. Leverages the official WebClient, keeping with the spirit of security and privacy. Currently supports sending email. It does not compromise with security as it uses web automation.

# Note

## For Browsers
The fs module is not accessible in the browser. So, using the browserless API key you can now use it with any of your frameworks with a server. Instead, the server is provided by the browserless.io.

## For Node Apps
If, you are making a node app then, their is no need of browserless API key.It will work fine. Without any configuration.


# Setup

## Installation
```
npm i proton-email-api
```

## Sending an email

```Javascript
import ProtonMail from 'proton-email-api';


async sendEmail() {
    const pm = new ProtonMail({
        username: 'your username',
        password: 'your password',
        browserlessAPI: 'your api key of browserless.io',
    })
    await pm.connect() // optional param {debug : boolean}
    await pm.sendEmail({
        to: 'email address',
        subject: 'subject (does not support HTML)',
        message: 'message (supports HTML)',
    })
    await pm.close()
};
```

## More
More features are coming soon. And if u any specific feature then do [DM Me](https://anonymousxc.github.io/ItsMeOnly/). I will try to implement it.
