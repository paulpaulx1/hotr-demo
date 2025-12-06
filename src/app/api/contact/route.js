// app/api/contact/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Grab env vars at module scope so Next actually includes them
const SMTP_USER = process.env.SMTP_USER; // contact@houseoftheredeemer.org
const SMTP_PASS = process.env.SMTP_PASS; // mailbox password

function createTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP_USER or SMTP_PASS");
    throw new Error("Email configuration error");
  }

  return nodemailer.createTransport({
    host: "smtp.dreamhost.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // DreamHost cert is for *.dreamhost.com, this keeps Node from freaking out
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function POST(request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      heardAbout,
      hasStayed,
      isAffiliated,
      interests,
      message,
      recaptchaToken,
    } = await request.json();

    // --- reCAPTCHA verification ---
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Verification system configuration error" },
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.action === "error") {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // --- Format interests for email ---
    const selectedInterests = Object.entries(interests || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => {
        const interestMap = {
          groupRetreat: "Holding a group retreat at the House",
          overnight: "Staying overnight at the House",
          rentSpace: "Renting space at the House for my event",
          filmPhoto: "Film & photography at the House",
          other: "Other",
        };
        return interestMap[key] || key;
      })
      .join(", ");

    const transporter = createTransporter();

    const DESTINATION = "info@houseoftheredeemer.org"; // 👈 for now, send everything here

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>How they heard about us:</strong> ${heardAbout}</p>
      <p><strong>Has stayed before:</strong> ${hasStayed ? "Yes" : "No"}</p>
      <p><strong>Affiliated with church/non-profit:</strong> ${
        isAffiliated ? "Yes" : "No"
      }</p>
      <p><strong>Interested in:</strong> ${
        selectedInterests || "Not specified"
      }</p>
      <p><strong>Message:</strong></p>
      <p>${message?.replace(/\n/g, "<br/>")}</p>
    `;

    // For debugging in Vercel logs
    console.log("SMTP_USER seen by server:", SMTP_USER);

    const info = await transporter.sendMail({
      // What shows up in Natasha's inbox "from" line:
      from: `"House of the Redeemer" <${SMTP_USER}>`,
      // Where the email actually goes (for now)
      to: DESTINATION,
      // So you can just hit "reply" and respond to the person:
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: emailHtml,

      // What SMTP actually uses for MAIL FROM / RCPT TO:
      envelope: {
        from: SMTP_USER, // MUST be the DreamHost mailbox
        to: DESTINATION,
      },
    });

    console.log("Contact form email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process contact form" },
      { status: 500 }
    );
  }
}
