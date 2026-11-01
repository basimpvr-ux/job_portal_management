import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: () => <Landing />>,
  head: () => ({
    meta: [
      { title: "JobPortal – Find Your Dream Job" },
      {
        name: "description",
        content:
          "Connect with top companies and discover opportunities that match your skills. Browse jobs, post openings, and track your applications.",
      },
      { property: "og:title", content: "JobPortal – Find Your Dream Job" },
      {
        property: "og:description",
        content:
          "Connect with top companies and discover opportunities that match your skills and aspirations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const Landing = () => {
  const stats = [
    { label: "Active Jobs", value: "10,000+", icon: Briefcase },
    { label: "Companies", value: "2,500+", icon: Users },
    { label: "Job Seekers", value: "50,000+", icon: TrendingUp },
    { label: "Success Rate", value: "95%", icon: Star },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      featured: true,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $130k",
      posted: "1 day ago",
      featured: true,
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Studios",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $100k",
      posted: "3 days ago",
      featured: false,
    },
  ];

  const features = [
    {
      title: "Smart Job Matching",
      description:
        "AI-powered algorithm matches your skills with the perfect opportunities",
      icon: Search,
    },
    {
      title: "Real-time Applications",
      description:
        "Track your applications and get instant updates on your status",
      icon: Clock,
    },
    {
      title: "Company Insights",
      description: "Get detailed company information and employee reviews",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">JobPortal</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/jobs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Find Jobs
              </Link>
              <a
                href="/companies"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Companies
              </a>
              <a
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Dream Job
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match your skills
            and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/jobs">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/post-job">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center border-0 bg-card/50 backdrop-blur">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Jobs</h2>
            <p className="text-muted-foreground">Discover opportunities from top companies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      {job.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.type} • {job.posted}
                  </div>
                  <div className="text-sm font-medium text-foreground">{job.salary}</div>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                View All Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose JobPortal?</h2>
            <p className="text-muted-foreground">
              Everything you need to find your perfect job
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center border-0 bg-background">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="p-12 text-center bg-gradient-to-r from-primary to-secondary text-white border-0">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who found their dream jobs with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link to="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">JobPortal</span>
              </div>
              <p className="text-muted-foreground">
                Connecting talent with opportunity. Your career journey starts here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/jobs" className="hover:text-foreground">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <a href="/companies" className="hover:text-foreground">
                    Companies
                  </a>
                </li>
                <li>
                  <a href="/career-advice" className="hover:text-foreground">
                    Career Advice
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/post-job" className="hover:text-foreground">
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <a href="/talent-search" className="hover:text-foreground">
                    Search Talent
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="/about" className="hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
