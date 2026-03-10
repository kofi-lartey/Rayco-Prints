// Mailjet Configuration - Uses environment variables
const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;

// Recipient email (your business email - where you receive orders)
const RECIPIENT_EMAIL = 'raycoprints@gmail.com';

// HTML Email Template - Order Form
const getEmailHtml = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background-color: #f0f2f5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { border: 0; outline: none; display: block; max-width: 100%; max-height: 300px; border-radius: 12px; margin: 0 auto; }
    @media screen and (max-width: 600px) {
      .wrapper { width: 100% !important; border-radius: 0 !important; }
      .column { display: block !important; width: 100% !important; padding: 0 !important; }
      .content-padding { padding: 25px 15px !important; }
      .mobile-btn { width: 100% !important; display: block !important; margin: 0 !important; }
    }
    a { text-decoration: none; }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#f0f2f5" cellspacing="0" cellpadding="0">
   <tr>
  <td align="center" style="padding:30px;background:#000;">
    <img src="https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png" 
         alt="Rayco Prints Logo" 
         style="max-height:80px;margin-bottom:15px;" />
    <div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:3px;text-transform:uppercase;">
      RAYCO PRINTS
    </div>
    <div style="font-size:10px;color:#ffcc00;margin-top:5px;letter-spacing:4px;font-weight:700;">
      PREMIUM PRINTING SERVICES
    </div>
  </td>
