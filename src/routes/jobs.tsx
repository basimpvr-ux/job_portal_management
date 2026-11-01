import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  DollarSign,
  Users,
  ChevronDown,
  Heart,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/jobs")({
  component: () => <JobListing />>,
  head: () => ({
    meta: [
      { title: "Browse Jobs | JobPortal" },
      {
        name: "description",
        content:
          "Search thousands of open positions by title, location, salary, and work style. Find your dream job on JobPortal.",
      },
      { property: "og:title", content: "Browse Jobs | JobPortal" },
      {
        property: "og:description",
        content: "Search thousands of open positions and find your dream job.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      description:
        "We're looking for an experienced frontend developer to join our growing team. You'll work on cutting-edge projects using React, TypeScript, and modern web technologies.",
      requirements: ["React", "TypeScript", "5+ years experience"],
      featured: true,
      remote: true,
      urgent: false,
      companyLogo: "🏢",
      applicants: 45,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $130k",
      posted: "1 day ago",
      description:
        "Join our product team to drive innovation and growth. You'll work closely with engineering and design teams to build amazing products.",
      requirements: ["Product Management", "Agile", "3+ years experience"],
      featured: true,
      remote: false,
      urgent: true,
      companyLogo: "🚀",
      applicants: 32,
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Studios",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $100k",
      posted: "3 days ago",
      description:
        "Design beautiful and intuitive user experiences for our digital products. You'll work with a talented team of designers and developers.",
      requirements: ["UI/UX Design", "Figma", "2+ years experience"],
      featured: false,
      remote: true,
      urgent: false,
      companyLogo: "🎨",
      applicants: 28,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $140k",
      posted: "1 week ago",
      description:
        "Help us build and maintain scalable infrastructure. You'll work with modern cloud technologies and automation tools.",
      requirements: ["AWS", "Docker", "Kubernetes", "4+ years experience"],
      featured: false,
      remote: true,
      urgent: false,
      companyLogo: "☁️",
      applicants: 23,
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Dynamics",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$130k - $160k",
      posted: "5 days ago",
      description:
        "Join our data science team to build machine learning models and extract insights from large datasets.",
      requirements: ["Python", "Machine Learning", "SQL", "3+ years experience"],
      featured: false,
      remote: true,
      urgent: true,
      companyLogo: "🤖",
      applicants: 67,
    },
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];
  const salaryRanges = ["$50k+", "$75k+", "$100k+", "$125k+", "$150k+"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JobPortal</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <a href="/profile">
                <Button variant="outline">Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Find Your Dream Job</h1>

          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </Button>
              <p className="text-sm text-muted-foreground">Showing {jobs.length} jobs</p>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label htmlFor={type} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={level} />
                          <label htmlFor={level} className="text-sm">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Salary Range</h3>
                    <div className="space-y-2">
                      {salaryRanges.map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox id={range} />
                          <label htmlFor={range} className="text-sm">
                            {range}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Work Style</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remote" />
                        <label htmlFor="remote" className="text-sm">
                          Remote
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hybrid" />
                        <label htmlFor="hybrid" className="text-sm">
                          Hybrid
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="onsite" />
                        <label htmlFor="onsite" className="text-sm">
                          On-site
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-all duration-200 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{job.companyLogo}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary cursor-pointer">
                          {job.title}
                        </h3>
                        {job.featured && <Badge variant="secondary">Featured</Badge>}
                        {job.urgent && (
                          <Badge className="bg-warning text-warning-foreground">Urgent</Badge>
                        )}
                        {job.remote && <Badge variant="outline">Remote</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applicants} applicants
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a href={`/jobs/${job.id}`}>
                      <Button variant="outline">View Details</Button>
                    </a>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
