import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { WelcomeCard } from '../WelcomeCard';
import { mockJobs, mockApplications } from '../../data/mockData';
import { Briefcase, Clock, CheckCircle, XCircle, Eye, MapPin, DollarSign } from 'lucide-react';

export function StudentDashboard({ user }) {
  const recentJobs = mockJobs.slice(0, 3);
  const myApplications = mockApplications.filter((app) => app.studentId === '2');

  const applicationStats = {
    total: myApplications.length,
    pending: myApplications.filter((app) => app.status === 'pending').length,
    shortlisted: myApplications.filter((app) => app.status === 'shortlisted').length,
    interviewed: myApplications.filter((app) => app.status === 'interviewed').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'shortlisted':
        return 'bg-blue-500';
      case 'interviewed':
        return 'bg-purple-500';
      case 'selected':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'shortlisted':
        return <Eye className="h-4 w-4" />;
      case 'interviewed':
      case 'selected':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {user && <WelcomeCard user={user} />}

      <div>
        <h1>Student Dashboard</h1>
        <p className="text-muted-foreground">
          Track your applications and discover new opportunities.
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.total}</div>
            <p className="text-xs text-muted-foreground">Total applications submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.shortlisted}</div>
            <p className="text-xs text-muted-foreground">Under consideration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviewed</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.interviewed}</div>
            <p className="text-xs text-muted-foreground">Interview completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Job & Application Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Opportunities</CardTitle>
            <CardDescription>Latest jobs matching your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Apply
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View All Jobs
            </Button>
          </CardContent>
        </Card>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your application status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myApplications.map((application) => {
              const job = mockJobs.find((j) => j.id === application.jobId);
              return (
                <div key={application.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${getStatusColor(application.status)} text-white`}>
                    {getStatusIcon(application.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{job?.title}</h4>
                    <p className="text-sm text-muted-foreground">{job?.company}</p>
                    <p className="text-xs text-muted-foreground">
                      Applied on {application.appliedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {application.status}
                  </Badge>
                </div>
              );
            })}
            <Button className="w-full" variant="outline">
              View All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to improve your chances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Profile Completion</span>
            <span className="font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
          <div className="text-sm text-muted-foreground">
            Add your resume, portfolio, and skills to increase visibility to employers.
          </div>
          <Button size="sm">Complete Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
