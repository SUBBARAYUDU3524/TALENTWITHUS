/* eslint-disable max-len */
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const { initializeApp } = require("firebase-admin/app");
const nodemailer = require("nodemailer");

initializeApp();

// All functions deploy to asia-south1 (Mumbai)
setGlobalOptions({ region: "asia-south1" });

// ─── Zoho SMTP config ────────────────────────────────────────────────────────
// Set these in Firebase environment config:
//   firebase functions:secrets:set ZOHO_USER
//   firebase functions:secrets:set ZOHO_PASS
//   firebase functions:secrets:set ADMIN_EMAIL
const FROM_NAME = "TalentWithUs";
const FROM_EMAIL = process.env.ZOHO_USER || "info@talentwithus.com";
const ZOHO_PASS = process.env.ZOHO_PASS;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@talentwithus.com";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: { user: FROM_EMAIL, pass: ZOHO_PASS },
  });
}

// ─── Email templates ─────────────────────────────────────────────────────────

function baseLayout(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>TalentWithUs</title>
</head>
<body style="margin:0;padding:0;background:#0A0A14;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A14;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#6366F1,#4F46E5);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">TalentWithUs</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:4px;letter-spacing:1px;text-transform:uppercase;">Digital Solutions</div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#0F0F1E;padding:40px;border-left:1px solid rgba(99,102,241,0.15);border-right:1px solid rgba(99,102,241,0.15);">
          ${content}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#080812;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;border:1px solid rgba(99,102,241,0.12);border-top:none;">
          <p style="margin:0 0 8px;font-size:12px;color:#64748B;">© ${new Date().getFullYear()} TalentWithUs. All rights reserved.</p>
          <p style="margin:0;font-size:12px;color:#475569;">
            <a href="https://talentwithus.com" style="color:#818CF8;text-decoration:none;">talentwithus.com</a>
            &nbsp;·&nbsp;
            <a href="mailto:info@talentwithus.com" style="color:#818CF8;text-decoration:none;">info@talentwithus.com</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function heading(text) {
  return `<h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#F1F5F9;letter-spacing:-0.5px;">${text}</h1>`;
}

function subtext(text) {
  return `<p style="margin:0 0 28px;font-size:14px;color:#64748B;">${text}</p>`;
}

function divider() {
  return "<div style=\"height:1px;background:rgba(99,102,241,0.18);margin:28px 0;\"></div>";
}

function field(label, value) {
  return `
  <div style="margin-bottom:16px;">
    <div style="font-size:11px;font-weight:600;color:#6366F1;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">${label}</div>
    <div style="font-size:14px;color:#CBD5E1;background:#0A0A14;border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:12px 14px;line-height:1.6;">${value || "—"}</div>
  </div>`;
}

function ctaButton(text, href) {
  return `
  <div style="text-align:center;margin:32px 0 0;">
    <a href="${href}" style="display:inline-block;background:linear-gradient(135deg,#6366F1,#4F46E5);color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.2px;">
      ${text}
    </a>
  </div>`;
}

function confirmationIntro(name, subject) {
  return `
  ${heading(`Hi ${name}, we've received your ${subject}! 🎉`)}
  ${subtext("We'll review it and get back to you shortly. Here's a copy of what you submitted:")}`;
}

function adminIntro(subject) {
  return `${heading(`New ${subject}`)}${subtext("A new submission has arrived. Details below:")}`;
}

// ─── 1. Contact Form ─────────────────────────────────────────────────────────

exports.onContactSubmission = onDocumentCreated(
  { document: "contactSubmissions/{id}", secrets: ["ZOHO_USER", "ZOHO_PASS", "ADMIN_EMAIL"] },
  async (event) => {
    const data = event.data.data();
    if (!data) return;
    const { name, email, subject, message } = data;
    const transporter = createTransporter();

    // Email to admin
    const adminHtml = baseLayout(`
      ${adminIntro("Contact Form Submission")}
      ${field("From", `${name} &lt;${email}&gt;`)}
      ${field("Subject", subject)}
      ${field("Message", message)}
      ${divider()}
      ${ctaButton("Reply to " + name, `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`)}
    `);

    // Confirmation to user
    const userHtml = baseLayout(`
      ${confirmationIntro(name, "message")}
      ${field("Subject", subject)}
      ${field("Message", message)}
      ${divider()}
      <p style="font-size:14px;color:#94A3B8;line-height:1.7;margin:0;">
        We typically respond within <strong style="color:#818CF8;">24 hours</strong> on business days.
        For urgent matters, call us directly at <a href="tel:+917799470104" style="color:#818CF8;text-decoration:none;">+91 77994 70104</a>.
      </p>
      ${ctaButton("Visit Our Website", "https://talentwithus.com")}
    `);

    await Promise.all([
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `📩 New Contact: ${subject}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: email,
        subject: "We received your message — TalentWithUs",
        html: userHtml,
      }),
    ]);
  },
);

// ─── 2. Talent / Partnership Applications ────────────────────────────────────

