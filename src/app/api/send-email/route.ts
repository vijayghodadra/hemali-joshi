import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not defined');
    return NextResponse.json(
      { error: 'Email service not configured. Please add RESEND_API_KEY to your environment variables.' },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const { name, email, phone, countryCode, eventType, location, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Himali Joshi Website <onboarding@resend.dev>',
      to: ['inquiry.himalijoshi@gmail.com'],
      subject: `New Inquiry from ${name} - ${eventType}`,
      html: `
        <div style="font-family: serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Booking Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p><strong>Location:</strong> ${location}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #d4af37;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            Sent from the official website of Himali Joshi
          </footer>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
