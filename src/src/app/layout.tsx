import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Provider } from "jotai";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-10 xl:px-24 dark:bg-black animate-fadeIn">
        <Provider>
          <Header />
          {children}
      </Provider>
      </body>
    </html>
  );
}
