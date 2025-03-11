"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AtSign, Image, Link2, LoaderCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreatePostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState("post")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [linkUrl, setLinkUrl] = useState("")
  const [linkTitle, setLinkTitle] = useState("")
  const [linkDescription, setLinkDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app we'd upload the file to a server and get back a URL
    // For this demo, we'll create a local object URL
    if (images.length >= 4) {
      setErrorMessage("You can only upload up to 4 images")
      return
    }

    setErrorMessage("")
    const newImages = Array.from(files)
      .slice(0, 4 - images.length)
      .map((file) => URL.createObjectURL(file))
    setImages([...images, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/dashboard/posts")
    } catch (error) {
      console.error("Post creation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create a Post</h2>
        <p className="text-muted-foreground">Share insights, promote businesses or ask questions</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Select value={postType} onValueChange={setPostType}>
                    <SelectTrigger className="w-full border-none px-0 text-sm shadow-none">
                      <SelectValue placeholder="Create a post" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">Create a post</SelectItem>
                      <SelectItem value="review">Write a review</SelectItem>
                      <SelectItem value="question">Ask a question</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full border-none px-0 text-xs text-muted-foreground shadow-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="e-commerce">E-commerce</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="restaurants">Restaurants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Textarea
                placeholder="What would you like to share?"
                className="mt-4 min-h-[150px] border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {images.length > 0 && (
                <div className={`mt-4 grid gap-2 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {images.map((img, index) => (
                    <div key={index} className="relative rounded-md">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full rounded-md object-cover"
                        style={{ height: "200px" }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {linkUrl && (
                <div className="mt-4 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{linkTitle || linkUrl}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        setLinkUrl("")
                        setLinkTitle("")
                        setLinkDescription("")
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove link</span>
                    </Button>
                  </div>
                  {linkDescription && <p className="mt-1 text-sm text-muted-foreground">{linkDescription}</p>}
                  <div className="mt-2 text-xs text-blue-500">{linkUrl}</div>
                </div>
              )}

              {errorMessage && <div className="mt-2 text-sm text-red-500">{errorMessage}</div>}

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="flex gap-2">
                  <label htmlFor="image-upload">
                    <Button variant="ghost" size="sm" className="gap-1" type="button" asChild>
                      <div className="cursor-pointer">
                        <Image className="h-4 w-4" />
                        <span>Image</span>
                      </div>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    type="button"
                    onClick={() => {
                      if (!linkUrl) {
                        setLinkUrl("https://")
                      }
                    }}
                  >
                    <Link2 className="h-4 w-4" />
                    <span>Link</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1" type="button">
                    <AtSign className="h-4 w-4" />
                    <span>Mention</span>
                  </Button>
                </div>
                <div>
                  <Button type="submit" disabled={isLoading || !content.trim()}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post"
                    )}
                  </Button>
                </div>
              </div>

              {linkUrl === "https://" && (
                <div className="mt-4 space-y-2 rounded-md border p-3">
                  <div className="text-sm font-medium">Add Link</div>
                  <Input placeholder="Enter URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                  <Input
                    placeholder="Link title (optional)"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Link description (optional)"
                    value={linkDescription}
                    onChange={(e) => setLinkDescription(e.target.value)}
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLinkUrl("")
                        setLinkTitle("")
                        setLinkDescription("")
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (linkUrl === "https://") {
                          setErrorMessage("Please enter a valid URL")
                          return
                        }
                        setErrorMessage("")
                      }}
                    >
                      Add Link
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-medium">Post Settings</h3>
            <Tabs defaultValue="public">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="public">Public</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="private">Private</TabsTrigger>
              </TabsList>
              <TabsContent value="public" className="mt-4">
                <p className="text-sm text-muted-foreground">Your post will be visible to everyone on Inspectrix</p>
              </TabsContent>
              <TabsContent value="connections" className="mt-4">
                <p className="text-sm text-muted-foreground">Your post will only be visible to your connections</p>
              </TabsContent>
              <TabsContent value="private" className="mt-4">
                <p className="text-sm text-muted-foreground">Your post will only be visible to you</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </form>
    </div>
  )
}

