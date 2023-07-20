import Navbar from "@/app/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AppContextProvider } from "@/app/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Management VM",
  description: "Management VM",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider client={queryClient}> */}
        <AppContextProvider>
          <Navbar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
