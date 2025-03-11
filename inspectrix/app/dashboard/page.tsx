import Link from "next/link"
import { BarChart3, Building2, MessageSquare, Search, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your Inspectrix dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+2 new items this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+7 new interactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 unread message</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Comparisons</CardTitle>
            <CardDescription>Your most recent service comparisons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">E-commerce Platforms</div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
                <div className="mt-2 text-sm">Compared 3 platforms based on price and rating</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Transportation Services</div>
                  <div className="text-sm text-muted-foreground">5 days ago</div>
                </div>
                <div className="mt-2 text-sm">Compared Uber, Ola, and Rapido based on availability</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Restaurant Delivery</div>
                  <div className="text-sm text-muted-foreground">1 week ago</div>
                </div>
                <div className="mt-2 text-sm">Compared 4 food delivery services based on delivery time</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/search">
              <div className="flex items-center rounded-lg border p-3 transition-colors hover:bg-gray-50">
                <Search className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">New Search</div>
                  <div className="text-sm text-muted-foreground">Compare services across categories</div>
                </div>
              </div>
            </Link>
            <Link href="/dashboard/business/register">
              <div className="flex items-center rounded-lg border p-3 transition-colors hover:bg-gray-50">
                <Building2 className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Register Business</div>
                  <div className="text-sm text-muted-foreground">Add your business to Inspectrix</div>
                </div>
              </div>
            </Link>
            <Link href="/dashboard/posts/create">
              <div className="flex items-center rounded-lg border p-3 transition-colors hover:bg-gray-50">
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
                  className="mr-3 h-5 w-5 text-primary"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <div>
                  <div className="font-medium">Create Post</div>
                  <div className="text-sm text-muted-foreground">Share insights or promote services</div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

