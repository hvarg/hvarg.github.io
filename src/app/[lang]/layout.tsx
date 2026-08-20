import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { lang } from "next/root-params";
import { getResume, isLocale, locales } from "@/lib/resume";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  const { meta, personal } = getResume(isLocale(locale) ? locale : "en");

  return {
    title: meta.title,
    description: meta.description,
    // Kept out of search results deliberately; share the link directly.
    // robots.txt must still allow crawling or this tag is never read.
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${meta.locale}`,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      locale: meta.locale,
      siteName: personal.name,
    },
  };
}

/*
 * Runs synchronously while the head is parsed, before the first paint, so a
 * saved theme never flashes the other palette. No attribute means "follow the
 * OS", which is what the static HTML is prerendered with.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const locale = await lang();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans">{props.children}</body>
    </html>
  );
}
