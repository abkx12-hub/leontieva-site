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
        url: "/leontieva-og-v1.png",
        width: 1200,
        height: 630,
        alt: "LEONTIEVA — стратегия, продюсирование и управляемый результат",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/leontieva-og-v1.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
