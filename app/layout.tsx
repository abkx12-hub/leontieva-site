import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leontieva.media"),
  title: "LEONTIEVA — продюсерский центр управляемой публичной траектории",
  description:
    "Стратегия, медиа, продюсирование, общественные проекты и законный GR-контур для основателей и компаний.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/lm-icon.jpg",
  },
  openGraph: {
    title: "LEONTIEVA — продюсерский центр Елены Леонтьевой",
    description:
      "От фактов и стратегии — до запуска, принятого результата и измерения.",
    url: "https://leontieva.media",
    siteName: "LEONTIEVA",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
