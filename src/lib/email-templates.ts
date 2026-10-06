export function getEarlyAccessEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SeeThePrep</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f9fc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td align="center" style="padding: 48px 40px 0;">
              <div style="font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #111827;">SeeThePrep</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 40px 32px;">
              <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 800; color: #111827; letter-spacing: -0.5px;">Welcome to Early Access!</h1>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4b5563;">
                Hi ${name},<br><br>
                Thank you for reserving your spot! You're now officially on the exclusive early access list for SeeThePrep.
              </p>
              <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #4b5563;">
                We're building something completely new for the food delivery space — bringing you inside the kitchens of your favorite restaurants. You'll be the first to know when we launch in your area, and you'll get access to exclusive early offers.
              </p>
              <a href="https://seetheprep.com" style="display: inline-block; background-color: #111827; color: #ffffff; font-weight: 600; font-size: 16px; text-decoration: none; padding: 16px 32px; border-radius: 99px;">Visit SeeThePrep</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 32px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">
                Best regards,<br>
                <strong>The SeeThePrep Team</strong>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 24px 0 0; font-size: 13px; color: #94a3b8; text-align: center;">
          © ${new Date().getFullYear()} SeeThePrep. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getPartnerApplicationHtml(data: {
  businessName: string;
  businessAddress: string;
  businessType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Partner Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <tr>
            <td style="background-color: #111827; padding: 32px 40px; border-bottom: 4px solid #3b82f6;">
              <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af; font-weight: 700; margin-bottom: 8px;">SeeThePrep</div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">New Partner Application</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
                <h2 style="margin: 0 0 20px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">🏢 Business Details</h2>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Name</td>
                    <td width="70%" style="padding: 10px 0; color: #0f172a; font-size: 16px; font-weight: 600;">${data.businessName}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Type</td>
                    <td width="70%" style="padding: 10px 0; color: #0f172a; font-size: 16px; font-weight: 600; text-transform: capitalize;">${data.businessType}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Address</td>
                    <td width="70%" style="padding: 10px 0; color: #0f172a; font-size: 16px; font-weight: 600;">${data.businessAddress}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
                <h2 style="margin: 0 0 20px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">👤 Owner Details</h2>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Name</td>
                    <td width="70%" style="padding: 10px 0; color: #0f172a; font-size: 16px; font-weight: 600;">${data.firstName} ${data.lastName}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Email</td>
                    <td width="70%" style="padding: 10px 0; color: #2563eb; font-size: 16px; font-weight: 600;">
                      <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" style="padding: 10px 0; color: #64748b; font-size: 15px; font-weight: 500;">Phone</td>
                    <td width="70%" style="padding: 10px 0; color: #2563eb; font-size: 16px; font-weight: 600;">
                      <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">This application was submitted via the SeeThePrep partner form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
