"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, ExternalLink, Heart, MessageCircle, Share2, Star, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChatBot } from "../../../components/chatbot"

// Mock data based on the ID
const getMockService = (id: string) => {
  const services = {
    "1": {
      id: 1,
      name: "Amazon",
      category: "E-commerce",
      rating: 4.5,
      reviews: 12567,
      price: "$$",
      bestFor: ["Wide selection", "Fast delivery"],
      logo: "/placeholder.svg?height=100&width=200",
      bestChoice: true,
      description:
        "Amazon is a global e-commerce platform that offers a wide variety of products including electronics, books, home goods, and more. Known for their fast shipping and customer service, Amazon provides various delivery options including same-day and next-day delivery in many areas.",
      pros: [
        "Extensive product selection",
        "Fast shipping (Prime membership)",
        "Easy returns",
        "Competitive pricing",
        "Customer reviews",
      ],
      cons: [
        "Can be overwhelming to navigate",
        "Some third-party seller issues",
        "Premium features require subscription",
      ],
      alternatives: [
        { id: 2, name: "Walmart", rating: 4.2, price: "$" },
        { id: 3, name: "Target", rating: 4.3, price: "$$" },
      ],
      features: {
        Shipping: "Free with Prime, Same-day available",
        Returns: "30-day returns on most items",
        Payment: "Credit cards, debit cards, gift cards",
        Support: "24/7 customer service",
        "Mobile App": "Yes, highly rated",
      },
    },
    "4": {
      id: 4,
      name: "Uber",
      category: "Transportation",
      rating: 4.1,
      reviews: 23456,
      price: "$$$",
      bestFor: ["Wide availability", "Quick pickup"],
      logo: "/placeholder.svg?height=100&width=200",
      bestChoice: true,
      description:
        "Uber is a ride-hailing service that connects passengers with drivers through a mobile app. Operating in numerous cities worldwide, Uber offers various ride options from economy to luxury, with features like fare estimates, driver tracking, and cashless payments.",
      pros: [
        "Available in most cities",
        "Multiple vehicle options",
        "Cashless payment",
        "Driver rating system",
        "Trip tracking and sharing",
      ],
      cons: [
        "Surge pricing during peak hours",
        "Can be more expensive than public transport",
        "Availability varies by location",
      ],
      alternatives: [
        { id: 5, name: "Lyft", rating: 4.0, price: "$$" },
        { id: 6, name: "Ola", rating: 3.9, price: "$$" },
      ],
      features: {
        "Ride Types": "UberX, Comfort, XL, Black",
        Pricing: "Dynamic pricing based on demand",
        Payment: "Credit cards, cash in some locations",
        Safety: "Trip sharing, driver background checks",
        "Mobile App": "Yes, required for service",
      },
    },
    "6": {
      id: 6,
      name: "Mayo Clinic",
      category: "Healthcare",
      rating: 4.8,
      reviews: 5678,
      price: "$$$",
      bestFor: ["Specialized care", "Cutting-edge technology"],
      logo: "/placeholder.svg?height=100&width=200",
      bestChoice: true,
      description:
        "Mayo Clinic is a nonprofit medical organization dedicated to clinical practice, education, and research. Known for its innovative and high-quality patient care, Mayo Clinic offers specialized treatments across multiple locations in the United States.",
      pros: [
        "World-renowned specialists",
        "Comprehensive care approach",
        "Advanced diagnostic techniques",
        "Cutting-edge research",
        "Patient-centered care model",
      ],
      cons: [
        "Higher costs than standard providers",
        "May require travel to specialized centers",
        "Wait times for appointments",
      ],
      alternatives: [
        { id: 7, name: "Cleveland Clinic", rating: 4.7, price: "$$$" },
        { id: 8, name: "Johns Hopkins", rating: 4.8, price: "$$$" },
      ],
      features: {
        Specialties: "Cardiology, Oncology, Neurology, and more",
        Appointments: "In-person and virtual options",
        Insurance: "Accepts most major providers",
        Locations: "Multiple campuses across the US",
        Research: "Leading clinical trials and studies",
      },
    },
  }

  return services[id as keyof typeof services] || null
}