</tr>
          <tr>
            <td align="center" style="padding:12px;background:#fff9e6;border-bottom:1px solid #ffeeba;">
              <span style="font-size:11px;font-weight:700;color:#856404;text-transform:uppercase;">New Order Received</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;" class="content-padding">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="55%" class="column" valign="top">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;font-weight:700;">Client Details</p>
                    <p style="margin:5px 0 2px 0;font-size:18px;color:#1a1a1a;font-weight:700;">${data.name || 'N/A'}</p>
                    <p style="margin:0 0 20px 0;font-size:14px;color:#666;">${data.phone || 'N/A'} - ${data.email || 'N/A'}</p>
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;font-weight:700;">Specifications</p>
                    <p style="margin:8px 0 4px 0;font-size:14px;"><strong>Service:</strong> ${data.service || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Item:</strong> ${data.item || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Side:</strong> ${data.side || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Specs:</strong> ${data.color || 'N/A'} - ${data.pages || '1'} Pages</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Qty:</strong> ${data.quantity || '1'}</p>
                  </td>
                  <td width="45%" class="column" valign="top" align="right">
                    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;">Total Price</p>
                    <p style="margin:5px 0 25px 0;font-size:26px;font-weight:900;color:#1a1a1a;">GHC ${data.totalPrice || '0.00'}</p>
                    ${data.fileUrl ? `<a href="${data.fileUrl}" target="_blank" style="background:#007bff;color:#fff;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;">View Print File</a>` : ''}
                  </td>
                </tr>
              </table>
              <div style="background:#f0f7ff;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #cce5ff;text-align:left;">
                <p style="margin:0;font-size:11px;color:#004085;font-weight:700;text-transform:uppercase;">Payment and Billing</p>
                <p style="margin:5px 0 0 0;font-size:14px;color:#004085;"><strong>MoMo:</strong> 0246503887 (RaycoPrints)</p>
              </div>
              ${data.fileUrl ? `
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;text-align:center;">
                <p style="margin:0 0 5px 0;font-size:11px;color:#777;font-weight:700;text-transform:uppercase;">File</p>
                <a href="${data.fileUrl}" target="_blank" style="background:#007bff;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;display:inline-block;margin-bottom:5px;">View File</a>
                ${data.voiceUrl ? `
                <div style="background:#ffffff; border-radius:50px; padding:12px 20px; margin-top:20px; border:1px solid #eee; display:block;">
                  <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="30" valign="middle">
                        <a href="${data.voiceUrl}" target="_blank" style="text-decoration:none; font-size:22px;">▶️</a>
                      </td>
                      <td align="left" valign="middle" style="padding-left:10px;">
                        <p style="margin:0; font-size:12px; color:#666; font-weight:600;">Voice Note Recording</p>
                      </td>
                      <td align="right" valign="middle">
                        <a href="${data.voiceUrl}" target="_blank" style="background:#007bff; color:#ffffff; padding:6px 14px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase;">Play</a>
                      </td>
                    </tr>
                  </table>
                </div>
                ` : ''}
              </div>
              ` : ''}
              ${data.message ? `
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;">
                <p style="margin:0;font-size:11px;color:#999;font-weight:700;text-transform:uppercase;">Message:</p>
                <p style="margin:8px 0 0 0;font-size:14px;color:#444;line-height:1.6;font-style:italic;">${data.message}</p>
              </div>
              ` : ''}
              <div style="background:#fff3cd;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #ffeeba;text-align:center;">
                <p style="margin:0;font-size:14px;color:#856404;font-weight:700;">Questions about your order?</p>
                <p style="margin:10px 0 0 0;font-size:13px;color:#856404;">
                  Email us at <a href="mailto:raycoprints@gmail.com" style="color:#007bff;">raycoprints@gmail.com</a> or call us directly.
                </p>
              </div>
              <div style="margin-top:40px;border-top:2px solid #f0f2f5;padding-top:35px;text-align:center;">
                <p style="font-size:10px;color:#000;margin-bottom:20px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">One-Tap WhatsApp Updates</p>
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Good%20news!%20Your%20order%20is%20ready.%20Total:%20GHC%20${data.totalPrice || '0'}.%20Kindly%20pay%20via%20MoMo%20to%200246503887%20(RaycoPrints).%20Pickup%20at%20Prampram-New%20V-Pub." class="mobile-btn" style="background:#25d366;color:#fff;padding:18px 30px;border-radius:10px;font-weight:700;display:block;font-size:16px;margin-bottom:12px;box-shadow:0 4px 12px rgba(37,211,102,0.2);">Ready for Pickup (Pay)</a>
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Payment%20of%20GHC%20${data.totalPrice || '0'}%20Received.%20Thank%20you!%20Your%20package%20is%20at%20Prampram-New%20V-Pub." class="mobile-btn" style="background:#ffcc00;color:#000;padding:16px 30px;border-radius:10px;font-weight:700;display:block;font-size:14px;margin-bottom:25px;">Payment Received</a>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:30px;background:#fcfcfc;border-top:1px solid #eee;">
              <p style="margin:0;font-size:14px;font-weight:800;color:#1a1a1a;">RAYCO PRINTS STUDIO</p>
              <p style="margin:5px 0 0 0;font-size:12px;color:#666;">Prampram-NearV-Pub, Ghana</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

// HTML Email Template - Contact Form
const getContactEmailHtml = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background-color: #f0f2f5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { border: 0; outline: none; display: block; max-width: 100%; max-height: 300px; border-radius: 12px; margin: 0 auto; }
    @media screen and (max-width: 600px) {
      .wrapper { width: 100% !important; border-radius: 0 !important; }
      .column { display: block !important; width: 100% !important; padding: 0 !important; }
      .content-padding { padding: 25px 15px !important; }
    }
    a { text-decoration: none; }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#f0f2f5" cellspacing="0" cellpadding="0">
   <tr>
  <td align="center" style="padding:30px;background:#000;">
    <img src="https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png" 
         alt="Rayco Prints Logo" 
         style="max-height:80px;margin-bottom:15px;" />
    <div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:3px;text-transform:uppercase;">
      RAYCO PRINTS
    </div>
    <div style="font-size:10px;color:#ffcc00;margin-top:5px;letter-spacing:4px;font-weight:700;">
      PREMIUM PRINTING SERVICES
    </div>
  </td>
</tr>
          <tr>
            <td align="center" style="padding:12px;background:#e8f5e9;border-bottom:1px solid #c8e6c9;">
              <span style="font-size:11px;font-weight:700;color:#2e7d32;text-transform:uppercase;">New Contact Form Message</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;" class="content-padding">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="55%" class="column" valign="top">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;font-weight:700;">Sender Details</p>
                    <p style="margin:5px 0 2px 0;font-size:18px;color:#1a1a1a;font-weight:700;">${data.name || 'N/A'}</p>
                    <p style="margin:0 0 20px 0;font-size:14px;color:#666;">${data.phone || 'No phone'} - ${data.email || 'N/A'}</p>
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;font-weight:700;">Subject</p>
                    <p style="margin:5px 0 4px 0;font-size:14px;color:#1a1a1a;font-weight:600;">${data.subject || 'No subject'}</p>
                  </td>
                  <td width="45%" class="column" valign="top" align="right">
                    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;color:#888;">Quick Reply</p>
                    <a href="mailto:${data.email || ''}?subject=Re: ${encodeURIComponent(data.subject || 'Your inquiry')}" style="background:#007bff;color:#fff;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;margin-top:10px;text-decoration:none;">Reply via Email</a>
                    ${data.phone ? `
                    <a href="https://wa.me/${data.phone}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Thanks%20for%20contacting%20Rayco%20Prints!" style="background:#25d366;color:#fff;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;margin-top:10px;margin-left:8px;text-decoration:none;">WhatsApp</a>
                    ` : ''}
                  </td>
                </tr>
              </table>
              <div style="background:#f8f9fa;border-radius:12px;padding:25px;margin-top:25px;border:1px solid #edf0f2;">
                <p style="margin:0;font-size:11px;color:#999;font-weight:700;text-transform:uppercase;">Message:</p>
                <p style="margin:12px 0 0 0;font-size:14px;color:#444;line-height:1.7;">${data.message || 'No message'}</p>
              </div>
              <div style="background:#e3f2fd;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #bbdefb;text-align:center;">
                <p style="margin:0;font-size:14px;color:#1565c0;font-weight:700;">Need immediate assistance?</p>
                <p style="margin:10px 0 0 0;font-size:13px;color:#1565c0;">
                  Call us: <a href="tel:+233246504887" style="color:#007bff;font-weight:700;">+233 24 650 4887</a> or 
                  <a href="https://wa.me/233246504887" style="color:#25d366;font-weight:700;">WhatsApp</a>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:30px;background:#fcfcfc;border-top:1px solid #eee;">
              <p style="margin:0;font-size:14px;font-weight:800;color:#1a1a1a;">RAYCO PRINTS STUDIO</p>
              <p style="margin:5px 0 0 0;font-size:12px;color:#666;">Prampram-NearV-Pub, Ghana</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

exports.handler = async function (event) {
  try {
    const {
      name,
      email,
      phone,
      service,
      item,
      side,
      color,
      pages,
      quantity,
      totalPrice,
      fileUrl,
      voiceUrl,
      message
    } = JSON.parse(event.body);

    // Check if this is a contact form or order
    const isContactForm = service === 'Contact Form';

    // Check if credentials are configured
    if (!MAILJET_API_KEY || !MAILJET_API_SECRET || MAILJET_API_KEY === 'your_api_key_here') {
      console.log('Mailjet not configured, using fallback');
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: isContactForm ? 'Message saved but email not sent - Mailjet not configured' : 'Order saved but email not sent - Mailjet not configured',
          order: { name, email, phone, service }
        })
      };
    }

    // Select template based on form type
    const emailHtml = isContactForm
      ? getContactEmailHtml({
        name: name,
        email: email,
        phone: phone,
        subject: message?.split('\n\n')[0] || 'No subject',
        message: message?.split('\n\n').slice(1).join('\n\n') || message || ''
      })
      : getEmailHtml({
        name: name,
        email: email,
        phone: phone,
        service: service,
        item: item,
        side: side,
        color: color,
        pages: pages,
        quantity: quantity,
        totalPrice: totalPrice,
        message: message,
        fileUrl: fileUrl,
        voiceUrl: voiceUrl
      });

    // Set subject based on form type
    const emailSubject = isContactForm
      ? `Contact Form: ${name} - ${(message?.split('\n\n')[0] || 'New message').substring(0, 50)}`
      : `New Order: ${service || 'Printing Service'} - GHC ${totalPrice || '0.00'}`;

    // Initialize Mailjet using SMTP
    const mailjet = require('node-mailjet');
    
    // Log API key first few chars for debugging
    console.log('Using API key:', MAILJET_API_KEY ? MAILJET_API_KEY.substring(0, 8) + '...' : 'undefined');

    // Use SMTP connection for more reliable sending
    const smtpClient = mailjet.smtpconnect({
      host: 'in-v3.mailjet.com',
      port: 587,
      user: MAILJET_API_KEY,
      password: MAILJET_API_SECRET,
      tls: true
    });

    // Send email using SMTP
    const result = await smtpClient.send({
      from: 'Rayco Prints <raycoprints@gmail.com>',
      to: `Rayco Prints Admin <${RECIPIENT_EMAIL}>`,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml
    });

    console.log('Mailjet SMTP response:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    // Safely extract error information without causing circular JSON issues
    const errorInfo = {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode || error.response?.status,
      statusText: error.statusText
    };
    console.error('Mailjet email sending error:', errorInfo);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Order submitted but email notification may have failed',
        error: errorInfo.message
      })
    };
  }
};
