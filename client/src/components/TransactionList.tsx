
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown, 
  Home, 
  CreditCard, 
  ShoppingCart, 
  Droplet, 
  Tv, 
  Fuel, 
  Music, 
  DollarSign,
  Wifi,
  Bike,
  Smartphone,
  Utensils,
  HeartPulse,
  Plane,
  Gamepad2,
  GraduationCap,
  Scissors
} from "lucide-react";

// Enhanced transaction data with more realistic expenses and better category mapping
const transactions = [
  {
    id: "t1",
    date: "2023-06-01",
    description: "Rent Payment",
    category: "Housing",
    amount: -2000,
    icon: Home,
  },
  {
    id: "t2",
    date: "2023-06-02",
    description: "Salary Deposit",
    category: "Income",
    amount: 5000,
    icon: DollarSign,
  },
  {
    id: "t3",
    date: "2023-06-03",
    description: "Grocery Store",
    category: "Food",
    amount: -150.75,
    icon: ShoppingCart,
  },
  {
    id: "t4",
    date: "2023-06-04",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    icon: Tv,
  },
  {
    id: "t5",
    date: "2023-06-05",
    description: "Gas Station",
    category: "Transport",
    amount: -45.80,
    icon: Fuel,
  },
  {
    id: "t6",
    date: "2023-06-05",
    description: "Freelance Payment",
    category: "Income",
    amount: 950,
    icon: CreditCard,
  },
  {
    id: "t7",
    date: "2023-06-06",
    description: "Water Bill",
    category: "Utilities",
    amount: -78.50,
    icon: Droplet,
  },
  {
    id: "t8",
    date: "2023-06-07",
    description: "Spotify Premium",
    category: "Entertainment",
    amount: -9.99,
    icon: Music,
  },
  {
    id: "t9",
    date: "2023-06-08",
    description: "Internet Bill",
    category: "Utilities",
    amount: -65.00,
    icon: Wifi,
  },
  {
    id: "t10",
    date: "2023-06-09",
    description: "Bicycle Repair",
    category: "Transport",
    amount: -89.99,
    icon: Bike,
  },
];

export function TransactionList() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof transactions[0];
    direction: "ascending" | "descending";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sort transactions based on current sort configuration
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filter transactions based on search term
  const filteredTransactions = sortedTransactions.filter(transaction => {
    return (
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Request sort
  const requestSort = (key: keyof typeof transactions[0]) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Render sort direction indicator
  const renderSortIcon = (key: keyof typeof transactions[0]) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Format amount with currency and color
  const formatAmount = (amount: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
    
    return (
      <span className={amount >= 0 ? "text-finance-income" : "text-finance-expense"}>
        {amount >= 0 ? "+" : "-"}{formatted}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'income':
        return 'bg-finance-income/10 text-finance-income border-finance-income/20';
      case 'housing':
      case 'utilities':
        return 'bg-finance-expense/10 text-finance-expense border-finance-expense/20';
      case 'entertainment':
      case 'food':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'transport':
        return 'bg-finance-savings/10 text-finance-savings border-finance-savings/20';
      default:
        return 'bg-finance-investment/10 text-finance-investment border-finance-investment/20';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("date")}
                    className="px-0 font-medium"
                  >
                    Date {renderSortIcon("date")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("description")}
                    className="px-0 font-medium"
                  >
                    Description {renderSortIcon("description")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("category")}
                    className="px-0 font-medium"
                  >
                    Category {renderSortIcon("category")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("amount")}
                    className="px-0 font-medium flex items-center ml-auto"
                  >
                    Amount {renderSortIcon("amount")}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="group animate-fade-in">
                    <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <transaction.icon className="h-4 w-4 text-primary" />
                        </div>
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-normal ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatAmount(transaction.amount)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
