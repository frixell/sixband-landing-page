import Image from "next/image";
import { GalleryCarousel } from "@/components/GalleryCarousel";

const PHONE = "0546864499";
const EMAIL = "shalmonir@yahoo.com";
const YOUTUBE_VIDEO_ID = "yzV4tOu4HFM";
const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=100086257967867";

const MEMBERS = [
  {
    name: "ניר שלמון",
    role: "סולן",
    initial: "נ",
    photo: "/nir_singer.jpeg",
    photoZoom: 1.65,
    photoOffset: { left: -26, top: -6 },
    photoObjectPosition: "38% 26%",
  },
  {
    name: "ענבל שגב",
    role: "סולנית",
    initial: "ע",
    photo: "/inbal.jpeg",
    photoZoom: 1.65,
    photoOffset: { left: -9, top: 0 },
    photoObjectPosition: "52% 20%",
  },
  { name: "יפתח בר", role: "תופים", initial: "י" },
  {
    name: "ניר סופר",
    role: "גיטרה",
    initial: "נ",
    photo: "/nir_guitar.jpg",
    photoZoom: 1,
    photoOffset: { left: 0, top: 0 },
    photoObjectPosition: "center top",
  },
  { name: "איתי זהבי", role: "קלידים", initial: "א" },
  { name: "טל ירד", role: "בס", initial: "ט" },
  {
    name: "מוש קיינר",
    role: "סקסופון",
    initial: "מ",
    photo: "/mosh.jpeg",
    photoZoom: 1,
    photoOffset: { left: -10, top: 8 },
    photoObjectPosition: "46% 22%",
  },
] as const;

const GALLERY_IMAGES = [
  "/gallery/gal_1.jpg",
  "/gallery/gal_2.jpg",
  "/gallery/gal_3.jpg",
  "/gallery/gal_4.JPG",
  "/gallery/gal_5.jpeg",
  "/gallery/gal_6.jpeg",
  "/gallery/gal_7.jpeg",
  "/gallery/gal_8.jpeg",
  "/gallery/gal_9.jpeg",
  "/gallery/gal_10.jpeg",
  "/gallery/gal_11.jpeg",
] as const;

