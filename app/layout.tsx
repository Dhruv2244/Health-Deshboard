import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { HealthDataProvider } from "@/components/health-data-provider"
import { MoodThemeWrapper } from "@/components/mood-theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Dashboard",
  description: "Monitor your health metrics with our wearable companion app",
    generator: 'v0.dev'
}

// Define MoodThemeWrapper or import it
// const MoodThemeWrapper = ({ children }: { children: React.ReactNode }) => {
//   return <>{children}</>;
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HealthDataProvider>
            <MoodThemeWrapper>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">{children}</div>
              </div>
            </MoodThemeWrapper>
          </HealthDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
