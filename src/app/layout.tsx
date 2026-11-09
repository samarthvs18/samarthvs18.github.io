import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Samarth Vamshy S. — AI Engineer",
  description: "AI Engineer building full-stack AI products, intelligent agents, and end-to-end software experiences.",
  metadataBase: new URL("https://samarthvs18.github.io"),
  openGraph: { title: "Samarth Vamshy S. — AI Engineer", description: "Full-stack AI products, intelligent agents, and product engineering.", url: "https://samarthvs18.github.io", siteName: "Samarth Vamshy S.", type: "website" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}