const EVENTS = [
  {
    title: "אירועי חברה",
    description:
      "מופע קאברים אנרגטי שמעלה את האווירה באירועי חברה, כנסים ומסיבות עובדים.",
    icon: "🏢",
  },
  {
    title: "אירועים פרטיים",
    description:
      "חוויה מוזיקלית חגיגית ומותאמת לאירועים משפחתיים, ימי הולדת ואירועים מיוחדים.",
    icon: "🎉",
  },
  {
    title: "מסיבות / חגיגות",
    description:
      "רחבת ריקודים מלאה, שירים אהובים מכל הזמנים ואנרגיה גבוהה עד הסוף.",
    icon: "🎶",
  },
] as const;

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.954l-1.694 1.318a12.035 12.035 0 006.69 6.69l1.318-1.694a1.875 1.875 0 011.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.716 22.5 1.5 15.284 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function CtaButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "phone" | "email" | "facebook";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "phone"
      ? `${base} bg-gradient-to-l from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/40 hover:scale-[1.03] hover:shadow-violet-600/30 focus-visible:outline-violet-400`
      : variant === "email"
        ? `${base} border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-amber-400/50 hover:bg-white/10 focus-visible:outline-amber-400`
        : `${base} border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-500/10 focus-visible:outline-blue-400`;

  const icon =
    variant === "phone" ? (
      <PhoneIcon />
    ) : variant === "email" ? (
      <MailIcon />
    ) : (
      <FacebookIcon />
    );

  return (
    <a
      href={href}
      className={styles}
      {...(variant === "facebook"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {icon}
      {children}
    </a>
  );
}

function SectionHeading({
  children,
  subtitle,
  compact = false,
}: {
  children: React.ReactNode;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className={`text-center ${compact ? "mb-8" : "mb-12"}`}>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-200/70">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-l from-amber-400 via-fuchsia-500 to-violet-500" />
    </div>
  );
}

function MemberAvatar({ member }: { member: (typeof MEMBERS)[number] }) {
  const ringClass =
    "mb-4 h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 transition group-hover:ring-amber-400/40";

  if ("photo" in member && member.photo) {
    const zoom =
      "photoZoom" in member && member.photoZoom ? member.photoZoom : 1.65;
    const left =
      "photoOffset" in member && member.photoOffset ? member.photoOffset.left : 32;
    const top =
      "photoOffset" in member && member.photoOffset ? member.photoOffset.top : 8;

    return (
      <div className={`relative ${ringClass}`}>
        <div
          className="absolute"
          style={{
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            left: `${left}%`,
            top: `${top}%`,
          }}
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="64px"
            className="object-cover"
            style={{
              objectPosition:
                "photoObjectPosition" in member && member.photoObjectPosition
                  ? member.photoObjectPosition
                  : "center center",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-amber-500/30 text-2xl font-bold text-white ${ringClass}`}
      aria-hidden="true"
    >
      {member.initial}
    </div>
  );
}

function MemberCard({ member }: { member: (typeof MEMBERS)[number] }) {
  return (
    <article className="card-glow group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-500/30">
      <MemberAvatar member={member} />
      <h3 className="text-lg font-bold text-white">{member.name}</h3>
      <p className="mt-1 text-sm text-violet-300/70">{member.role}</p>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <header className="spotlight-gradient relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-fuchsia-600/15 blur-[100px]" />
        </div>

        <section
          className="stage-floor relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-10 text-center sm:pb-20"
          aria-labelledby="hero-heading"
        >
          <div className="relative mx-auto mb-8 max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-950/40 sm:mb-10 sm:rounded-3xl">
            <div className="relative h-44 w-full sm:h-56 md:h-64 lg:h-72">
              <Image
                src="/hero2.jpeg"
                alt="SIXBAND — להקת קאברים חיה"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#07060f]/80 via-[#07060f]/20 to-violet-900/10"
                aria-hidden="true"
              />
            </div>
          </div>

          <p
            dir="ltr"
            className="mb-4 font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-[0.35em] text-amber-400/90"
          >
            Live music show
          </p>

          <h1
            id="hero-heading"
            dir="ltr"
            className="gold-text font-[family-name:var(--font-outfit)] text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl"
          >
            SIXBAND
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-violet-100/90 sm:text-2xl sm:leading-relaxed">
            מופע קאברים סוחף ושמח עם השירים הכי טובים מכל הזמנים.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <CtaButton href={`tel:${PHONE}`} variant="phone">
              התקשרו להזמנה
            </CtaButton>
            <CtaButton href={`mailto:${EMAIL}`} variant="email">
              שלחו מייל
            </CtaButton>
            <CtaButton href={FACEBOOK_URL} variant="facebook">
              עקבו בפייסבוק
            </CtaButton>
          </div>

          <p className="mt-8 text-sm font-medium text-amber-400/80">
            להזמנת מופעים לאירועי חברה ולאירועים פרטיים
          </p>
        </section>
      </header>

      <main>
        <section
          id="video"
          className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 sm:pb-28 sm:pt-10"
          aria-labelledby="video-heading"
        >
          <SectionHeading compact subtitle="חוויה מההופעה — ישירות אליכם">
            <span id="video-heading">
              צפו ב <span dir="ltr" className="font-[family-name:var(--font-outfit)]">SIXBAND</span> בהופעה
            </span>
          </SectionHeading>

          <div className="card-glow mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-2 shadow-2xl shadow-violet-950/50 transition duration-500 sm:rounded-3xl sm:p-3">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black/80 sm:rounded-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="SIXBAND בהופעה"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="relative border-t border-white/5 bg-gradient-to-b from-violet-950/15 to-transparent py-20 sm:py-28"
          aria-labelledby="gallery-heading"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading subtitle="תמונות מהבמה — אנרגיה, אור וריקודים">
              <span id="gallery-heading">גלריה</span>
            </SectionHeading>

            <GalleryCarousel images={GALLERY_IMAGES} />
          </div>
        </section>

        <section
          id="about"
          className="relative border-y border-white/5 bg-gradient-to-b from-violet-950/20 to-transparent py-20 sm:py-28"
          aria-labelledby="about-heading"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading>
              <span id="about-heading">מי אנחנו</span>
            </SectionHeading>

            <div className="mx-auto max-w-3xl space-y-6 text-center text-lg leading-relaxed text-violet-100/80">
              <p>
                <span dir="ltr" className="font-[family-name:var(--font-outfit)] font-bold text-amber-400">SIXBAND</span>{" "}
                היא להקת קאברים בת שבעה נגנים, המביאה מופע אנרגטי, שמח ומרגש
                עם השירים האהובים ביותר מכל הזמנים.
              </p>
              <p>
                אנחנו מתמחים באירועי חברה ואירועים פרטיים — עם סאונד מקצועי,
                ביצועים חיים ואווירה שממלאת את הרחבה בשמחה וריקודים.
              </p>
            </div>
          </div>
        </section>

        <section
          id="members"
          className="mx-auto max-w-6xl px-6 py-20 sm:py-28"
          aria-labelledby="members-heading"
        >
          <SectionHeading subtitle="שבעה נגנים, מופע אחד גדול">
            <span id="members-heading">הלהקה</span>
          </SectionHeading>

          <div className="mx-auto max-w-5xl space-y-4 sm:space-y-6">
            <ul className="grid list-none grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {MEMBERS.slice(0, 4).map((member) => (
                <li key={member.name}>
                  <MemberCard member={member} />
                </li>
              ))}
            </ul>
            <ul className="flex list-none flex-wrap justify-center gap-4 sm:gap-6">
              {MEMBERS.slice(4).map((member) => (
                <li
                  key={member.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc((100%-4.5rem)/4)]"
                >
                  <MemberCard member={member} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="events"
          className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-fuchsia-950/15 py-20 sm:py-28"
          aria-labelledby="events-heading"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading subtitle="מופע מותאם לכל סוג אירוע">
              <span id="events-heading">לאיזה אירועים?</span>
            </SectionHeading>

            <ul className="grid gap-6 md:grid-cols-3">
              {EVENTS.map((event) => (
                <li key={event.title}>
                  <article className="card-glow flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-500/25">
                    <span className="mb-4 text-4xl" aria-hidden="true">
                      {event.icon}
                    </span>
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-violet-200/65">
                      {event.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28"
          aria-labelledby="contact-heading"
        >
          <div className="spotlight-gradient overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-violet-900/30 via-[#0f0a1a] to-fuchsia-950/20 px-8 py-14 text-center shadow-2xl sm:px-16 sm:py-20">
            <h2
              id="contact-heading"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              מוכנים להזמין מופע?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-violet-200/75">
              להזמנת מופעים לאירועי חברה ולאירועים פרטיים — צרו קשר עכשיו
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 text-lg font-medium text-white/80 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 transition hover:text-amber-400"
              >
                <PhoneIcon />
                <span dir="ltr">{PHONE}</span>
              </a>
              <span className="hidden text-white/20 sm:inline" aria-hidden="true">
                |
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 transition hover:text-amber-400"
              >
                <MailIcon />
                <span dir="ltr">{EMAIL}</span>
              </a>
              <span className="hidden text-white/20 sm:inline" aria-hidden="true">
                |
              </span>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-blue-400"
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <CtaButton href={`tel:${PHONE}`} variant="phone">
                התקשרו להזמנה
              </CtaButton>
              <CtaButton href={`mailto:${EMAIL}`} variant="email">
                שלחו מייל
              </CtaButton>
              <CtaButton href={FACEBOOK_URL} variant="facebook">
                עקבו בפייסבוק
              </CtaButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-10 text-center">
        <p dir="ltr" className="font-[family-name:var(--font-outfit)] text-sm font-bold tracking-[0.25em] text-white/40">
          SIXBAND
        </p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-violet-300/60 transition hover:text-blue-400"
        >
          <FacebookIcon />
          עקבו בפייסבוק
        </a>
        <p className="mt-2 text-xs text-white/25">
          © {new Date().getFullYear()} SIXBAND · Live music show
        </p>
      </footer>
    </>
  );
}
