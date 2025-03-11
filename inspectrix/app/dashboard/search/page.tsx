"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FilterX, Share, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    name: "Amazon",
    category: "E-commerce",
    rating: 4.5,
    reviews: 12567,
    price: "$$",
    bestFor: ["Wide selection", "Fast delivery"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: true,
  },
  {
    id: 2,
    name: "Walmart",
    category: "E-commerce",
    rating: 4.2,
    reviews: 8954,
    price: "$",
    bestFor: ["Affordable prices", "In-store pickup"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: false,
  },
  {
    id: 3,
    name: "Target",
    category: "E-commerce",
    rating: 4.3,
    reviews: 7621,
    price: "$$",
    bestFor: ["Quality products", "Good return policy"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: false,
  },
  {
    id: 4,
    name: "Uber",
    category: "Transportation",
    rating: 4.1,
    reviews: 23456,
    price: "$$$",
    bestFor: ["Wide availability", "Quick pickup"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: true,
  },
  {
    id: 5,
    name: "Lyft",
    category: "Transportation",
    rating: 4.0,
    reviews: 18734,
    price: "$$",
    bestFor: ["Competitive pricing", "Driver quality"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: false,
  },
  {
    id: 6,
    name: "Mayo Clinic",
    category: "Healthcare",
    rating: 4.8,
    reviews: 5678,
    price: "$$$",
    bestFor: ["Specialized care", "Cutting-edge technology"],
    logo: "/placeholder.svg?height=50&width=100",
    bestChoice: true,
  },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 100])
  const [minRating, setMinRating] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)

  // Filter results based on search term and filters
  const filteredResults = mockResults.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || item.category === category
    const priceLevel = item.price.length
    const matchesPrice = priceLevel >= 1 && priceLevel <= 3
    const matchesRating = item.rating >= minRating

    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  const resetFilters = () => {
    setCategory("all")
    setPriceRange([0, 100])
    setMinRating(0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Search & Compare</h2>
        <p className="text-muted-foreground">Find and compare businesses across multiple categories</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search services, products, businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          Filters
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button>Search</Button>
      </div>

      {showFilters && (
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 gap-1 text-sm">
              <FilterX className="h-4 w-4" />
              Reset filters
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Restaurants">Restaurants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="pt-2">
                <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>$</span>
                  <span>$$</span>
                  <span>$$$</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <Slider
                  defaultValue={[0]}
                  max={5}
                  step={0.5}
                  value={[minRating]}
                  onValueChange={([val]) => setMinRating(val)}
                />
                <span className="text-sm">{minRating}+</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Features</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature1" />
                  <label
                    htmlFor="feature1"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Free Shipping
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature2" />
                  <label
                    htmlFor="feature2"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same Day Delivery
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature3" />
                  <label
                    htmlFor="feature3"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Top Rated Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <Card key={item.id} className={`overflow-hidden ${item.bestChoice ? "border-green-500" : ""}`}>
              {item.bestChoice && (
                <div className="bg-green-500 text-white text-xs font-medium py-1 px-2 text-center">Best Choice</div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={item.logo || "/placeholder.svg"} alt={item.name} className="h-8 w-16 object-contain" />
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reviews:</span>
                    <span className="font-medium">{item.reviews.toLocaleString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Best for:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.bestFor.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/compare/${item.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {filteredResults.length > 0 && (
        <div className="rounded-lg border p-4 mt-8">
          <h3 className="text-lg font-medium mb-4">Compare Services</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="e-commerce">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <span>E-commerce</span>
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">3 services</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Service</th>
                          <th className="px-4 py-2 text-left">Rating</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Best For</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResults
                          .filter((item) => item.category === "E-commerce")
                          .map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item.logo || "/placeholder.svg"}
                                    alt={item.name}
                                    className="h-6 w-12 object-contain"
                                  />
                                  <span className="font-medium">{item.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex items-center">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-sm">{item.rating}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2">{item.price}</td>
                              <td className="px-4 py-2">
                                <div className="flex flex-wrap gap-1">
                                  {item.bestFor.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <Button size="sm">Visit</Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    <Button>Compare All</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="transportation">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <span>Transportation</span>
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">2 services</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Service</th>
                          <th className="px-4 py-2 text-left">Rating</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Best For</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResults
                          .filter((item) => item.category === "Transportation")
                          .map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item.logo || "/placeholder.svg"}
                                    alt={item.name}
                                    className="h-6 w-12 object-contain"
                                  />
                                  <span className="font-medium">{item.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex items-center">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-sm">{item.rating}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2">{item.price}</td>
                              <td className="px-4 py-2">
                                <div className="flex flex-wrap gap-1">
                                  {item.bestFor.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <Button size="sm">Visit</Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    <Button>Compare All</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}

