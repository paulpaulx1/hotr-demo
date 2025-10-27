import { NextResponse } from "next/server";

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

    // Verify reCAPTCHA
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Verification system configuration error" },
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Format interests for email
    const selectedInterests = Object.entries(interests)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => {
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

    // Here you would typically send an email using a service like SendGrid, Resend, or Nodemailer
    // For now, we'll just log the data and return success
    console.log("Contact form submission:", {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      heardAbout,
      hasStayed,
      isAffiliated,
      interests: selectedInterests,
      message,
    });

    // Example with Resend (you'd need to install and configure it)
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@houseoftheredeemer.org',
      to: 'info@houseoftheredeemer.org',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>How they heard about us:</strong> ${heardAbout}</p>
        <p><strong>Has stayed before:</strong> ${hasStayed ? 'Yes' : 'No'}</p>
        <p><strong>Affiliated with church/non-profit:</strong> ${isAffiliated ? 'Yes' : 'No'}</p>
        <p><strong>Interested in:</strong> ${selectedInterests}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process contact form" },
      { status: 500 }
    );
  }
}
