import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReduxProvider } from "@/redux/provider";
import { LanguageProvider } from "@/context/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { setRequestLocale } from "next-intl/server"; // ✅ required

import "../globals.css";

export const dynamic = "force-static"; // ✅ fixes the dynamic rendering

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export const metadata = {
  title: "Mohmmed Bin Hindi",
  description: "Mohmmed Bin Hindi - Legal Services",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  await setRequestLocale(locale); // ✅ required for static rendering

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
            <LanguageProvider>
              <Header />
              {children}
              <Footer />
            </LanguageProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
