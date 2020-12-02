const Pool = require('../../connectionDB')

const errorHandle = (error) => {
    return new Promise((resolve, reject) => {

        let codeError = 23505
        let fieldError = ''
        switch (error.constraint) {
            case 'login_email_key':
                fieldError = 'email'
                break;
            case 'login_username_key':
                fieldError = 'user name'
                break;

            default:
                fieldError = ''
                break;
        }
        Pool.query(`SELECT "messageError","messageErrorHebrow" FROM ERROR
                    WHERE "codeError" = $1`, [codeError],
            (err, response) => {

                if (err) reject(err)
                else {
                    let message = response.rows[0].messageError
                    const newMessage = message.replace(/_/g, fieldError);
                    resolve(newMessage)

                }
            })
    })
}

module.exports = errorHandle