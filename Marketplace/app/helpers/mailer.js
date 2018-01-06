var nodemailer = require('nodemailer'),
    config = require('../config')

module.exports.mailOptions = (email, token, type) => {
    var confirmation = {
        from: '"Marketplace" <projet.nadia1@gmail.com>',
        to: email,
        subject: 'Confirmation du compte',
        html: '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f5f8fa; min-width: 350px; font-size: 1px; line-height: normal;">' +
            '  <tr>' +
            '    <td align="center" valign="top">' +
            '      <!--[if (gte mso 9)|(IE)]>' +
            '        <table border="0" cellspacing="0" cellpadding="0">' +
            '          <tr>' +
            '            <td align="center" valign="top" width="750">' +
            '            <![endif]-->' +
            '            <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750"' +
            '            style="width: 100%; max-width: 750px; min-width: 350px; background: #f5f8fa;">' +
            '              <tr>' +
            '                <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;"> </td>' +
            '                <td align="center" valign="top" style="background: #ffffff;">' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f5f8fa;">' +
            '                    <tr>' +
            '                      <td align="right" valign="top">' +
            '                        <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="center" valign="top">' +
            '                        <div style="height: 40px; line-height: 40px; font-size: 38px;"> </div>' +
            '                        <a href="#"' +
            '                        style="display: block; max-width: 192px;">' +
            '                        </a>' +
            '                        <div class="top_pad2" style="height: 48px; line-height: 48px; font-size: 46px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top"> <font face="\'Source Sans Pro\', sans-serif" color="#1a1a1a" style="font-size: 52px; line-height: 54px; font-weight: 300; letter-spacing: -1.5px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 54px; font-weight: 300; letter-spacing: -1.5px;">Confirmez votre compte</span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 21px; line-height: 21px; font-size: 19px;"> </div> <font face="\'Source Sans Pro\', sans-serif" color="#000000" style="font-size: 20px; line-height: 28px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 20px; line-height: 28px;">' +
            '                              Bonjour,' +
            '                              </span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 6px; line-height: 6px; font-size: 4px;"> </div> <font face="\'Source Sans Pro\', sans-serif" color="#000000" style="font-size: 20px; line-height: 28px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 20px; line-height: 28px;">' +
            '                                Nous avons reçu une demande de création de compte sur marketplace.' +
            '                                Si cela est correct, confirmez en cliquant sur le bouton ci-dessous.' +
            '                              </span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 30px; line-height: 30px; font-size: 28px;"> </div>' +
            '                        <table class="mob_btn" cellpadding="0" cellspacing="0" border="0"' +
            '                        style="background: #6070E9; border-radius: 4px;">' +
            '                          <tr>' +
            '                            <td align="center" valign="top">' +
            '                              <a href="http://localhost:8080/confirmation/' + token + '"' +
            '                              target="_blank" style="display: block; border: 1px solid #6070E9; border-radius: 4px; padding: 19px 27px; font-family: \'Source Sans Pro\', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;"> <font face="\'Source Sans Pro\', sans-serif" color="#ffffff" style="font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">' +
            '               <span style="font-family: \'Source Sans Pro\', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">Confirmez votre e-mail</span>' +
            '            </font>' +
            '' +
            '                              </a>' +
            '                            </td>' +
            '                          </tr>' +
            '                        </table>' +
            '                        <div style="height: 90px; line-height: 90px; font-size: 88px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="90%" style="width: 90% !important; min-width: 90%; max-width: 90%; border-width: 1px; border-style: solid; border-color: #e8e8e8; border-bottom: none; border-left: none; border-right: none;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top">' +
            '                        <div style="height: 28px; line-height: 28px; font-size: 26px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top"> <font face="\'Source Sans Pro\', sans-serif" color="#7f7f7f" style="font-size: 17px; line-height: 23px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #7f7f7f; font-size: 17px; line-height: 23px;"> Support de marketplace - contact@marketplace.com</span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 30px; line-height: 30px; font-size: 28px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>'




    }

    var reset = {
        from: '"marketplace" <projet.nadia1@gmail.com>',
        to: email,
        subject: 'Réinitialisez votre mot de passe',
        html: '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f5f8fa; min-width: 350px; font-size: 1px; line-height: normal;">' +
            '  <tr>' +
            '    <td align="center" valign="top">' +
            '      <!--[if (gte mso 9)|(IE)]>' +
            '        <table border="0" cellspacing="0" cellpadding="0">' +
            '          <tr>' +
            '            <td align="center" valign="top" width="750">' +
            '            <![endif]-->' +
            '            <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750"' +
            '            style="width: 100%; max-width: 750px; min-width: 350px; background: #f5f8fa;">' +
            '              <tr>' +
            '                <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;"> </td>' +
            '                <td align="center" valign="top" style="background: #ffffff;">' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f5f8fa;">' +
            '                    <tr>' +
            '                      <td align="right" valign="top">' +
            '                        <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="center" valign="top">' +
            '                        <div style="height: 40px; line-height: 40px; font-size: 38px;"> </div>' +
            '                        <a href="#"' +
            '                        style="display: block; max-width: 192px;">' +
            '                        </a>' +
            '                        <div class="top_pad2" style="height: 48px; line-height: 48px; font-size: 46px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top"> <font face="\'Source Sans Pro\', sans-serif" color="#1a1a1a" style="font-size: 52px; line-height: 54px; font-weight: 300; letter-spacing: -1.5px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 54px; font-weight: 300; letter-spacing: -1.5px;">réinitialisez votre mot de passe</span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 21px; line-height: 21px; font-size: 19px;"> </div> <font face="\'Source Sans Pro\', sans-serif" color="#000000" style="font-size: 20px; line-height: 28px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 20px; line-height: 28px;">' +
            '                              Bonjour,' +
            '                              </span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 6px; line-height: 6px; font-size: 4px;"> </div> <font face="\'Source Sans Pro\', sans-serif" color="#000000" style="font-size: 20px; line-height: 28px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 20px; line-height: 28px;">' +
            '                                Nous avons reçu une demande de réinitialisation du mot de passe de compte sur marketplace.' +
            '                                Si cela est correct, confirmez en cliquant sur le bouton ci-dessous.' +
            '                              </span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 30px; line-height: 30px; font-size: 28px;"> </div>' +
            '                        <table class="mob_btn" cellpadding="0" cellspacing="0" border="0"' +
            '                        style="background: #6070E9; border-radius: 4px;">' +
            '                          <tr>' +
            '                            <td align="center" valign="top">' +
            '                              <a href="http://localhost:8080/reset/' + token + '"' +
            '                              target="_blank" style="display: block; border: 1px solid #6070E9; border-radius: 4px; padding: 19px 27px; font-family: \'Source Sans Pro\', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;"> <font face="\'Source Sans Pro\', sans-serif" color="#ffffff" style="font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">' +
            '               <span style="font-family: \'Source Sans Pro\', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 26px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">réinitialisez votre mot de passe</span>' +
            '            </font>' +
            '' +
            '                              </a>' +
            '                            </td>' +
            '                          </tr>' +
            '                        </table>' +
            '                        <div style="height: 90px; line-height: 90px; font-size: 88px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="90%" style="width: 90% !important; min-width: 90%; max-width: 90%; border-width: 1px; border-style: solid; border-color: #e8e8e8; border-bottom: none; border-left: none; border-right: none;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top">' +
            '                        <div style="height: 28px; line-height: 28px; font-size: 26px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>' +
            '                  <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">' +
            '                    <tr>' +
            '                      <td align="left" valign="top"> <font face="\'Source Sans Pro\', sans-serif" color="#7f7f7f" style="font-size: 17px; line-height: 23px;">' +
            '                              <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #7f7f7f; font-size: 17px; line-height: 23px;"> Support de marketplace - contact@marketplace.com</span>' +
            '                           </font>' +
            '' +
            '                        <div style="height: 30px; line-height: 30px; font-size: 28px;"> </div>' +
            '                      </td>' +
            '                    </tr>' +
            '                  </table>'

    }

    if (type === 'reset')
        return reset
    if (type === 'confirmation')
        return confirmation
}

module.exports.contact = (data) => {
    return {
        from: '"Marketplace" <projet.nadia1@gmail.com>',
        to: 'projet.nadia1@gmail.com',
        subject: data.titre,
        html: 'from : ' + data.email + '</br>' + data.message
    }


}

module.exports.create = () => {
    return nodemailer.createTransport(config.transporter)
}
