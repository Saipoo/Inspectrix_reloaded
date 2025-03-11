"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Home, Search, User, BookText, MessageSquare, Building2, Plus, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              Inspectrix
            </Link>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-60">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/dashboard/search" className="flex items-center gap-2 text-sm">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/dashboard/posts" className="flex items-center gap-2 text-sm">
                    <BookText className="h-4 w-4" />
                    <span>Posts</span>
                  </Link>
                  <Link href="/dashboard/messages" className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                  <Link href="/dashboard/business" className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4" />
                    <span>My Business</span>
                  </Link>
                  <Button variant="outline" className="mt-4 w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative hidden md:flex h-10 w-full max-w-sm items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search..." className="pl-9 w-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/create">
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </Link>
            <Link href="/dashboard/business/register">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Building2 className="mr-2 h-4 w-4" />
                Register Business
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Link href="/dashboard/profile">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`} />
                <AvatarFallback>{(user.name || user.email).charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="hidden w-64 shrink-0 border-r bg-gray-50 md:block">
          <div className="sticky top-16 overflow-y-auto p-4">
            <nav className="flex flex-col gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard/search" className="flex items-center gap-2 text-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Link href="/dashboard/posts" className="flex items-center gap-2 text-sm">
                <BookText className="h-4 w-4" />
                <span>Posts</span>
              </Link>
              <Link href="/dashboard/messages" className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link href="/dashboard/business" className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4" />
                <span>My Business</span>
              </Link>
              <Button variant="outline" className="mt-4" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

