import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Globe,
  FileText,
  TrendingUp,
} from "lucide-react";
import { mockStudentProfiles } from "../data/mockData";

export function CandidatesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = mockStudentProfiles.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      filterStatus === "all" || candidate.placementStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "seeking":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "not-interested":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "placed":
        return "Placed";
      case "seeking":
        return "Seeking Placement";
      case "not-interested":
        return "Not Interested";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Candidate Management</h1>
        <p className="text-muted-foreground">
          Browse and manage student candidate profiles
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates by name, department, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All Candidates
            </Button>
            <Button
              variant={filterStatus === "seeking" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("seeking")}
            >
              Seeking Placement
            </Button>
            <Button
              variant={filterStatus === "placed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("placed")}
            >
              Placed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCandidate?.id === candidate.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {candidate.department} • {candidate.year}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(candidate.placementStatus)}>
                    {getStatusLabel(candidate.placementStatus)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>CGPA: {candidate.cgpa}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{candidate.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCandidates.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No candidates found matching your criteria
              </CardContent>
            </Card>
          )}
        </div>

        {/* Candidate Details Panel */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {selectedCandidate ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedCandidate.name}</CardTitle>
                    <CardDescription>{selectedCandidate.email}</CardDescription>
                  </div>
                  <Badge
                    className={getStatusColor(selectedCandidate.placementStatus)}
                  >
                    {getStatusLabel(selectedCandidate.placementStatus)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="achievements">Awards</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {selectedCandidate.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {selectedCandidate.phone}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Academic Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Department</p>
                          <p>{selectedCandidate.department}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Year</p>
                          <p>{selectedCandidate.year}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CGPA</p>
                          <p>{selectedCandidate.cgpa}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedCandidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Links</h4>
                      <div className="space-y-2">
                        {selectedCandidate.github && (
                          <a
                            href={`https://${selectedCandidate.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Github className="h-4 w-4" />
                            {selectedCandidate.github}
                          </a>
                        )}
                        {selectedCandidate.linkedin && (
                          <a
                            href={`https://${selectedCandidate.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Linkedin className="h-4 w-4" />
                            {selectedCandidate.linkedin}
                          </a>
                        )}
                        {selectedCandidate.portfolio && (
                          <a
                            href={`https://${selectedCandidate.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            {selectedCandidate.portfolio}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Projects */}
                  <TabsContent value="projects" className="space-y-4 mt-4">
                    {selectedCandidate.projects.map((project, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {project.name}
                          </CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Achievements */}
                  <TabsContent value="achievements" className="space-y-3 mt-4">
                    {selectedCandidate.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <Award className="h-5 w-5 text-primary mt-0.5" />
                        <p className="text-sm">{achievement}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Select a candidate to view details
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
