import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import SessionProvider from "./compoenents/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TanstackProvider from "./compoenents/providers/TanstackProvider";
import { EdgeStoreProvider } from "@/app/lib/edgestore";

import { Noto_Sans , Poppins } from "next/font/google";


export const notoSans = Noto_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal'],
    display: 'swap',
    variable: '--font-notoSans',
    subsets: ['latin']
  });
export  const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal'],
    display: 'swap',
    variable: '--font-poppins',
    subsets: ['latin']
  });



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
            <body className={`${poppins.className} `}>
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
