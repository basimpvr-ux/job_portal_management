import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Eye,
  Plus,
  X,
  Save,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/post-job")({
  component: JobPost,
  head: () => ({
    meta: [
      { title: "Post a Job | JobPortal" },
      {
        name: "description",
        content:
          "Publish a job opening on JobPortal and reach thousands of qualified candidates.",
      },
      { property: "og:title", content: "Post a Job | JobPortal" },
      {
        property: "og:description",
        content: "Publish a job opening and reach thousands of qualified candidates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const JobPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Job Posted Successfully",
        description: "Your job posting is now live and visible to candidates.",
      });
    }, 1500);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

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
              <Badge variant="secondary">Employer</Badge>
              <a href="/employer/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </a>
              <a href="/employer/jobs">
                <Button variant="outline">My Jobs</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
            <p className="text-muted-foreground">
              Find the perfect candidate for your open position
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Essential details about the position</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Senior Frontend Developer"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobType">Employment Type *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            placeholder="e.g., San Francisco, CA"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experienceLevel">Experience Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                            <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                            <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Work Style</Label>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remote" />
                          <Label htmlFor="remote">Remote</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hybrid" />
                          <Label htmlFor="hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="onsite" />
                          <Label htmlFor="onsite">On-site</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compensation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compensation</CardTitle>
                    <CardDescription>Salary and benefits information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salaryMin">Minimum Salary</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="salaryMin" placeholder="80,000" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salaryMax">Maximum Salary</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="salaryMax" placeholder="120,000" className="pl-10" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits &amp; Perks</Label>
                      <Textarea
                        id="benefits"
                        placeholder="Health insurance, 401k, flexible PTO, stock options..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Detailed description and requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements *</Label>
                      <Textarea
                        id="requirements"
                        placeholder="List the required qualifications, experience, and skills..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Key Responsibilities</Label>
                      <Textarea
                        id="responsibilities"
                        placeholder="Outline the main responsibilities and day-to-day tasks..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Required Skills &amp; Technologies</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill and press Enter"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <Button type="button" onClick={addSkill} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Application Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Settings</CardTitle>
                    <CardDescription>How candidates can apply</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationMethod">Application Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="How should candidates apply?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal">Apply through JobPortal</SelectItem>
                          <SelectItem value="email">Email application</SelectItem>
                          <SelectItem value="external">External website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="applicationDeadline">Application Deadline</Label>
                      <Input id="applicationDeadline" type="date" />
                    </div>

                    <div className="space-y-3">
                      <Label>Additional Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="featured" />
                          <Label htmlFor="featured">Mark as Featured (+$50)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="urgent" />
                          <Label htmlFor="urgent">Mark as Urgent (+$25)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="confidential" />
                          <Label htmlFor="confidential">
                            Keep company name confidential
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview
                    </CardTitle>
                    <CardDescription>How your job will appear to candidates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-semibold text-foreground mb-1">Job Title</h3>
                      <p className="text-sm text-muted-foreground mb-2">Your Company</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>Location</span>
                        <Briefcase className="h-3 w-3" />
                        <span>Full-time</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Job description preview...
                      </p>
                      <Button size="sm" className="w-full">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                    <CardDescription>Job posting costs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Basic Job Post</span>
                      <span>$99</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Featured (+50% visibility)</span>
                      <span>+$50</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Urgent (highlighted)</span>
                      <span>+$25</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$99</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Publishing..." : "Publish Job"}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">💡 Tips for Better Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Use clear, specific job titles</p>
                    <p>• Include salary range to attract more candidates</p>
                    <p>• Highlight company culture and benefits</p>
                    <p>• Keep requirements realistic and focused</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
