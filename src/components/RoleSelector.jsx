import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Shield, GraduationCap, Building2, UserCheck } from "lucide-react";

const roles = [
  {
    id: "admin",
    title: "Administrator",
    description: "Manage system settings, user roles, and placement data",
    icon: Shield,
    color: "bg-red-500",
  },
  {
    id: "student",
    title: "Student",
    description:
      "Explore job opportunities, apply for positions, and track applications",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "employer",
    title: "Employer",
    description:
      "Post job listings, review applications, and interact with candidates",
    icon: Building2,
    color: "bg-green-500",
  },
  {
    id: "placement-officer",
    title: "Placement Officer",
    description:
      "Track placement records, generate reports, and facilitate interactions",
    icon: UserCheck,
    color: "bg-purple-500",
  },
];

export function RoleSelector({ onRoleSelect }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="container max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">Placement Management System</h1>
          <p className="text-muted-foreground">
            Select your role to access the placement portal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${role.color} text-white`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{role.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => onRoleSelect(role.id)}>
                  Login as {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
