import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Theme } from '@radix-ui/themes';
import Providers from "@/store/Provider";
import '@radix-ui/themes/styles.css';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: '老范说 - 专注技术分享与独立开发的个人博客 | laofansay',
  description: '老范说是一个专注于技术分享、独立开发、个人IP打造的博客平台。分享软件开发、系统架构、AI应用等技术内容，助力开发者成长。',
  keywords: '老范说,laofansay,技术博客,独立开发,软件工程,系统架构,AI开发,个人IP,技术分享,全栈开发,Next.js,React,Vue,Java,Spring Cloud,Docker,Kubernetes',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://www.laofansay.us.kg'
  },
  openGraph: {
    title: '老范说 - 专注技术分享与独立开发的个人博客',
    description: '老范工作室 - 资深软件工程师，专注于技术分享、独立开发、个人IP打造。提供全栈开发、系统架构、AI应用等技术内容。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.laofansay.us.kg',
    siteName: '老范说',
    images: [{
      url: '/fan5.JPG',
      width: 800,
      height: 600,
      alt: '老范说博客封面图'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '老范说 - 专注技术分享与独立开发的个人博客',
    description: '老范工作室 - 资深软件工程师，专注于技术分享、独立开发、个人IP打造。提供全栈开发、系统架构、AI应用等技术内容。',
    images: ['/fan5.JPG']
  },
  verification: {
    google: 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const paddingTop = '60px';


  return (
    <html lang="zh-CN">

      <body className={inter.className}>
        <Theme>
          <Providers >
             <Navbar />
            <div style={{ flex: 1 }}>
              {children}
            </div>
             <Footer /> 
          </Providers>
        </Theme>
      </body>
    </html >
  );
}




