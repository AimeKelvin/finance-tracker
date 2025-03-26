
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  BarChart, 
  Lightbulb, 
  Video, 
  FileText, 
  ArrowRight 
} from "lucide-react";

const LearnMore = () => {
  const articles = [
    {
      title: "The 50/30/20 Budget Rule Explained",
      description: "Learn how to allocate your income to needs, wants, and savings.",
      category: "Budgeting",
      readTime: "5 min read",
      icon: BarChart,
    },
    {
      title: "Emergency Fund: Why You Need One & How to Build It",
      description: "Discover the importance of having financial security for unexpected events.",
      category: "Savings",
      readTime: "7 min read",
      icon: Lightbulb,
    },
    {
      title: "Understanding Credit Scores and How to Improve Them",
      description: "A comprehensive guide to credit scores and strategies to boost yours.",
      category: "Credit",
      readTime: "10 min read",
      icon: Trophy,
    },
    {
      title: "Investing for Beginners: Getting Started in the Stock Market",
      description: "The basics of investing and how to build a portfolio with minimal risk.",
      category: "Investing",
      readTime: "12 min read",
      icon: GraduationCap,
    },
  ];

  const videos = [
    {
      title: "Personal Finance Basics In 10 Minutes",
      description: "Quick overview of important financial concepts everyone should know.",
      duration: "10:23",
      thumbnail: "https://picsum.photos/400/225",
    },
    {
      title: "How To Create A Monthly Budget",
      description: "Step-by-step guide to creating an effective monthly budget.",
      duration: "15:45",
      thumbnail: "https://picsum.photos/400/226",
    },
    {
      title: "Investing 101: How To Start Investing",
      description: "Learn the fundamentals of investing for long-term financial growth.",
      duration: "22:15",
      thumbnail: "https://picsum.photos/400/227",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center max-w-3xl mx-auto pb-8">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Financial Education
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Learn More About Personal Finance</h1>
          <p className="text-muted-foreground text-lg">
            Explore our educational resources to build your financial knowledge and make smarter decisions with your money.
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="articles" className="gap-2">
                <FileText className="h-4 w-4" /> Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="h-4 w-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-2">
                <GraduationCap className="h-4 w-4" /> Courses
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="articles" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="glass-card hover:border-primary/50 transition-all group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="bg-primary/10 text-primary text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mb-2">
                          {article.category}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <article.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{article.description}</CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary transition-colors">
                        Read article <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="glass-card overflow-hidden hover:border-primary/50 transition-all group">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{video.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-0">
            <div className="max-w-2xl mx-auto text-center p-8">
              <BookOpen className="h-16 w-16 text-primary/80 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Financial Mastery Courses</h3>
              <p className="text-muted-foreground mb-6">
                Our structured learning programs are coming soon! Join the waitlist to get early access to comprehensive financial courses.
              </p>
              <Button size="lg" className="gap-2">
                Join Waitlist <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center max-w-3xl mx-auto">
          <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Want Personalized Financial Guidance?</h2>
          <p className="text-muted-foreground mb-6">
            Our AI Advisor can help you navigate your specific financial situation and provide tailored advice.
          </p>
          <Button size="lg" className="gap-2">
            Try AI Advisor <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LearnMore;
