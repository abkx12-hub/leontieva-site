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
      "Публичная траектория, которая работает на задачу бизнеса, лидера или общественного проекта.",
    url: "https://leontieva.media",
    siteName: "LEONTIEVA",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/elena-hero-v3.jpg",
        width: 1330,
        height: 1800,
        alt: "Елена Леонтьева — основатель и главный продюсер LEONTIEVA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/elena-hero-v3.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
