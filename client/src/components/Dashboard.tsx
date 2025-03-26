
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CircleDollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  PiggyBank, 
  CreditCard 
} from "lucide-react";
import { ChartSection } from "@/components/ChartSection";
import { TransactionList } from "@/components/TransactionList";
import { AIAdvisor } from "@/components/AIAdvisor";

export function Dashboard() {
  // Summary data for the stats cards
  const stats = [
    {
      title: "Total Balance",
      value: "$12,560.80",
      change: "+8.2%",
      trend: "up",
      description: "from last month",
      icon: CircleDollarSign,
      color: "primary",
    },
    {
      title: "Monthly Income",
      value: "$5,240.00",
      change: "+4.5%",
      trend: "up",
      description: "from last month",
      icon: TrendingUp,
      color: "finance-income",
    },
    {
      title: "Monthly Expenses",
      value: "$3,680.50",
      change: "+2.1%",
      trend: "up",
      description: "from last month",
      icon: CreditCard,
      color: "finance-expense",
    },
    {
      title: "Savings",
      value: "$1,560.00",
      change: "-3.4%",
      trend: "down",
      description: "from last month",
      icon: PiggyBank,
      color: "finance-savings",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${stat.color}/10`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Badge 
                  variant={stat.trend === "up" ? "default" : "destructive"} 
                  className="mr-1 px-1 py-0 h-auto"
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ChartSection />
          <TransactionList />
        </div>
        <div className="lg:col-span-1">
          <AIAdvisor />
        </div>
      </div>
    </div>
  );
}
