
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const suggestedQuestions = [
  "How can I reduce my monthly spending?",
  "What's the best way to save for retirement?",
  "Should I pay off debt or invest?",
  "How much should I have in my emergency fund?",
];

export function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI financial advisor. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (content: string = input) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after short delay
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        "How can I reduce my monthly spending?":
          "To reduce monthly spending, start by tracking all expenses for a month to identify patterns. Then create categories for essential vs. non-essential spending. Look for subscription services you rarely use, consider meal planning to reduce food costs, and try implementing a 24-hour rule before making any non-essential purchase over $50. Many clients save 15-20% just by becoming more aware of their spending habits.",
        "What's the best way to save for retirement?":
          "The best retirement saving strategy depends on your age and situation, but generally: 1) Maximize employer 401(k) matches (it's free money!), 2) Consider tax-advantaged accounts like Roth IRAs, 3) Aim to save 15-20% of income for retirement, and 4) Invest consistently over time. The earlier you start, the more time compound interest works in your favor.",
        "Should I pay off debt or invest?":
          "This depends on interest rates and your financial situation. Generally, prioritize high-interest debt (like credit cards) before investing. For lower-interest debt (like mortgages), you might benefit more by investing while making minimum payments. A good rule: if your expected investment return exceeds your debt interest rate, consider investing; otherwise, focus on debt repayment.",
        "How much should I have in my emergency fund?":
          "Most financial experts recommend having 3-6 months of essential expenses in your emergency fund. If you have variable income or work in an unstable industry, aim for 6-12 months. Start with a smaller goal of $1,000 to build momentum, then work toward the full amount. Keep your emergency fund in a high-yield savings account for easy access while earning some interest.",
      };
      
      const response = aiResponses[content] || 
        "Based on your financial profile, I'd recommend optimizing your budget to allocate 50% to necessities, 30% to discretionary spending, and 20% to savings and debt repayment. This balanced approach should help you achieve both short and long-term financial goals while maintaining flexibility for lifestyle choices.";
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full glass-card flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          </div>
          AI Financial Advisor
        </CardTitle>
        <CardDescription>Get personalized financial guidance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[350px] px-4">
          <div className="space-y-4 pt-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === "assistant" ? "animate-fade-in" : "animate-scale-in"
                }`}
              >
                <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                  <AvatarFallback>
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex gap-2 items-baseline">
                    <span className="font-medium">
                      {message.role === "user" ? "You" : "AI Advisor"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 animate-pulse">
                <Avatar className="bg-muted">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 pt-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full max-w-[300px] bg-muted rounded"></div>
                    <div className="h-4 w-full max-w-[270px] bg-muted rounded"></div>
                    <div className="h-4 w-full max-w-[250px] bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>

        {messages.length === 1 && !isLoading && (
          <div className="px-4 py-3">
            <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5 px-2 flex items-center gap-1"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Ask about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
