// Mailjet Configuration - Uses environment variables
const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET;

// Recipient email (your business email - where you receive orders)
const RECIPIENT_EMAIL = 'raycoprints@gmail.com';

// Admin email template (without payment details) - with WhatsApp buttons for admin
const getAdminEmailHtml = (data) => {
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
              
              {/* Voice Recording - shows if there's a voice note */}
              ${data.voiceUrl ? `
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;text-align:center;">
                <p style="margin:0 0 5px 0;font-size:11px;color:#777;font-weight:700;text-transform:uppercase;">Voice Note</p>
                <div style="background:#ffffff; border-radius:50px; padding:12px 20px; margin-top:10px; border:1px solid #eee; display:inline-block;">
                  <table cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="30" valign="middle">
                        <a href="${data.voiceUrl}" target="_blank" style="text-decoration:none; font-size:22px;">▶️</a>
                      </td>
                      <td align="left" valign="middle" style="padding-left:10px;">
                        <p style="margin:0; font-size:12px; color:#666; font-weight:600;">Play Voice Note</p>
                      </td>
                      <td align="right" valign="middle" style="padding-left:15px;">
                        <a href="${data.voiceUrl}" target="_blank" style="background:#007bff; color:#ffffff; padding:6px 14px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase;">Play</a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              ` : ''}
              
              {/* File Upload - shows if there's a file */}
              ${data.fileUrl ? `
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;text-align:center;">
                <p style="margin:0 0 5px 0;font-size:11px;color:#777;font-weight:700;text-transform:uppercase;">File</p>
                <a href="${data.fileUrl}" target="_blank" style="background:#007bff;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;display:inline-block;margin-bottom:5px;">View File</a>
              </div>
              ` : ''}
              ${data.message ? `
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;">
                <p style="margin:0;font-size:11px;color:#999;font-weight:700;text-transform:uppercase;">Message:</p>
                <p style="margin:8px 0 0 0;font-size:14px;color:#444;line-height:1.6;font-style:italic;">${data.message}</p>
              </div>
              ` : ''}
              
              <div style="margin-top:40px;border-top:2px solid #f0f2f5;padding-top:35px;text-align:center;">
                <p style="font-size:10px;color:#000;margin-bottom:20px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">Quick WhatsApp Actions</p>
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Good%20news!%20Your%20order%20is%20received.%20We'll%20notify%20you%20when%20it's%20ready!" class="mobile-btn" style="background:#25d366;color:#fff;padding:18px 30px;border-radius:10px;font-weight:700;display:block;font-size:16px;margin-bottom:12px;box-shadow:0 4px 12px rgba(37,211,102,0.2);">Order Received</a>
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Good%20news!%20Your%20order%20is%20ready.%20Total:%20GHC%20${data.totalPrice || '0'}.%20Kindly%20pay%20via%20MoMo%20to%200530422097%20(RAYCO%20GRAPHIX%20%26%20SEC%20SERV).%20Pickup%20at%20Prampram-New%20V-Pub." class="mobile-btn" style="background:#ffcc00;color:#000;padding:16px 30px;border-radius:10px;font-weight:700;display:block;font-size:14px;margin-bottom:12px;">Ready for Pickup (Pay)</a>
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Payment%20of%20GHC%20${data.totalPrice || '0'}%20Received.%20Thank%20you!%20Your%20package%20is%20ready%20for%20pickup%20at%20Prampram-New%20V-Pub." class="mobile-btn" style="background:#007bff;color:#fff;padding:16px 30px;border-radius:10px;font-weight:700;display:block;font-size:14px;margin-bottom:25px;">Payment Received</a>
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
</body>
</html>`;
};

// Customer email template (WITH payment details)
const getCustomerEmailHtml = (data) => {
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
            <td align="center" style="padding:12px;background:#d4edda;border-bottom:1px solid #c3e6cb;">
              <span style="font-size:11px;font-weight:700;color:#155724;text-transform:uppercase;">✓ Order Confirmed</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;" class="content-padding">
              <p style="margin:0;font-size:18px;color:#1a1a1a;font-weight:700;">Hi ${data.name || 'there'}!</p>
              <p style="margin:15px 0;font-size:14px;color:#666;line-height:1.6;">
                Thank you for your order! We've received your request and will start working on it right away.
              </p>
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="55%" class="column" valign="top">
                    <p style="margin:0;font-size:11px;color:#888;text-transform:uppercase;font-weight:700;">Your Order</p>
                    <p style="margin:8px 0 4px 0;font-size:14px;"><strong>Service:</strong> ${data.service || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Item:</strong> ${data.item || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Side:</strong> ${data.side || 'N/A'}</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Specs:</strong> ${data.color || 'N/A'} - ${data.pages || '1'} Pages</p>
                    <p style="margin:0 0 4px 0;font-size:14px;"><strong>Qty:</strong> ${data.quantity || '1'}</p>
                  </td>
                  <td width="45%" class="column" valign="top" align="right">
                    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;">Total Price</p>
                    <p style="margin:5px 0 25px 0;font-size:26px;font-weight:900;color:#1a1a1a;">GHC ${data.totalPrice || '0.00'}</p>
                  </td>
                </tr>
              </table>
              
              <div style="background:#fff3cd;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #ffeeba;text-align:center;">
                <p style="margin:0;font-size:14px;color:#856404;font-weight:700;">Payment Details</p>
                <p style="margin:10px 0 5px 0;font-size:13px;color:#856404;">
                  <strong>MERCHANT DETAILS</strong><br/>
                  Name: RAYCO GRAPHIX & SEC SERV<br/>
                  ID: 949406
                </p>
                <p style="margin:10px 0 5px 0;font-size:13px;color:#856404;">
                  Please pay via MoMo to <strong>0530422097</strong>
                </p>
                <img src="https://res.cloudinary.com/djjgkezui/image/upload/v1773607156/IMG-20260315-WA0076_r6ynqg.jpg" 
                     alt="Payment QR Code" 
                     style="max-width:200px;max-height:200px;border-radius:8px;margin-top:10px;" />
              </div>
              
              <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #edf0f2;text-align:center;">
                <p style="margin:0;font-size:14px;color:#666;font-weight:700;">Pickup Location</p>
                <p style="margin:10px 0 0 0;font-size:14px;color:#1a1a1a;">Prampram-Near V-Pub, Ghana</p>
              </div>
              
              <div style="background:#fff3cd;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #ffeeba;text-align:center;">
                <p style="margin:0;font-size:14px;color:#856404;font-weight:700;">Questions about your order?</p>
                <p style="margin:10px 0 0 0;font-size:13px;color:#856404;">
                  Email us at <a href="mailto:raycoprints@gmail.com" style="color:#007bff;">raycoprints@gmail.com</a> or call us directly.
                </p>
              </div>
              
              <div style="background:#ffc107;border-radius:12px;padding:20px;margin-top:25px;border:1px solid #ffc107;text-align:center;">
                <p style="margin:0;font-size:14px;color:#000;font-weight:700;">⚠️ Check Your Spam Folder</p>
                <p style="margin:10px 0 0 0;font-size:13px;color:#333;">
                  If you don't see this email in your inbox, please check your spam/junk folder and mark it as "Not Spam" to ensure future emails from us go to your inbox.
                </p>
                <p style="margin:15px 0 0 0;font-size:12px;color:#666;">
                  <strong>Tip:</strong> Add <a href="mailto:raycoprints@gmail.com" style="color:#007bff;">raycoprints@gmail.com</a> to your contacts to never miss an update!
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
</body>
</html>`;
};

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
                <p style="margin:5px 0 0 0;font-size:14px;color:#004085;"><strong>MoMo:</strong> 0530422097 (RAYCO GRAPHIX & SEC SERV)</p>
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
                <a href="https://wa.me/${data.phone || ''}?text=Hi%20${encodeURIComponent(data.name || '')}!%20Good%20news!%20Your%20order%20is%20ready.%20Total:%20GHC%20${data.totalPrice || '0'}.%20Kindly%20pay%20via%20MoMo%20to%200530422097%20(RAYCO%20GRAPHIX%20%26%20SEC%20SERV).%20Pickup%20at%20Prampram-New%20V-Pub." class="mobile-btn" style="background:#25d366;color:#fff;padding:18px 30px;border-radius:10px;font-weight:700;display:block;font-size:16px;margin-bottom:12px;box-shadow:0 4px 12px rgba(37,211,102,0.2);">Ready for Pickup (Pay)</a>
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
                  Call us: <a href="tel:+233530422097" style="color:#007bff;font-weight:700;">+233 53 042 2097</a> or 
                  <a href="https://wa.me/233530422097" style="color:#25d366;font-weight:700;">WhatsApp</a>
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

    // Debug log
    console.log('Order received:', { name, email, phone, service, item, fileUrl, voiceUrl });

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
    // For orders: send admin version (no payment) to admin, customer version (with payment) to customer
    const adminEmailHtml = isContactForm
      ? getContactEmailHtml({
          name: name,
          email: email,
          phone: phone,
          subject: message?.split('\n\n')[0] || 'No subject',
          message: message?.split('\n\n').slice(1).join('\n\n') || message || ''
        })
      : getAdminEmailHtml({
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

    const customerEmailHtml = isContactForm
      ? getContactEmailHtml({
          name: name,
          email: email,
          phone: phone,
          subject: message?.split('\n\n')[0] || 'No subject',
          message: message?.split('\n\n').slice(1).join('\n\n') || message || ''
        })
      : getCustomerEmailHtml({
          name: name,
          email: email,
          phone: phone,
          service: service,
          item: item,
          side: side,
          color: color,
          pages: pages,
          quantity: quantity,
          totalPrice: totalPrice
        });

    // Set subject based on form type
    const emailSubject = isContactForm
      ? `Contact Form: ${name} - ${(message?.split('\n\n')[0] || 'New message').substring(0, 50)}`
      : `New Order: ${service || 'Printing Service'} - GHC ${totalPrice || '0.00'}`;

    // Send email using nodemailer with Mailjet SMTP
    const nodemailer = require('nodemailer');
    
    // Log API key first few chars for debugging
    console.log('Using API key:', MAILJET_API_KEY ? MAILJET_API_KEY.substring(0, 8) + '...' : 'undefined');

    // Create transporter for Mailjet
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false,
      auth: {
        user: MAILJET_API_KEY,
        pass: MAILJET_API_SECRET
      }
    });

    // Email headers to help avoid spam
    const commonHeaders = {
      'X-Mailer': 'Rayco Prints',
      'X-Priority': '1',
      'List-Unsubscribe': '<mailto:unsubscribe@raycoprints@gmail.com>'
    };

    // Send email to admin (you) - NO payment details
    const adminMailOptions = {
      from: `${name || 'Customer'} <raycoprints@gmail.com>`,
      to: RECIPIENT_EMAIL, // raycoprints@gmail.com
      replyTo: email, // Customer's email so you can reply directly
      subject: emailSubject,
      html: adminEmailHtml,
      headers: commonHeaders
    };

    // Send confirmation email to customer - WITH payment details
    const customerMailOptions = {
      from: 'Rayco Prints <raycoprints@gmail.com>',
      to: email, // Customer's email from the order form
      subject: isContactForm ? `Re: ${emailSubject}` : `Order Confirmed - GHC ${totalPrice || '0.00'}`,
      html: customerEmailHtml,
      headers: commonHeaders
    };

    // Send both emails
    const [adminResult, customerResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log('Admin email sent:', adminResult.messageId);
    console.log('Customer email sent:', customerResult.messageId);

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
