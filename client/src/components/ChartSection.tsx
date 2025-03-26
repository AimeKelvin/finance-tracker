
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, PieChart } from "recharts";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar, Pie, Cell, Legend } from "recharts";

// Mock data for the charts
const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 3800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
];

const categoryData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 20 },
  { name: "Transport", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Utilities", value: 10 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--finance-income))",
  "hsl(var(--finance-expense))",
  "hsl(var(--finance-savings))",
  "hsl(var(--finance-investment))",
  "hsl(var(--accent))",
];

export function ChartSection() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Financial Overview</h2>
          <TabsList className="glass glass-dark">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Monthly comparison of your cash flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--finance-income))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--finance-income))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--finance-expense))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--finance-expense))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="hsl(var(--finance-income))"
                      fillOpacity={1}
                      fill="url(#incomeGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="hsl(var(--finance-expense))"
                      fillOpacity={1}
                      fill="url(#expensesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Monthly Budget</CardTitle>
                <CardDescription>Budget vs actual spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: "Housing", budget: 2000, actual: 1800 },
                        { category: "Food", budget: 800, actual: 950 },
                        { category: "Transport", budget: 500, actual: 450 },
                        { category: "Utilities", budget: 400, actual: 380 },
                        { category: "Others", budget: 300, actual: 420 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="budget" fill="hsl(var(--primary))" />
                      <Bar dataKey="actual" fill="hsl(var(--finance-expense))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Your income sources and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Jan", salary: 4000, investments: 800, other: 100 },
                      { month: "Feb", salary: 4000, investments: 600, other: 200 },
                      { month: "Mar", salary: 4000, investments: 900, other: 150 },
                      { month: "Apr", salary: 4000, investments: 1100, other: 300 },
                      { month: "May", salary: 4500, investments: 900, other: 250 },
                      { month: "Jun", salary: 4500, investments: 950, other: 400 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="salary" fill="hsl(var(--primary))" stackId="a" />
                    <Bar dataKey="investments" fill="hsl(var(--finance-investment))" stackId="a" />
                    <Bar dataKey="other" fill="hsl(var(--finance-savings))" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Detailed view of your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData.map(category => ({
                      category: category.name,
                      amount: (category.value / 100) * 4500 // Convert percentage to dollar amount based on total spending
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`$${value}`, "Amount"]}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--finance-expense))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
