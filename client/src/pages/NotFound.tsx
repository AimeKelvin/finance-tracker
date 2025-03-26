
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="glass-card p-10 rounded-lg text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Button asChild className="gap-2">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
