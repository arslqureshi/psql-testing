import mailgun from 'mailgun-js';


const emailController = {
    sendmail(subject: any, body: any, to: any) {
        const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN});
        const data = {
            from: 'IInstant Shopping <arslq8@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
}

export default emailController;