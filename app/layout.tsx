import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leontieva.media"),
  title: "LEONTIEVA — продюсерский центр Елены Леонтьевой",
  description:
    "Помогаем предпринимателям и экспертам выстроить публичную роль, подготовиться к СМИ и системно управлять медийной траекторией.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/lm-icon.jpg",
  },
  openGraph: {
    title: "LEONTIEVA — продюсерский центр Елены Леонтьевой",
    description:
      "Позиционирование, медиастратегия, подготовка к СМИ и продюсерское сопровождение бизнеса и экспертов.",
    url: "https://www.leontieva.media",
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
