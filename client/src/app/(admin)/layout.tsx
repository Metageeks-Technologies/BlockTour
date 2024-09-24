import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
const inter = Inter( {subsets: ["latin"]} );
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Block Tour Admin",
    description: "Generated by create next app",
};

export default function RootLayout ( {children, }: Readonly<{children: React.ReactNode;}> ) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <Header />
                
                <div className="flex">
                    <Sidebar />
                    {children}
                </div>


            </body>
        </html>
    );
}