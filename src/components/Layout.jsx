import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Settings,
  GraduationCap,
  Building2,
  ClipboardList,
  LogOut,
  User,
  ChevronDown,
  ArrowLeft,
  History,
  RotateCcw,
} from "lucide-react";

const navigationItems = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "jobs", label: "Job Management", icon: Briefcase },
    { id: "placements", label: "Placement Records", icon: FileText },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "settings", label: "System Settings", icon: Settings },
  ],
  student: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "jobs", label: "Job Opportunities", icon: Briefcase },
    { id: "applications", label: "My Applications", icon: ClipboardList },
    { id: "profile", label: "Profile", icon: GraduationCap },
  ],
  employer: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "jobs", label: "My Job Postings", icon: Briefcase },
    { id: "applications", label: "Applications", icon: ClipboardList },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "company", label: "Company Profile", icon: Building2 },
  ],
  "placement-officer": [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "placements", label: "Placement Records", icon: FileText },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "employers", label: "Employers", icon: Building2 },
    { id: "applications", label: "Applications", icon: ClipboardList },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ],
};

export function Layout({
  children,
  currentRole,
  onNavigate,
  currentSection,
  user,
  onLogout,
  onGoBack,
  canGoBack,
  navigationHistory,
}) {
  const items = navigationItems[currentRole] || [];

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSectionDisplayName = (section) => {
    const item = items.find((i) => i.id === section);
    return item ? item.label : section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Placement Portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onNavigate(item.id)}
                        isActive={currentSection === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />

              {/* Back Navigation */}
              {canGoBack && (
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onGoBack}
                    className="flex items-center gap-2"
                    title="Go back (Alt + ←)"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>

                  {/* Navigation History */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <History className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuLabel>Navigation History</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {navigationHistory
                        .slice()
                        .reverse()
                        .map((section, index) => {
                          const isCurrentSection = section === currentSection;
                          const reverseIndex =
                            navigationHistory.length - 1 - index;
                          return (
                            <DropdownMenuItem
                              key={`${section}-${reverseIndex}`}
                              onClick={() => {
                                if (!isCurrentSection) {
                                  const newHistory = navigationHistory.slice(
                                    0,
                                    reverseIndex + 1
                                  );
                                  onNavigate(section, newHistory);
                                }
                              }}
                              className={
                                isCurrentSection ? "bg-accent font-medium" : ""
                              }
                            >
                              <div className="flex items-center gap-2">
                                {isCurrentSection && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                                <span
                                  className={
                                    isCurrentSection ? "ml-0" : "ml-4"
                                  }
                                >
                                  {getSectionDisplayName(section)}
                                </span>
                              </div>
                            </DropdownMenuItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Right-side User Section */}
              <div className="ml-auto flex items-center gap-4">
                <span className="capitalize bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {currentRole.replace("-", " ")}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                  title="Switch to a different account role"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Switch</span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-auto p-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        {(user.department || user.company) && (
                          <p className="text-xs text-muted-foreground">
                            {user.department || user.company}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate("profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-blue-600 focus:text-blue-600"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Switch Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          {navigationHistory.length > 1 && (
            <div className="border-b bg-muted/50 px-6 py-3">
              <Breadcrumb>
                <BreadcrumbList>
                  {navigationHistory.map((section, index) => (
                    <React.Fragment key={`${section}-${index}`}>
                      <BreadcrumbItem>
                        {index === navigationHistory.length - 1 ? (
                          <BreadcrumbPage className="font-medium">
                            {getSectionDisplayName(section)}
                          </BreadcrumbPage>
                        ) : (
                          <button
                            onClick={() => {
                              const newHistory = navigationHistory.slice(
                                0,
                                index + 1
                              );
                              onNavigate(section, newHistory);
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {getSectionDisplayName(section)}
                          </button>
                        )}
                      </BreadcrumbItem>
                      {index < navigationHistory.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
