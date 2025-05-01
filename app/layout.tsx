// app/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Mohmmed Bin Hindi",
  description: "Mohmmed Bin Hindi - Legal Services",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
