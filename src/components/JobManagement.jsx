import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { mockJobs } from "../data/mockData";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export function JobManagement({ userRole }) {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;

    if (userRole === "employer") {
      return matchesSearch && matchesStatus && job.employerId === "3";
    }

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "closed":
        return "bg-red-500";
      case "draft":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const canCreateJob = userRole === "admin" || userRole === "employer";
  const canEditJob = userRole === "admin" || userRole === "employer";

  const JobCard = ({ job }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className={`text-white ${getStatusColor(job.status)}`}
          >
            {job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            ₹{job.salary.min.toLocaleString()} - ₹
            {job.salary.max.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {job.applicationsCount} applications
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Deadline: {job.deadline.toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSelectedJob(job)}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>

          {userRole === "student" && <Button size="sm">Apply Now</Button>}

          {canEditJob && (
            <>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const CreateJobDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Job Posting</DialogTitle>
          <DialogDescription>
            Fill in the details for your new job posting.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="e.g. Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="e.g. Engineering" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. Hyderabad" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum Salary (INR)</Label>
              <Input id="salaryMin" type="number" placeholder="415000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum Salary (INR)</Label>
              <Input id="salaryMax" type="number" placeholder="664000" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List required qualifications, skills, and experience..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills</Label>
            <Input
              id="skills"
              placeholder="e.g. JavaScript, React, Node.js (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input id="deadline" type="date" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Job Posting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const JobDetailsDialog = () => (
    <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
      {selectedJob && (
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob.title}</DialogTitle>
            <DialogDescription>
              {selectedJob.company} • {selectedJob.location}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Badge variant="secondary" className="capitalize">
                {selectedJob.type}
              </Badge>
              <Badge
                variant="secondary"
                className={`text-white ${getStatusColor(selectedJob.status)}`}
              >
                {selectedJob.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Salary Range</h4>
                <p className="text-muted-foreground">
                  ₹{selectedJob.salary.min.toLocaleString()} - ₹
                  {selectedJob.salary.max.toLocaleString()}{" "}
                  {selectedJob.salary.currency}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Applications</h4>
                <p className="text-muted-foreground">
                  {selectedJob.applicationsCount} candidates applied
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Job Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Posted:</span>{" "}
                {selectedJob.postedDate.toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Deadline:</span>{" "}
                {selectedJob.deadline.toLocaleDateString()}
              </div>
            </div>
          </div>

          <DialogFooter>
            {userRole === "student" && (
              <Button>Apply for this Position</Button>
            )}
            <Button variant="outline" onClick={() => setSelectedJob(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>
            {userRole === "student"
              ? "Job Opportunities"
              : userRole === "employer"
              ? "My Job Postings"
              : "Job Management"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "student"
              ? "Discover and apply for exciting career opportunities"
              : userRole === "employer"
              ? "Manage your job postings and track applications"
              : "Oversee all job postings and applications"}
          </p>
        </div>

        {canCreateJob && (
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search criteria"
              : "No job postings available at the moment"}
          </p>
        </div>
      )}

      <CreateJobDialog />
      <JobDetailsDialog />
    </div>
  );
}
