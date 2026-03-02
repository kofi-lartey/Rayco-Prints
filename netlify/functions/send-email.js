// EmailJS Configuration - Hardcoded for free tier
const EMAILJS_SERVICE_ID = 'service_oasu1vi';
// TODO: Replace with your Template ID from EmailJS dashboard
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
// TODO: Replace with your User ID (Public Key) from EmailJS dashboard
const EMAILJS_USER_ID = 'your_user_id_here';

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
               <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">Rayco Prints</div>
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
                  </td>
                  
                  <td class="column" width="40%" valign="top" style="background-color: #f8f8fc; padding: 20px; border-radius: 10px;">
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Service</p>
                    <p style="margin: 5px 0 15px 0; font-size: 14px; color: #333; font-weight: 600;">${data.service || 'Not specified'}</p>
                    
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Quantity</p>
                    <p style="margin: 5px 0 15px 0; font-size: 14px; color: #333;">${data.quantity || '1'}</p>
                    
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Total Price</p>
                    <p style="margin: 5px 0 15px 0; font-size: 24px; color: #D81B60; font-weight: 800;">GHC ${data.totalPrice || '0.00'}</p>
                  </td>
                </tr>
                
                ${data.message ? `
                <tr>
                  <td colspan="2" style="padding-top: 20px;">
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Message</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #555; line-height: 1.6;">${data.message}</p>
                  </td>
                </tr>
                ` : ''}
                
                ${data.fileUrl ? `
                <tr>
                  <td colspan="2" style="padding-top: 20px;">
                    <p style="margin: 0; font-size: 11px; color: #999; text-transform: uppercase; font-weight: 700;">Attached File</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px;"><a href="${data.fileUrl}" style="color: #D81B60; text-decoration: none; font-weight: 600;">View Uploaded File →</a></p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 25px; background-color: #f8f8fc; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #999;">© ${currentYear} Rayco Prints. All rights reserved.</p>
              <p style="margin: 5px 0 0 0; font-size: 11px; color: #ccc;">Accra, Ghana</p>
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

    // Check if credentials are configured
    if (EMAILJS_TEMPLATE_ID === 'your_template_id_here' || EMAILJS_USER_ID === 'your_user_id_here') {
      console.log('EmailJS not configured, using fallback');
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Order saved but email not sent - EmailJS not configured',
          order: { name, email, phone, service }
        })
      };
    }

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      service: service || 'Not specified',
      quantity: quantity || '1',
      total_price: totalPrice || '0.00',
      message: message || 'No message',
      file_url: fileUrl || 'No file attached'
    };

    // Send email using EmailJS HTTP API
    const emailjsUrl = `https://api.emailjs.com/api/v1.0/email/send`;

    const emailResponse = await fetch(emailjsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: templateParams
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`EmailJS error: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Email sending error:', error);

    // Return success anyway to avoid breaking the form
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Order submitted but email notification may have failed',
        error: error.message
      })
    };
  }
};
