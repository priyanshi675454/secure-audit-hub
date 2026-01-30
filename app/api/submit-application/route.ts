

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
  const { 
    projectName, 
    teamEmail, 
    teamLead, 
    requestedSubsidy, 
    auditBudget, 
    preferredTimeline, 
    applicationId,
    linesOfCode,
    complexity,
    projectType 
  } = data;
  
  // Calculate estimated costs
  const estimatedAuditCost = Number(auditBudget) || 60000;
  const approvedSubsidy = Number(requestedSubsidy) || Math.min(estimatedAuditCost * 0.3, 50000);
  const yourFinalCost = Math.max(0, estimatedAuditCost - approvedSubsidy);
  const savingsPercent = ((approvedSubsidy / estimatedAuditCost) * 100).toFixed(1);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1f2937; background: #f9fafb; }
        .container { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; font-size: 18px; opacity: 0.95; }
        .content { padding: 40px 30px; }
        .success-badge { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; margin: 20px 0; }
        .info-section { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid #e5e7eb; }
        .info-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: 600; color: #6b7280; font-size: 14px; }
        .value { font-weight: 700; color: #111827; font-size: 16px; }
        .highlight { color: #10b981; font-size: 28px; font-weight: 800; }
        
        /* Cost Breakdown Styles */
        .cost-breakdown { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid #3b82f6; }
        .cost-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; }
        .cost-row.total { border-top: 3px solid #3b82f6; padding-top: 16px; margin-top: 8px; }
        .cost-label { font-size: 15px; font-weight: 600; color: #1e40af; }
        .cost-value { font-size: 18px; font-weight: 700; color: #1e3a8a; }
        .cost-value.subsidy { color: #10b981; }
        .cost-value.final { font-size: 32px; background: linear-gradient(135deg, #9333ea, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Visual Bar Chart */
        .chart-container { margin: 24px 0; }
        .chart-bar { height: 60px; border-radius: 8px; overflow: hidden; display: flex; margin: 16px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .bar-subsidy { background: linear-gradient(90deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px; }
        .bar-payment { background: linear-gradient(90deg, #9333ea, #7c3aed); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px; }
        .chart-legend { display: flex; justify-content: center; gap: 24px; margin-top: 12px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .legend-color { width: 16px; height: 16px; border-radius: 4px; }
        
        .savings-badge { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px; border-radius: 12px; text-align: center; margin: 24px 0; }
        .savings-badge .big-number { font-size: 36px; font-weight: 800; margin: 8px 0; }
        .savings-badge .subtitle { font-size: 14px; opacity: 0.95; }
        
        .next-steps { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid #f59e0b; }
        .step { display: flex; gap: 16px; margin: 16px 0; align-items: start; }
        .step-number { width: 36px; height: 36px; background: #f59e0b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; font-size: 18px; }
        .step-content h4 { margin: 0 0 4px 0; color: #92400e; font-size: 16px; }
        .step-content p { margin: 0; color: #78350f; font-size: 14px; line-height: 1.5; }
        
        .cta-button { display: inline-block; background: linear-gradient(135deg, #9333ea, #7c3aed); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 16px 0; box-shadow: 0 4px 6px rgba(147, 51, 234, 0.3); }
        .cta-button:hover { box-shadow: 0 6px 8px rgba(147, 51, 234, 0.4); }
        
        .footer { background: #f9fafb; padding: 32px; text-align: center; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .footer strong { color: #111827; }
        
        @media only screen and (max-width: 600px) {
          .header { padding: 30px 20px; }
          .content { padding: 24px 20px; }
          .header h1 { font-size: 24px; }
          .cost-value.final { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🛡️ SecureAuditHub</h1>
          <p>Application Confirmation & Cost Estimate</p>
        </div>
        
        <div class="content">
          <!-- Success Badge -->
          <div class="success-badge">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Application Received!
          </div>
          
          <h2 style="color: #111827; margin-top: 24px; font-size: 24px;">Dear ${teamLead || 'Applicant'},</h2>
          
          <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 16px 0;">
            Thank you for submitting your application to the Solana Audit Subsidy Program! 
            We've received your application <strong>immediately</strong> and wanted to provide 
            you with a detailed breakdown of your potential savings.
          </p>
          
          <!-- Application Summary -->
          <div class="info-section">
            <h3 style="margin-top: 0; color: #9333ea; font-size: 20px; display: flex; align-items: center; gap: 8px;">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
              Application Summary
            </h3>
            
            <div class="info-row">
              <span class="label">Application ID</span>
              <span class="value" style="font-family: 'Courier New', monospace; color: #9333ea;">${applicationId}</span>
            </div>
            <div class="info-row">
              <span class="label">Project Name</span>
              <span class="value">${projectName}</span>
            </div>
            <div class="info-row">
              <span class="label">Project Type</span>
              <span class="value">${projectType || 'DeFi'}</span>
            </div>
            <div class="info-row">
              <span class="label">Team Lead</span>
              <span class="value">${teamLead}</span>
            </div>
            <div class="info-row">
              <span class="label">Contact Email</span>
              <span class="value">${teamEmail}</span>
            </div>
            <div class="info-row">
              <span class="label">Preferred Timeline</span>
              <span class="value" style="text-transform: capitalize;">${preferredTimeline}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted</span>
              <span class="value">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          
          <!-- Cost Breakdown -->
          <div class="cost-breakdown">
            <h3 style="margin-top: 0; color: #1e40af; font-size: 22px; text-align: center; margin-bottom: 20px;">
              💰 Your Cost Estimate & Subsidy Breakdown
            </h3>
            
            <div class="cost-row">
              <span class="cost-label">Estimated Audit Cost</span>
              <span class="cost-value">$${estimatedAuditCost.toLocaleString()}</span>
            </div>
            
            <div class="cost-row">
              <span class="cost-label">Subsidy Amount (30%)</span>
              <span class="cost-value subsidy">- $${approvedSubsidy.toLocaleString()}</span>
            </div>
            
            <div class="cost-row total">
              <span class="cost-label" style="font-size: 18px;">Your Final Cost</span>
              <span class="cost-value final">$${yourFinalCost.toLocaleString()}</span>
            </div>
          </div>
          
          <!-- Visual Chart -->
          <div class="chart-container">
            <h4 style="text-align: center; color: #374151; font-size: 16px; margin-bottom: 12px;">
              Cost Visualization
            </h4>
            <div class="chart-bar">
              <div class="bar-subsidy" style="width: ${(approvedSubsidy / estimatedAuditCost) * 100}%;">
                Subsidy: $${approvedSubsidy.toLocaleString()}
              </div>
              <div class="bar-payment" style="width: ${(yourFinalCost / estimatedAuditCost) * 100}%;">
                You Pay: $${yourFinalCost.toLocaleString()}
              </div>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color" style="background: linear-gradient(135deg, #10b981, #059669);"></div>
                <span>Subsidy Coverage (${savingsPercent}%)</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: linear-gradient(135deg, #9333ea, #7c3aed);"></div>
                <span>Your Payment</span>
              </div>
            </div>
          </div>
          
          <!-- Savings Badge -->
          <div class="savings-badge">
            <div style="font-size: 18px; font-weight: 600;">🎉 You Could Save</div>
            <div class="big-number">$${approvedSubsidy.toLocaleString()}</div>
            <div class="subtitle">That's ${savingsPercent}% off your audit cost!</div>
          </div>
          
          <!-- Next Steps -->
          <div class="next-steps">
            <h3 style="margin-top: 0; color: #92400e; font-size: 20px; text-align: center; margin-bottom: 20px;">
              📅 What Happens Next?
            </h3>
            
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Immediate Confirmation</h4>
                <p>You're reading it now! This email confirms we received your application instantly.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Expert Panel Review</h4>
                <p>Our panel (Superteam, MonkeDAO, Jito, Areta) will evaluate your application within 1-2 weeks.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Approval & Marketplace Access</h4>
                <p>Once approved, you'll get your subsidy voucher and access to 15 top audit providers.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Select Provider & Redeem</h4>
                <p>Choose your preferred auditor and apply your voucher code for instant savings!</p>
              </div>
            </div>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 8px;">
            <p style="margin: 0; color: #78350f; font-size: 14px;">
              <strong style="color: #92400e;">💡 Important:</strong> Keep this email for your records. 
              Your Application ID (<code style="background: #fff; padding: 2px 8px; border-radius: 4px; font-family: monospace; color: #9333ea; font-weight: 600;">${applicationId}</code>) 
              will be required for any inquiries about your application status.
            </p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://secure-audit-hub.vercel.app/compare" class="cta-button">
              Compare All 15 Audit Providers →
            </a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.7; color: #374151; margin-top: 24px;">
            If you have any questions or need to update your application, please don't hesitate to 
            contact us at <strong style="color: #9333ea;">support@secureaudithub.com</strong> with 
            your application ID.
          </p>
          
          <p style="margin-top: 32px; font-size: 16px; line-height: 1.7;">
            Best regards,<br>
            <strong style="color: #9333ea; font-size: 18px;">The SecureAuditHub Team</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p style="margin: 0; font-weight: 600; font-size: 16px;">
            <strong>SecureAuditHub</strong>
          </p>
          <p style="margin: 8px 0; font-size: 14px;">
            Empowering Solana Projects with Security Audits
          </p>
          <p style="margin: 12px 0; font-size: 14px;">
            🌐 <a href="https://secure-audit-hub.vercel.app" style="color: #9333ea; text-decoration: none;">secure-audit-hub.vercel.app</a><br>
            📧 support@secureaudithub.com
          </p>
          <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
            This is an automated confirmation email. Please do not reply directly to this email.
          </p>
        </div>
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