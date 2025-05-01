import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],

  defaultLocale: "en",

  // Configure domain-specific locale patterns
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.ar',
  //     defaultLocale: 'ar'
  //   }
  // ]
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
