
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiggyBank, Car, Home, Plane, BookOpen, Gift, Plus, Target } from "lucide-react";

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      date: "2023-12-31",
      category: "savings",
      icon: PiggyBank,
    },
    {
      id: 2,
      name: "New Car",
      target: 25000,
      current: 5000,
      date: "2024-06-30",
      category: "purchase",
      icon: Car,
    },
    {
      id: 3,
      name: "House Down Payment",
      target: 50000,
      current: 15000,
      date: "2025-01-15",
      category: "purchase",
      icon: Home,
    },
    {
      id: 4,
      name: "Vacation to Europe",
      target: 5000,
      current: 1500,
      date: "2023-08-15",
      category: "travel",
      icon: Plane,
    },
    {
      id: 5,
      name: "Master's Degree",
      target: 30000,
      current: 12000,
      date: "2024-09-01",
      category: "education",
      icon: BookOpen,
    },
    {
      id: 6,
      name: "Wedding Fund",
      target: 15000,
      current: 7500,
      date: "2024-05-22",
      category: "event",
      icon: Gift,
    },
  ]);

  // Calculate progress percentage
  const calcProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get days remaining
  const getDaysRemaining = (dateString: string) => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = targetDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get goal card color based on progress
  const getGoalCardClass = (progress: number) => {
    if (progress >= 75) return "border-finance-income";
    if (progress >= 50) return "border-finance-savings";
    if (progress >= 25) return "border-amber-500";
    return "border-finance-expense";
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
            <p className="text-muted-foreground">Set and track your financial objectives.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new financial goal</DialogTitle>
                <DialogDescription>
                  Set the details for your new financial objective.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Goal Name
                  </Label>
                  <Input id="name" placeholder="e.g. Emergency Fund" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Target Amount
                  </Label>
                  <Input id="amount" type="number" placeholder="10000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="current" className="text-right">
                    Current Amount
                  </Label>
                  <Input id="current" type="number" placeholder="0" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Target Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 w-full max-w-md mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
          </TabsList>
          
          {["all", "savings", "purchase", "travel", "education", "event"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals
                  .filter((goal) => tab === "all" || goal.category === tab)
                  .map((goal) => {
                    const progress = calcProgress(goal.current, goal.target);
                    const daysRemaining = getDaysRemaining(goal.date);
                    
                    return (
                      <Card 
                        key={goal.id}
                        className={`glass-card hover:border-primary transition-colors ${getGoalCardClass(progress)}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle>{goal.name}</CardTitle>
                              <CardDescription>Target: {formatCurrency(goal.target)}</CardDescription>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <goal.icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{formatCurrency(goal.current)}</span>
                                <span>{formatCurrency(goal.target)}</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{progress}% completed</span>
                                <span>{daysRemaining} days left</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span>Target date: {formatDate(goal.date)}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Edit Goal</Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
              </div>
              {goals.filter((goal) => tab === "all" || goal.category === tab).length === 0 && (
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No goals found in this category.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Goals;
