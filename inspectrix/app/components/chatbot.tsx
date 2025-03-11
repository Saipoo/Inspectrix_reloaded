"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SendHorizontal, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample responses based on service
const getServiceResponses = (service: any) => {
  if (!service) return {}

  const defaultResponses = {
    greeting: `Hello! I'm your assistant for ${service.name}. How can I help you today?`,
    fallback: `I don't have specific information about that. Would you like to know more about ${service.name}'s features, pricing, or why it's our top recommendation?`,
  }

  const serviceSpecificResponses: Record<string, Record<string, string>> = {
    Amazon: {
      "why best": `Amazon is our top recommendation because it offers the most extensive product selection, has reliable shipping with options like Prime for faster delivery, and provides an easy-to-use platform with detailed customer reviews. Their customer service and return policy are also industry-leading.`,
      shipping: `Amazon offers several shipping options. With Prime membership ($14.99/month or $139/year), you get free two-day shipping on eligible items, and in many areas, same-day or next-day delivery is available. Without Prime, shipping costs vary based on the item and delivery speed you choose.`,
      alternatives: `The main alternatives to Amazon are Walmart and Target. Walmart offers lower prices on many items but has a smaller product selection. Target has higher quality store brands and a better in-store experience but higher prices on some items. Both have been improving their online presence and delivery options.`,
    },
    Uber: {
      "why best": `Uber is our top recommendation for ride-sharing because it has the widest availability across cities, offers multiple vehicle options ranging from economy to luxury, and provides reliable service with features like trip tracking, fare estimates, and cashless payment. Their driver rating system also helps maintain service quality.`,
      pricing: `Uber uses dynamic pricing that changes based on demand, time of day, and location. During peak hours, you may encounter "surge pricing" where rates increase. You can see a fare estimate before confirming your ride. Payment options include credit cards and, in some locations, cash.`,
      alternatives: `The main alternatives to Uber are Lyft and local ride-sharing services. Lyft offers similar services, often with competitive prices and driver incentives that may result in better availability in some areas. Local options vary by location but may offer more specialized services.`,
    },
    "Mayo Clinic": {
      "why best": `Mayo Clinic is our top recommendation for specialized healthcare because it consistently ranks among the best hospitals in the U.S. Their integrated approach means specialists work together on complex cases, they offer cutting-edge treatments often unavailable elsewhere, and their focus on research means patients can access innovative clinical trials.`,
      appointment: `Getting an appointment at Mayo Clinic typically requires a referral from your primary care physician. Wait times vary by specialty and urgency but can range from weeks to months for non-urgent cases. They do offer priority appointments for urgent medical needs.`,
      alternatives: `The main alternatives to Mayo Clinic include Cleveland Clinic and Johns Hopkins Hospital, which also offer excellent specialized care. These institutions have similar reputations for quality but may have different strengths in specific specialties or research areas.`,
    },
  }

  return {
    ...defaultResponses,
    ...(serviceSpecificResponses[service.name] || {}),
  }
}

// Helper to get a response based on the message content
const getResponse = (message: string, service: any) => {
  const responses = getServiceResponses(service)
  const lowerMsg = message.toLowerCase()

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi ") || lowerMsg === "hi") {
    return responses.greeting
  }

  if (lowerMsg.includes("why") && (lowerMsg.includes("best") || lowerMsg.includes("recommend"))) {
    return responses["why best"] || responses.fallback
  }

  if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
    return responses["shipping"] || responses.fallback
  }

  if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
    return responses["pricing"] || responses.fallback
  }

  if (lowerMsg.includes("appointment") || lowerMsg.includes("schedule")) {
    return responses["appointment"] || responses.fallback
  }

  if (lowerMsg.includes("alternative") || lowerMsg.includes("other") || lowerMsg.includes("competitor")) {
    return responses["alternatives"] || responses.fallback
  }

  return responses.fallback
}

// Message interface
interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot({ service }: { service: any }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: getServiceResponses(service).greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getResponse(inputValue, service)

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="mb-1 flex items-center">
                    <Bot className="mr-1 h-3 w-3" />
                    <span className="text-xs font-medium">Assistant</span>
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
                <div
                  className={`mt-1 text-right text-xs ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <div className="mt-2 text-xs text-center text-muted-foreground">
          Ask about features, pricing, alternatives, or why we recommend {service?.name}
        </div>
      </div>
    </div>
  )
}

