import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building2, GraduationCap } from "lucide-react";

export function WelcomeCard({ user }) {
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "student":
        return "bg-blue-500";
      case "employer":
        return "bg-green-500";
      case "placement-officer":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <GraduationCap className="h-4 w-4" />;
      case "employer":
        return <Building2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Welcome back, {user.name}! {getRoleIcon(user.role)}
            </CardTitle>
            <CardDescription>
              You're signed in as a {user.role.replace("-", " ")}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className={`text-white ${getRoleColor(user.role)}`}
          >
            {user.role.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {user.createdAt.toLocaleDateString()}</span>
          </div>

          {(user.department || user.company) && (
            <div className="flex items-center gap-2 text-muted-foreground">
              {user.role === "employer" ? (
                <Building2 className="h-4 w-4" />
              ) : (
                <GraduationCap className="h-4 w-4" />
              )}
              <span>{user.department || user.company}</span>
            </div>
          )}

          {user.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
