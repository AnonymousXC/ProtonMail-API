# Proton Mail API

Unofficial API for interacting with ProtonMail.

Allows interaction with ProtonMail through a simple Node.js API. Leverages the official WebClient, keeping with the spirit of security and privacy. Currently supports sending email. It does not compromise with security as it uses web automation.

# Setup

## Sending an email

```Javascript
import ProtonMail from '../lib/index.js';


(async () {
    const pm = new ProtonMail({
        username: 'your username',
        password: 'your password',
    })
    await pm.connect()
    await pm.sendEmail({
        to: 'email',
        subject: 'subject (does not support HTML)',
        message: 'message (supports HTML)',
    })

    await pm.close()
})();
```

## More
More features are coming soon. And if u any specific feature then do [DM Me](https://anonymousxc.github.io/ItsMeOnly/). I will try to implement it.