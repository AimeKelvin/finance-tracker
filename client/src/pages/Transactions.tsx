
import { Layout } from "@/components/Layout";
import { TransactionList } from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Download, Calendar } from "lucide-react";

const Transactions = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">View and manage all your financial transactions.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Transaction
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Filter Transactions</CardTitle>
            <CardDescription>Narrow down your transactions by date, category, or amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last 30 days</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount Range</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" type="number" className="w-full" />
                  <span>-</span>
                  <Input placeholder="Max" type="number" className="w-full" />
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Filter className="h-4 w-4" /> Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <TransactionList />
          </TabsContent>
          
          <TabsContent value="income" className="mt-0">
            <TransactionList />
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <TransactionList />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No pending transactions found.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Transactions;
