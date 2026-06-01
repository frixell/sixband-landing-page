import { Resend } from "resend";
import { NextResponse } from "next/server";

import { validateContactPayload } from "@/lib/contact";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = validateContactPayload(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.message }, { status: 400 });
    }

    const { name, phone, email } = parsed.data;
    const supabase = createSupabaseAdmin();

    const { error: dbError } = await supabase.from("contact_leads").insert({
      name,
      phone,
      email,
    });

    if (dbError) {
      console.error("Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: "שמירת הפרטים נכשלה. נסו שוב או התקשרו אלינו." },
        { status: 500 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "shalmonir@yahoo.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    if (resendKey) {
      const resend = new Resend(resendKey);
      const { error: emailError } = await resend.emails.send({
        from: `SIXBAND <${fromEmail}>`,
        to: [toEmail],
        replyTo: email,
        subject: `פנייה חדשה מהאתר — ${name}`,
        text: [
          "פנייה חדשה מאתר SIXBAND",
          "",
          `שם: ${name}`,
          `טלפון: ${phone}`,
          `אימייל: ${email}`,
        ].join("\n"),
      });

      if (emailError) {
        console.error("Resend email failed:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not set — lead saved to DB only");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "אירעה שגיאה. נסו שוב מאוחר יותר." },
      { status: 500 },
    );
  }
}