exports.onTalentApplication = onDocumentCreated(
  { document: "talentApplications/{id}", secrets: ["ZOHO_USER", "ZOHO_PASS", "ADMIN_EMAIL"] },
  async (event) => {
    const data = event.data.data();
    if (!data) return;
    const { name, email, role, portfolio, message } = data;
    const transporter = createTransporter();

    const adminHtml = baseLayout(`
      ${adminIntro("Talent Program Application")}
      ${field("Applicant", `${name} &lt;${email}&gt;`)}
      ${field("Role Applied For", role)}
      ${field("Portfolio / GitHub", portfolio ? `<a href="${portfolio}" style="color:#818CF8;">${portfolio}</a>` : "Not provided")}
      ${field("About Themselves", message)}
      ${divider()}
      ${ctaButton("Contact " + name, `mailto:${email}?subject=Your TalentWithUs Application`)}
    `);

    const userHtml = baseLayout(`
      ${confirmationIntro(name, "application")}
      ${field("Role", role)}
      ${field("Portfolio", portfolio || "Not provided")}
      ${field("Message", message)}
      ${divider()}
      <p style="font-size:14px;color:#94A3B8;line-height:1.7;margin:0;">
        Our team reviews applications within <strong style="color:#818CF8;">5 business days</strong>.
        If your profile is a match, we'll schedule a quick call to discuss next steps.
      </p>
      ${ctaButton("Explore Opportunities", "https://talentwithus.com/talentprogram")}
    `);

    await Promise.all([
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `🚀 New Talent Application — ${role} — ${name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: email,
        subject: "Application received — TalentWithUs Partnership Program",
        html: userHtml,
      }),
    ]);
  },
);

// ─── 3. Service Inquiry ──────────────────────────────────────────────────────

exports.onServiceInquiry = onDocumentCreated(
  { document: "serviceInquiries/{id}", secrets: ["ZOHO_USER", "ZOHO_PASS", "ADMIN_EMAIL"] },
  async (event) => {
    const data = event.data.data();
    if (!data) return;
    const { name, email, company, phone, service, budget, timeline, details } = data;
    const transporter = createTransporter();

    const adminHtml = baseLayout(`
      ${adminIntro("Service Inquiry")}
      ${field("Contact", `${name} &lt;${email}&gt;`)}
      ${field("Company", company)}
      ${field("Phone", phone)}
      ${field("Service Requested", service)}
      ${field("Budget Range", budget)}
      ${field("Timeline", timeline)}
      ${field("Project Details", details)}
      ${divider()}
      ${ctaButton("Reply to " + name, `mailto:${email}?subject=Re: Your ${service} Inquiry`)}
    `);

    const userHtml = baseLayout(`
      ${confirmationIntro(name, "service inquiry")}
      ${field("Service", service)}
      ${field("Budget", budget)}
      ${field("Timeline", timeline)}
      ${field("Details", details)}
      ${divider()}
      <p style="font-size:14px;color:#94A3B8;line-height:1.7;margin:0;">
        A dedicated solutions consultant will review your inquiry and reach out within
        <strong style="color:#818CF8;">1 business day</strong> with a tailored proposal.
      </p>
      ${ctaButton("View Our Services", "https://talentwithus.com/services")}
    `);

    await Promise.all([
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `💼 Service Inquiry — ${service} — ${name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: email,
        subject: "Your inquiry is with us — TalentWithUs",
        html: userHtml,
      }),
    ]);
  },
);

// ─── 4. Open Application (Career page) ──────────────────────────────────────

exports.onOpenApplication = onDocumentCreated(
  { document: "openApplications/{id}", secrets: ["ZOHO_USER", "ZOHO_PASS", "ADMIN_EMAIL"] },
  async (event) => {
    const data = event.data.data();
    if (!data) return;
    const { name, email, role, message } = data;
    const transporter = createTransporter();

    const adminHtml = baseLayout(`
      ${adminIntro("Open Career Application")}
      ${field("Applicant", `${name} &lt;${email}&gt;`)}
      ${field("Desired Role", role || "Open / Not specified")}
      ${field("Cover Note", message)}
      ${divider()}
      ${ctaButton("Reply to " + name, `mailto:${email}?subject=Your Application at TalentWithUs`)}
    `);

    const userHtml = baseLayout(`
      ${confirmationIntro(name, "application")}
      ${field("Desired Role", role || "Open")}
      ${field("Your Note", message)}
      ${divider()}
      <p style="font-size:14px;color:#94A3B8;line-height:1.7;margin:0;">
        We review open applications regularly and will be in touch if we see a strong fit.
        Feel free to follow us on LinkedIn for the latest opportunities.
      </p>
      ${ctaButton("View Open Positions", "https://talentwithus.com/career")}
    `);

    await Promise.all([
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `👤 Open Application — ${name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: email,
        subject: "We got your application — TalentWithUs",
        html: userHtml,
      }),
    ]);
  },
);
