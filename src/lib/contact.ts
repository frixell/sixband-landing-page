const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  website?: string;
};

export function validateContactPayload(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "נתונים לא תקינים" };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const website =
    typeof record.website === "string" ? record.website.trim() : "";

  if (website) {
    return { ok: false, message: "לא ניתן לשלוח את הטופס" };
  }

  if (name.length < 2) {
    return { ok: false, message: "נא להזין שם מלא" };
  }

  if (phone.length < 7) {
    return { ok: false, message: "נא להזין מספר טלפון תקין" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "נא להזין כתובת אימייל תקינה" };
  }

  return {
    ok: true,
    data: { name, phone, email },
  };
}
