"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BusinessRegistration() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState("details")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    logo: null as File | null,
    plan: "basic",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/dashboard/business")
    } catch (error) {
      console.error("Business registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Register Your Business</h2>
        <p className="text-muted-foreground">Complete the form below to list your business on Inspectrix</p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="location">Location & Contact</TabsTrigger>
          <TabsTrigger value="plan">Choose Plan</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Provide basic information about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your business, services, and what makes you unique"
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Business Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="e-commerce">E-commerce</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Business Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed">
                      {formData.logo ? (
                        <img
                          src={URL.createObjectURL(formData.logo) || "/placeholder.svg"}
                          alt="Logo Preview"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      <p className="mt-1 text-xs text-gray-500">Recommended: 512x512px, JPEG or PNG, max 2MB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => setCurrentTab("location")}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location & Contact Information</CardTitle>
                <CardDescription>Where customers can find and contact your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="California"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="94103"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setCurrentTab("details")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setCurrentTab("plan")}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            <Card>
              <CardHeader>
                <CardTitle>Choose a Plan</CardTitle>
                <CardDescription>Select a visibility plan for your business</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.plan}
                  onValueChange={(value) => handleSelectChange("plan", value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="basic" id="basic" />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="basic" className="text-base font-medium">
                        Basic
                      </Label>
                      <p className="text-sm text-gray-500">Standard listing with basic features</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">Free</div>
                      <p className="text-sm text-gray-500">Forever</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-primary bg-primary/5 p-4">
                    <RadioGroupItem value="premium" id="premium" />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="premium" className="text-base font-medium">
                        Premium
                      </Label>
                      <p className="text-sm text-gray-500">Enhanced visibility, analytics, and priority placement</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">$29</div>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="enterprise" className="text-base font-medium">
                        Enterprise
                      </Label>
                      <p className="text-sm text-gray-500">
                        Custom solutions, dedicated support, and advanced features
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">$99</div>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setCurrentTab("location")}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

