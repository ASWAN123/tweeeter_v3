import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import SessionProvider from "./compoenents/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TanstackProvider from "./compoenents/providers/TanstackProvider";
import { EdgeStoreProvider } from "@/app/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tweeter",
    description: "Tweeter social app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions) ;
    // console.log(session ,  'session ')
    

    return (
        <html lang="en">
            <body className={`${inter.className} w-3xl container mx-auto `}>
                <SessionProvider session={session}>
                    <TanstackProvider>
                        <EdgeStoreProvider>
                            <Navbar />
                            {children}
                        </EdgeStoreProvider>
                    </TanstackProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
