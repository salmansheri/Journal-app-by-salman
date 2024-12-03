import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/poppins";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/lib/providers/react-query-provider";

export const metadata: Metadata = {
  title: "WriteIt | Created By Salman Sheriff",
  description: "Author: Salman Sheriff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ReactQueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
