
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line,
  Legend
} from "recharts";
import { Calendar, TrendingUp } from "lucide-react";

const Analytics = () => {
  // Sample data for the charts
  const monthlyData = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 3000 },
    { name: "Apr", income: 2780, expenses: 3908 },
    { name: "May", income: 1890, expenses: 4800 },
    { name: "Jun", income: 2390, expenses: 3800 },
    { name: "Jul", income: 3490, expenses: 2300 },
    { name: "Aug", income: 4000, expenses: 2400 },
    { name: "Sep", income: 3000, expenses: 1398 },
    { name: "Oct", income: 2000, expenses: 3000 },
    { name: "Nov", income: 2780, expenses: 3908 },
    { name: "Dec", income: 1890, expenses: 4800 },
  ];

  const categoryData = [
    { name: "Housing", value: 35 },
    { name: "Food", value: 20 },
    { name: "Transport", value: 15 },
    { name: "Utilities", value: 10 },
    { name: "Entertainment", value: 15 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#FF0000', '#8884d8'];

  const trendData = [
    { name: "Week 1", spending: 1200 },
    { name: "Week 2", spending: 1400 },
    { name: "Week 3", spending: 1000 },
    { name: "Week 4", spending: 1800 },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
          <p className="text-muted-foreground">Visualize your financial data and discover insights.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs defaultValue="monthly" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">2023</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Income vs. Expenses</CardTitle>
              <CardDescription>Monthly breakdown of your income and expenses</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="hsl(var(--finance-income))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="hsl(var(--finance-expense))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money is being spent</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Spending Trend</CardTitle>
              <CardDescription>Weekly spending pattern for this month</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="spending" 
                      stroke="hsl(var(--finance-savings))" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Savings Rate</CardTitle>
                <TrendingUp className="text-finance-income h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">18.5%</div>
              <p className="text-sm text-muted-foreground">
                Your savings rate is above the recommended 15%
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Biggest Expense</CardTitle>
                <div className="w-4 h-4 rounded-full bg-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">Housing</div>
              <p className="text-sm text-muted-foreground">
                35% of your monthly expenses
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Change</CardTitle>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-finance-income/10 text-finance-income">
                  +5.2%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">$245.80</div>
              <p className="text-sm text-muted-foreground">
                Increase in savings compared to last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
