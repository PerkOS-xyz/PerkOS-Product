import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WaitlistData {
  email: string;
  product: 'spark' | 'swarm' | 'general';
}

const productNames: Record<string, string> = {
  spark: 'Spark',
  swarm: 'Swarm',
  general: 'PerkOS',
};

const productDescriptions: Record<string, string> = {
  spark: 'the no-code AI agent launcher',
  swarm: 'AI fleet orchestration for organizations',
  general: 'the infrastructure for the agentic economy',
};

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistData = await request.json();
    const { email, product } = body;

    if (!email || !product) {
      return NextResponse.json(
        { error: 'Email and product are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!['spark', 'swarm', 'general'].includes(product)) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'contact@perkos.xyz';
    const name = productNames[product];
    const description = productDescriptions[product];

    // Notify team
    await resend.emails.send({
      from: 'PerkOS Waitlist <noreply@perkos.xyz>',
      to: [contactEmail],
      subject: `[Waitlist] New signup for ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FD8F50 0%, #EB1B69 100%); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Waitlist Signup</h1>
          </div>
          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0;"><strong>Product:</strong> ${name}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'PerkOS <noreply@perkos.xyz>',
      to: [email],
      subject: `You're on the ${name} waitlist!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FD8F50 0%, #EB1B69 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">You're on the list!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">We'll notify you when ${name} launches.</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thanks for your interest in ${name} — ${description}. We're building something special and you'll be among the first to know when it's ready.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              In the meantime, check out what's already live:
            </p>
            <div style="margin-bottom: 20px;">
              <a href="https://stack.perkos.xyz" style="display: inline-block; background: #76437B; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-right: 10px; margin-bottom: 10px;">Explore Stack</a>
              <a href="https://aura.perkos.xyz" style="display: inline-block; background: #06B6D4; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-bottom: 10px;">Try Aura API</a>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">
              <strong>PerkOS</strong> — Infrastructure for the agentic economy
            </p>
            <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
              <a href="https://x.com/perk_os" style="color: #9ca3af; text-decoration: none; margin: 0 10px;">Twitter</a>
              <a href="https://github.com/PerkOS-xyz" style="color: #9ca3af; text-decoration: none; margin: 0 10px;">GitHub</a>
              <a href="https://perkos.xyz" style="color: #9ca3af; text-decoration: none; margin: 0 10px;">Website</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again later.' },
      { status: 500 }
    );
  }
}
