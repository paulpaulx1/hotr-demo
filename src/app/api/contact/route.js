import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // -----------------------------
    // 1) VERIFY RECAPTCHA
    // -----------------------------
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration: RECATCHA key missing" },
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // -----------------------------
    // 2) FORMAT INTERESTS
    // -----------------------------
    const interestLabels = {
      groupRetreat: "Holding a group retreat at the House",
      overnight: "Staying overnight at the House",
      rentSpace: "Renting space for an event",
      filmPhoto: "Film & photography",
      other: "Other",
    };

    const selectedInterests = Object.entries(interests)
      .filter(([_, v]) => v)
      .map(([k]) => interestLabels[k])
      .join(", ");

    // -----------------------------
    // 3) SMTP TRANSPORT (DreamHost)
    // -----------------------------
    const transporter = nodemailer.createTransport({
      host: "mail.houseoftheredeemer.org",
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOTR_SMTP_USER, // contact@houseoftheredeemer.org
        pass: process.env.HOTR_SMTP_PASS,
      },
    });

    // -----------------------------
    // 4) SEND EMAIL
    // -----------------------------
    await transporter.sendMail({
      from: `"House of the Redeemer" <${process.env.HOTR_SMTP_USER}>`,
      to: "paulmneenan@gmail.com", // Nancy or staff inbox
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New Inquiry from the Website</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>How they heard about the House:</strong> ${heardAbout}</p>
        <p><strong>Stayed before:</strong> ${hasStayed ? "Yes" : "No"}</p>
        <p><strong>Affiliated with church/non-profit:</strong> ${isAffiliated ? "Yes" : "No"}</p>
        <p><strong>Interests:</strong> ${selectedInterests}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Server error while sending message." },
      { status: 500 }
    );
  }
}
