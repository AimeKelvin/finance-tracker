
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Authenticated users see the dashboard
  if (isAuthenticated) {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }

  // Non-authenticated users see the landing page
  return (
    <Layout>
      <div className="flex flex-col items-center min-h-[85vh] justify-center py-12 animate-fade-in">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              AI-Powered Finance
            </span>
            <h1 className="font-bold text-4xl md:text-6xl tracking-tight mb-4">
              Smart Finance Tracking with AI Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take control of your finances with our intelligent tracking system and
              receive personalized advice from our AI financial advisor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AuthModal>
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </AuthModal>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl">📊</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Smart Dashboard</h3>
              <p className="text-muted-foreground">
                Interactive charts and visualizations that make understanding your finances simple.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center animate-fade-in delay-100">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🤖</span>
              </div>
              <h3 className="text-lg font-medium mb-2">AI Advisor</h3>
              <p className="text-muted-foreground">
                Get personalized financial advice and answers to your money questions.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg flex flex-col items-center text-center animate-fade-in delay-200">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🔒</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Bank-level security ensures your financial data stays private and protected.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
      </div>
    </Layout>
  );
};

export default Index;
