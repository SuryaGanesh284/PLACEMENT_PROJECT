import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { WelcomeCard } from '../WelcomeCard';
import { mockJobs, mockApplications, mockUsers } from '../../data/mockData';
import { Briefcase, Users, Eye, Plus, Calendar, TrendingUp } from 'lucide-react';

export function EmployerDashboard({ user }) {
  const myJobs = mockJobs.filter((job) => job.employerId === '3');
  const myApplications = mockApplications.filter((app) =>
    myJobs.some((job) => job.id === app.jobId)
  );

  const stats = {
    totalJobs: myJobs.length,
    activeJobs: myJobs.filter((job) => job.status === 'active').length,
    totalApplications: myApplications.length,
    pendingReview: myApplications.filter((app) => app.status === 'pending').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      case 'draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {user && <WelcomeCard user={user} />}

      <div className="flex items-center justify-between">
        <div>
          <h1>Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your job postings and review candidate applications.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">Jobs posted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">Currently recruiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Eye className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>My Job Postings</CardTitle>
            <CardDescription>Manage your active job listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myJobs.map((job) => (
              <div key={job.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{job.title}</h4>
                    <Badge
                      variant="secondary"
                      className={`text-white ${getStatusColor(job.status)}`}
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.department}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.applicationsCount} applications
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Posted {job.postedDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View All Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidate applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myApplications.map((application) => {
              const job = mockJobs.find((j) => j.id === application.jobId);
              const student = mockUsers.find((u) => u.id === application.studentId);
              return (
                <div key={application.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-medium">{student?.name}</h4>
                    <p className="text-sm text-muted-foreground">{job?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Applied on {application.appliedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="secondary" className="capitalize">
                      {application.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button className="w-full" variant="outline">
              View All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Post New Job
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Browse Candidates
            </Button>
            <Button variant="outline" className="h-24 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
