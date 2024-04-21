"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { Provider } from 'react-redux'
import {store} from '../store/store'
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    
    <html lang="en">    
      <body className={inter.className}>
        <Provider store={store}>
          <Toaster position="bottom-center" />
            {children}
        </Provider>
      </body>
    </html>
  );
}
