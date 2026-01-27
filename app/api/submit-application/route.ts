// app/api/submit-application/route.ts
// FIXED for Next.js environment variables

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Read environment variables at module level
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Log on server startup (will show in terminal)
console.log('🔧 Environment Check on Server Start:');
console.log('EMAIL_USER:', EMAIL_USER ? '✅ SET' : '❌ NOT SET');
console.log('EMAIL_PASSWORD:', EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET');

function generateEmailHTML(data: any) {
  const { projectName, teamEmail, teamLead, requestedSubsidy, auditBudget, preferredTimeline, applicationId } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; }
        .header { background: linear-gradient(135deg, #9333ea 0%, #16a34a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
        .success { background: #10b981; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .info-box { background: #f3f4f6; border-left: 4px solid #9333ea; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .highlight { color: #10b981; font-size: 28px; font-weight: bold; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 10px 10px; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .label { font-weight: 600; color: #6b7280; }
        .value { font-weight: 600; color: #111827; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0;">🛡️ SecureAuditHub</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Subsidy Application Confirmation</p>
      </div>
      
      <div class="content">
        <div class="success">✓ Application Received</div>
        
        <h2 style="color: #111827; margin-top: 20px;">Dear ${teamLead || 'Applicant'},</h2>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for submitting your Solana audit subsidy application! We have received your application 
          <strong>immediately</strong> and wanted to confirm all the details.
        </p>
        
        <div class="info-box">
          <h3 style="margin-top: 0; color: #9333ea; font-size: 18px;">📋 Application Summary</h3>
          
          <div class="detail-row">
            <span class="label">Application ID:</span>
            <span class="value" style="font-family: monospace; color: #9333ea;">${applicationId}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Project Name:</span>
            <span class="value">${projectName || 'N/A'}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Team Lead:</span>
            <span class="value">${teamLead || 'N/A'}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Contact Email:</span>
            <span class="value">${teamEmail}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Requested Subsidy:</span>
            <span class="value highlight">$${parseInt(requestedSubsidy || 0).toLocaleString()}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Total Audit Budget:</span>
            <span class="value">$${parseInt(auditBudget || 0).toLocaleString()}</span>
          </div>
          
          <div class="detail-row" style="border-bottom: none;">
            <span class="label">Preferred Timeline:</span>
            <span class="value" style="text-transform: capitalize;">${preferredTimeline || 'N/A'}</span>
          </div>
        </div>
        
        <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #1e40af; font-size: 18px;">📅 What Happens Next?</h3>
          <p style="margin: 5px 0; color: #1e3a8a;">Our expert panel will review your application within 1-2 weeks.</p>
        </div>
        
        <p style="margin-top: 30px; font-size: 16px;">
          Best regards,<br>
          <strong style="color: #9333ea;">The SecureAuditHub Team</strong>
        </p>
      </div>
      
      <div class="footer">
        <p style="margin: 0; font-weight: 600;">
          <strong>SecureAuditHub</strong><br>
          support@secureaudithub.com
        </p>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  console.log('\n📥 ========== NEW APPLICATION SUBMISSION ==========');
  
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('✅ Request body parsed');
      console.log('📧 Email to:', body.teamEmail);
    } catch (parseError) {
      console.error('❌ Failed to parse request body');
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!body.teamEmail) {
      console.error('❌ Missing teamEmail');
      return NextResponse.json(
        { success: false, message: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!body.projectName) {
      console.error('❌ Missing projectName');
      return NextResponse.json(
        { success: false, message: 'Project name is required' },
        { status: 400 }
      );
    }

    // Check environment variables
    console.log('🔍 Checking environment variables...');
    console.log('EMAIL_USER:', EMAIL_USER || 'NOT SET');
    console.log('EMAIL_PASSWORD:', EMAIL_PASSWORD ? 'SET (hidden)' : 'NOT SET');
    
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.error('❌ Email credentials not configured!');
      console.error('   EMAIL_USER:', EMAIL_USER || 'MISSING');
      console.error('   EMAIL_PASSWORD:', EMAIL_PASSWORD ? 'SET' : 'MISSING');
      
      // Return more detailed error for debugging
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service not configured. Please contact administrator.',
          debug: {
            emailUser: EMAIL_USER || 'NOT SET',
            emailPassword: EMAIL_PASSWORD ? 'SET' : 'NOT SET',
            nodeEnv: process.env.NODE_ENV,
            envFileCheck: 'Make sure .env.local exists in root folder'
          }
        },
        { status: 500 }
      );
    }

    // Generate application ID
    const applicationId = `SAH-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    console.log('🆔 Application ID:', applicationId);

    const applicationData = {
      ...body,
      applicationId,
      submittedAt: new Date().toISOString(),
    };

    // Configure email transporter
    console.log('📮 Configuring email transporter...');
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });
      console.log('✅ Email transporter configured');
    } catch (transportError) {
      console.error('❌ Failed to create transporter:', transportError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to configure email service',
          error: transportError instanceof Error ? transportError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Send email
    console.log('📧 Sending email to:', body.teamEmail);
    try {
      const info = await transporter.sendMail({
        from: `"SecureAuditHub" <${EMAIL_USER}>`,
        to: body.teamEmail,
        subject: `✅ Application Received - ${applicationId}`,
        html: generateEmailHTML(applicationData),
        text: `
Dear ${body.teamLead || 'Applicant'},

Thank you for submitting your application!

Application ID: ${applicationId}
Project: ${body.projectName}
Requested Subsidy: $${parseInt(body.requestedSubsidy || 0).toLocaleString()}
Total Budget: $${parseInt(body.auditBudget || 0).toLocaleString()}

Best regards,
SecureAuditHub Team
        `,
      });

      console.log('✅ EMAIL SENT SUCCESSFULLY!');
      console.log('📬 Message ID:', info.messageId);
      console.log('================================================\n');

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        data: {
          applicationId,
          emailSent: true,
          submittedAt: applicationData.submittedAt,
        },
      });

    } catch (emailError: any) {
      console.error('❌ EMAIL SEND FAILED:', emailError);
      console.error('Error details:', emailError.message);
      
      // Check for specific Gmail errors
      if (emailError.code === 'EAUTH') {
        console.error('🔐 Authentication error - Check your Gmail App Password');
      }
      
      return NextResponse.json({
        success: false,
        message: 'Failed to send confirmation email',
        error: emailError.message,
        debug: {
          errorCode: emailError.code,
          hint: 'Check Gmail App Password in .env.local'
        }
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ UNEXPECTED ERROR:', error);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'API is running',
    emailConfigured: !!(EMAIL_USER && EMAIL_PASSWORD),
    emailUser: EMAIL_USER || 'NOT SET',
    timestamp: new Date().toISOString()
  });
}