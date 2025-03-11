"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageSquare, MoreHorizontal, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: {
      name: "Jane Cooper",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Marketing Director",
    },
    content:
      "Just switched to @AmazonPrime and the delivery speed is incredible! Got my order in just 4 hours. Game changer for busy professionals. #ecommerce #productivity",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    shares: 2,
    liked: false,
    images: ["/placeholder.svg?height=300&width=600"],
  },
  {
    id: 2,
    author: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Journalist",
    },
    content:
      "Comparing ride-sharing apps this month. Uber consistently had the shortest wait times in my area, but Lyft had better pricing during peak hours. Full comparison on my blog next week! #transportation #apps",
    timestamp: "1 day ago",
    likes: 156,
    comments: 32,
    shares: 18,
    liked: true,
    images: [],
  },
  {
    id: 3,
    author: {
      name: "Lisa Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Healthcare Consultant",
    },
    content:
      "Just had a fantastic experience at Mayo Clinic. Their integrated care approach means all specialists communicate seamlessly. Highly recommend for complex conditions where coordination matters. #healthcare #patientcare",
    timestamp: "3 days ago",
    likes: 87,
    comments: 14,
    shares: 9,
    liked: false,
    images: ["/placeholder.svg?height=300&width=600", "/placeholder.svg?height=300&width=600"],
  },
  {
    id: 4,
    author: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Food Blogger",
    },
    content:
      "Did a side-by-side comparison of food delivery apps this weekend. DoorDash had the best restaurant selection, but Uber Eats won on delivery speed and tracking. GrubHub had the best promotions. What's your favorite? #fooddelivery #comparison",
    timestamp: "4 days ago",
    likes: 203,
    comments: 56,
    shares: 27,
    liked: false,
    images: ["/placeholder.svg?height=300&width=600"],
  },
]

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Community Posts</h2>
        <Link href="/dashboard/posts/create">
          <Button>Create Post</Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 pt-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border bg-card shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{post.author.role}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Save post</DropdownMenuItem>
                      <DropdownMenuItem>Hide post</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3">
                  <p className="text-sm">{post.content}</p>
                </div>
                {post.images.length > 0 && (
                  <div className={`mt-3 grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Post ${post.id} image ${index + 1}`}
                        className="w-full rounded-md object-cover"
                        style={{ height: "200px" }}
                      />
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div>{post.likes > 0 && <span>{post.likes} likes</span>}</div>
                  <div className="flex gap-4">
                    {post.comments > 0 && <span>{post.comments} comments</span>}
                    {post.shares > 0 && <span>{post.shares} shares</span>}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${post.liked ? "text-primary" : ""}`}
                    onClick={() => handleLike(post.id)}
                  >
                    {post.liked ? <Heart className="h-4 w-4 fill-primary" /> : <Heart className="h-4 w-4" />}
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="following" className="pt-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Follow more users</h3>
              <p className="text-sm text-muted-foreground">Start following users to see their posts here</p>
              <Button className="mt-4">Explore Users</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="popular" className="pt-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">We're working on curating the most popular posts for you</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="saved" className="pt-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">No saved posts yet</h3>
              <p className="text-sm text-muted-foreground">Save posts to view them later</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

