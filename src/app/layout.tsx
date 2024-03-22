"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from '../redux/store'; // Assuming this is where you create your Redux store


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head><title>PA Infotel</title></head>
        <body className={inter.className}>
          {children}
          <ToastContainer autoClose={1500} />
        </body>
      </html>
    </Provider>
  );
}
