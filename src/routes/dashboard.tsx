import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  User,
  FileText,
  Search,
  Bell,
  Clock,
  MapPin,
  Star,
  Eye,
  Edit,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: JobSeekerDashboard,
  head: () => ({
    meta: [
      { title: "Dashboard | JobPortal" },
      {
        name: "description",
        content:
          "Track your job applications, profile views, and recommended opportunities on your JobPortal dashboard.",
      },
      { property: "og:title", content: "Dashboard | JobPortal" },
      {
        property: "og:description",
        content: "Track your job applications and recommended opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const JobSeekerDashboard = () => {
  const stats = [
    { label: "Applications Sent", value: 23, icon: FileText, change: "+5 this week" },
    { label: "Profile Views", value: 156, icon: Eye, change: "+12 this week" },
    { label: "Saved Jobs", value: 8, icon: Star, change: "+2 this week" },
    { label: "Interview Requests", value: 3, icon: User, change: "+1 this week" },
  ];

  const recentApplications = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      appliedDate: "2024-01-12",
      status: "Under Review",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Studios",
      location: "Remote",
      appliedDate: "2024-01-10",
      status: "Application Sent",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "React Developer",
      company: "StartupXYZ",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$90k - $120k",
      match: 95,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "GrowthCo",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $130k",
      match: 88,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-warning text-warning-foreground";
      case "Under Review":
        return "bg-status-applied text-white";
      case "Application Sent":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">JobPortal</span>
              </Link>
              <Badge variant="secondary">Job Seeker</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/jobs">
                    <Button className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                      <Search className="h-6 w-6" />
                      <span>Search Jobs</span>
                    </Button>
                  </Link>
                  <a href="/profile">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <Edit className="h-6 w-6" />
                      <span>Update Profile</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Track your job application progress</CardDescription>
                  </div>
                  <a href="/applications">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{application.title}</h3>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {application.location}
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>
                  Complete your profile to get better matches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">75% Complete</span>
                    <span className="text-sm text-muted-foreground">3/4 sections</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>✓ Basic Information</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>✓ Work Experience</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>✓ Skills</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>○ Portfolio/Projects</span>
                    <a href="/profile" className="text-primary hover:underline">
                      Add
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recommended Jobs</CardTitle>
                    <CardDescription>Based on your profile</CardDescription>
                  </div>
                  <Link to="/jobs">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge variant="secondary">{job.match}% match</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location} • {job.type}
                      </div>
                      <div className="mt-1">{job.salary}</div>
                    </div>
                    <Button size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
                <CardDescription>Stay updated with new opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frontend Developer</span>
                    <span className="text-xs text-success">5 new</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">React Developer</span>
                    <span className="text-xs text-success">2 new</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
