const mailjet = require('node-mailjet');

// HTML Email Template matching the user's design
const getEmailHtml = (data) => {
    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background-color: #f4f4f7; -webkit-font-smoothing: antialiased; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; display: block; }
    @media screen and (max-width: 600px) {
      .wrapper { width: 100% !important; border-radius: 0 !important; }
      .column { display: block !important; width: 100% !important; padding: 0 !important; }
      .content-padding { padding: 25px 20px !important; }
      .mobile-btn { width: 100% !important; box-sizing: border-box; }
    }
  </style>
</head>
<body style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        
        <table width="600" border="0" cellspacing="0" cellpadding="0" class="wrapper" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          
          <tr>
            <td align="center" style="padding: 35px; background-color: #1a1a1a;">
               <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">Girlies Luxe | Print Hub</div>
               <div style="font-size: 11px; color: #D81B60; margin-top: 5px; letter-spacing: 2px; font-weight: 700;">NEW ORDER REQUEST</div>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;" class="content-padding">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="column" width="60%" valign="top">
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Customer</p>
                    <p style="margin: 5px 0 20px 0; font-size: 18px; color: #333; font-weight: 700;">${data.name}</p>
                    
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Email</p>
                    <p style="margin: 5px 0 20px 0; font-size: 14px; color: #555;">${data.email}</p>
                    
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Phone</p>
                    <p style="margin: 5px 0 20px 0; font-size: 14px; color: #555;">${data.phone || 'Not provided'}</p>
                    
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Service Details</p>
                    <p style="margin: 5px 0 5px 0; font-size: 15px; color: #555;"><strong>${data.service}</strong></p>
                    <p style="margin: 0; font-size: 14px; color: #777;">${data.pages || '1'} Pages • ${data.color || 'N/A'} • ${data.quantity || '1'} Qty</p>
                  </td>
                  <td class="column" width="40%" valign="top" align="right" style="text-align: right;">
                    <p style="margin: 0; font-size: 11px; color: #D81B60; text-transform: uppercase; font-weight: 700;">Order Total</p>
                    <p style="margin: 520px 0px 0 ; font-size: 24px; color: #1a1a1a; font-weight: 900;">GHC ${data.totalPrice || '0'}</p>
                    
                    ${data.fileUrl && data.fileUrl !== 'No file uploaded' ? `
                    <a href="${data.fileUrl}" target="_blank" style="background-color: #f0f4ff; color: #4285F4; padding: 8px 15px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 700; display: inline-block;">📥 Download File</a>
                    ` : '<p style="font-size: 12px; color: #999;">No file uploaded</p>'}
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <div style="background-color: #f9f9fb; border-radius: 12px; padding: 20px; margin-top: 25px; border-left: 4px solid #eee;">
                <p style="margin: 0; font-size: 12px; color: #999; font-weight: 700; text-transform: uppercase;">Customer Note:</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #444; line-height: 1.6; font-style: italic;">"${data.message}"</p>
              </div>
              ` : ''}

            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 30px; background-color: #fafafa; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #333;">Girlies Luxe Studio</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #777;">Nungua Kantamato, Accra, Ghana</p>
            </td>
          </tr>

        </table>

        <table width="600" border="0" cellspacing="0" cellpadding="0" class="wrapper">
          <tr>
            <td style="padding: 25px; text-align: center; color: #bbb; font-size: 11px;">
              AUTOMATED PRINT ORDER SYSTEM | © ${currentYear}
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

exports.handler = async function (event) {
    try {
        const {
            name,
            email,
            phone,
            service,
            color,
            pages,
            quantity,
            totalPrice,
            fileUrl,
            message
        } = JSON.parse(event.body);

        const mj = mailjet.apiConnect(
            process.env.MJ_APIKEY_PUBLIC,
            process.env.MJ_APIKEY_PRIVATE
        );

        const emailHtml = getEmailHtml({
            name,
            email,
            phone,
            service,
            color,
            pages,
            quantity,
            totalPrice,
            fileUrl,
            message
        });

        await mj.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.FROM_EMAIL || "orders@raycographix.com",
                        Name: "Rayco Prints | Print Hub"
                    },
                    To: [
                        {
                            Email: process.env.TO_EMAIL || "orders@raycographix.com"
                        }
                    ],
                    Subject: `New Order: ${service} - GHC ${totalPrice || '0'}`,
                    HTMLPart: emailHtml
                }
            ]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" })
        };

    } catch (error) {
        console.error('Email error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send email", details: error.message })
        };
    }
};
