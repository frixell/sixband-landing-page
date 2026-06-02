"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "שליחה נכשלה. נסו שוב.");
        return;
      }

      setStatus("success");
      setMessage("קיבלנו את הפרטים — נחזור אליכם בהקדם!");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("שליחה נכשלה. בדקו חיבור לאינטרנט ונסו שוב.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md text-right"
      noValidate
    >
      <p className="mb-4 text-sm text-violet-200/70">
        או השאירו פרטים ונחזור אליכם
      </p>

      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm text-violet-200/80">
            שם מלא
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "loading"}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            placeholder="השם שלכם"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm text-violet-200/80">
            טלפון
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            dir="ltr"
            disabled={status === "loading"}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            placeholder="050-0000000"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm text-violet-200/80">
            אימייל
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            disabled={status === "loading"}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-gradient-to-l from-violet-600 to-fuchsia-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "שולחים..." : "שלחו פרטים"}
      </button>

      <p className="mt-3 text-xs text-white/40">
        הפרטים נשמרים בצורה מאובטחת ומשמשים רק ליצירת קשר לגבי הזמנת מופע.
      </p>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-emerald-500/15 text-emerald-200"
              : "bg-red-500/15 text-red-200"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
