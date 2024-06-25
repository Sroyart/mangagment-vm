import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AppContextProvider } from "@/app/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Management VM",
  description: "Management VM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
