import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Inspectrix</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Compare. Choose. Connect.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Find the best services across multiple categories with real-time comparisons and community insights.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex items-center rounded-lg border px-3 py-2 shadow-sm">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search services, products..."
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
                <Button className="w-full" size="sm">
                  Find the Best
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Smart Comparison</h3>
                    <p className="text-sm text-gray-500">Compare services across multiple categories</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Community Insights</h3>
                    <p className="text-sm text-gray-500">Real user reviews and recommendations</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M20 7h-9" />
                      <path d="M14 17H5" />
                      <circle cx="17" cy="17" r="3" />
                      <circle cx="7" cy="7" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Business Registration</h3>
                    <p className="text-sm text-gray-500">Register your business and reach more customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex h-16 items-center">
          <p className="text-sm text-gray-500">© 2025 Inspectrix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

