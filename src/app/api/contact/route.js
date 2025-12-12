import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Gmail credentials from Vercel
const SMTP_USER = process.env.SMTP_USER; // e.g. pax.pmn.1987@gmail.com
const SMTP_PASS = process.env.SMTP_PASS; // Gmail App Password

function createTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP_USER or SMTP_PASS");
    throw new Error("Email configuration error");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
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

      // ✅ NEW fields
      affiliationOrg,
      affiliationLocation,
      stayedDetails,
      requestedDates,
      groupSize,
    } = await request.json();

    // --- reCAPTCHA verification ---
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Verification system configuration error" },
        { status: 500 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Missing reCAPTCHA token" },
        { status: 400 }
      );
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(
          recaptchaToken
        )}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
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
    const DESTINATION = "info@houseoftheredeemer.org";

    const emailHtml = `
      <h2>New Contact Form Submission</h2>

      <h3>Contact</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>How they heard about us:</strong> ${heardAbout}</p>

      <h3>Experience</h3>
      <p><strong>Has stayed before:</strong> ${hasStayed ? "Yes" : "No"}</p>
      ${
        hasStayed
          ? `<p><strong>Stayed details:</strong> ${stayedDetails || "—"}</p>`
          : ""
      }

      <p><strong>Affiliated with church/non-profit:</strong> ${
        isAffiliated ? "Yes" : "No"
      }</p>
      ${
        isAffiliated
          ? `<p><strong>Affiliation:</strong> ${
              affiliationOrg || "—"
            } (${affiliationLocation || "—"})</p>`
          : ""
      }

      <h3>Interests</h3>
      <p><strong>Interested in:</strong> ${
        selectedInterests || "Not specified"
      }</p>

      <h3>Scheduling</h3>
      <p><strong>Requested dates:</strong> ${requestedDates || "—"}</p>
      <p><strong>Group size:</strong> ${groupSize || "—"}</p>

      <h3>Message</h3>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    // ✅ Debug verification in Vercel logs
    console.log("SMTP_USER seen by server:", SMTP_USER);

    const info = await transporter.sendMail({
      from: `"House of the Redeemer" <${SMTP_USER}>`,
      to: DESTINATION,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: emailHtml,
      envelope: {
        from: SMTP_USER,
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
