"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BarChart2, Settings } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">Health Dashboard</span>
        </div>
        <nav className="flex flex-1 items-center justify-center sm:justify-start">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/stats"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/stats" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Stats
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/settings"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