export default function CompareDetailPage() {
  const params = useParams()
  const [service, setService] = useState<any>(null)
  const [showChatbot, setShowChatbot] = useState(false)

  useEffect(() => {
    // Fetch the service based on the ID
    if (params.id) {
      const fetchedService = getMockService(params.id as string)
      setService(fetchedService)
    }
  }, [params.id])

  if (!service) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/search">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">{service.name}</h2>
          {service.bestChoice && (
            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Best Choice
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            Visit Site
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <img src={service.logo || "/placeholder.svg"} alt={service.name} className="h-16 w-32 object-contain" />
              <div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.category}</CardDescription>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{service.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({service.reviews.toLocaleString()} reviews)</span>
                  <span className="text-sm font-medium">{service.price}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex-1">
                    Compare
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">
                    Reviews
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 py-4">
                  <div>
                    <h3 className="mb-2 font-medium">About</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium">Pros</h3>
                      <ul className="space-y-1">
                        {service.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
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
                              className="mr-2 h-4 w-4 shrink-0 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-medium">Cons</h3>
                      <ul className="space-y-1">
                        {service.cons.map((con: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
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
                              className="mr-2 h-4 w-4 shrink-0 text-red-500"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Best For</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.bestFor.map((feature: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="py-4">
                  <Table>
                    <TableBody>
                      {Object.entries(service.features).map(([feature, value], index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{feature}</TableCell>
                          <TableCell>{value as string}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="compare" className="py-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Alternatives to {service.name}</h3>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-green-50">
                          <TableCell className="font-medium">{service.name} (Current)</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1">{service.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>{service.price}</TableCell>
                          <TableCell>
                            <Button size="sm">Visit</Button>
                          </TableCell>
                        </TableRow>
                        {service.alternatives.map((alt: any) => (
                          <TableRow key={alt.id}>
                            <TableCell className="font-medium">{alt.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1">{alt.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>{alt.price}</TableCell>
                            <TableCell>
                              <Link href={`/dashboard/compare/${alt.id}`}>
                                <Button size="sm" variant="outline">
                                  Compare
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 flex justify-center">
                      <Button>View Full Comparison</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="py-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Customer Reviews</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on {service.reviews.toLocaleString()} reviews
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{service.rating}</span>
                        <span className="text-sm text-muted-foreground">/ 5</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-100 text-center leading-8">J</div>
                            <div>
                              <div className="font-medium">John D.</div>
                              <div className="text-xs text-muted-foreground">2 days ago</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-sm">
                          Fantastic service! I've been using {service.name} for years and the quality has remained
                          consistently high. The customer service is exceptional when needed.
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Helpful (23)
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <MessageCircle className="h-3.5 w-3.5" />
                            Reply
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-100 text-center leading-8">S</div>
                            <div>
                              <div className="font-medium">Sarah L.</div>
                              <div className="text-xs text-muted-foreground">1 week ago</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 text-gray-300" />
                          </div>
                        </div>
                        <p className="text-sm">
                          Overall good experience with {service.name}. The only issue I've had is with occasional
                          delays, but the quality makes up for it. Would recommend.
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Helpful (17)
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <MessageCircle className="h-3.5 w-3.5" />
                            Reply
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-100 text-center leading-8">M</div>
                            <div>
                              <div className="font-medium">Michael T.</div>
                              <div className="text-xs text-muted-foreground">2 weeks ago</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3.5 w-3.5 text-gray-300" />
                            <Star className="h-3.5 w-3.5 text-gray-300" />
                          </div>
                        </div>
                        <p className="text-sm">
                          The prices have increased recently which is disappointing. Service is still good but I'm
                          considering alternatives now due to cost.
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Helpful (8)
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                            <MessageCircle className="h-3.5 w-3.5" />
                            Reply
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why this is the best choice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on our analysis, {service.name} ranks highest in its category due to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
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
                    className="mr-2 h-4 w-4 shrink-0 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Highest overall rating in {service.category}
                </li>
                <li className="flex items-start text-sm">
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
                    className="mr-2 h-4 w-4 shrink-0 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Best value for the price range
                </li>
                <li className="flex items-start text-sm">
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
                    className="mr-2 h-4 w-4 shrink-0 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Most positive customer reviews
                </li>
                <li className="flex items-start text-sm">
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
                    className="mr-2 h-4 w-4 shrink-0 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Superior features compared to alternatives
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setShowChatbot(true)}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Ask for More Details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-md border p-2 flex items-center">
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <span className="font-bold text-sm">VISA</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Credit Card</div>
                    <div className="text-xs text-muted-foreground">Recommended</div>
                  </div>
                </div>
                <div className="rounded-md border p-2 flex items-center">
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <span className="font-bold text-sm">PP</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">PayPal</div>
                    <div className="text-xs text-muted-foreground">Fast and secure</div>
                  </div>
                </div>
                <div className="rounded-md border p-2 flex items-center">
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <span className="font-bold text-sm">AP</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Apple Pay</div>
                    <div className="text-xs text-muted-foreground">Mobile only</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">How does pricing compare to competitors?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {service.name} offers competitive pricing in the {service.price} range. While not always the
                    cheapest option, the service quality and features provide excellent value for money compared to
                    alternatives in the same category.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">What makes this service unique?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {service.name} stands out for its {service.bestFor.join(" and ")}, which many competitors struggle
                    to match. Their focus on customer satisfaction and continuous improvement has helped them maintain a
                    leading position in the market.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm">Are there any hidden costs?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    While {service.name}'s base pricing is straightforward, some premium features may require additional
                    payment. We recommend reviewing their pricing page for the most current information on any potential
                    additional costs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-t-lg md:rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Chat Assistant</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowChatbot(false)}>
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
                  className="h-4 w-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <ChatBot service={service} />
          </div>
        </div>
      )}
    </div>
  )
}

