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
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Globe,
  Briefcase,
  Heart,
  Award,
  Edit,
  Save,
  X,
} from "lucide-react";
import { mockCompanyProfiles } from "../data/mockData";

export function CompanyProfile({ userRole, companyId = "3" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState(
    mockCompanyProfiles.find((c) => c.id === companyId) ||
      mockCompanyProfiles[0]
  );

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setCompanyData(
      mockCompanyProfiles.find((c) => c.id === companyId) ||
        mockCompanyProfiles[0]
    );
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Company Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information and branding
          </p>
        </div>
        {userRole === "employer" && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Company Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyData.name}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={companyData.industry}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            industry: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            website: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {companyData.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {companyData.industry}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{companyData.headquarters}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{companyData.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded {companyData.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${companyData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {companyData.website}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="text-2xl font-semibold">
                {companyData.openPositions}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Recruiters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-semibold">
                {companyData.activeRecruiters}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Hires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-semibold">42</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>

        {/* About */}
        <TabsContent value="about" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>About the Company</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={companyData.description}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      description: e.target.value,
                    })
                  }
                  rows={6}
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {companyData.description}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Industry</Label>
                  <p className="text-muted-foreground">{companyData.industry}</p>
                </div>
                <div>
                  <Label>Company Size</Label>
                  <p className="text-muted-foreground">{companyData.size}</p>
                </div>
                <div>
                  <Label>Headquarters</Label>
                  <p className="text-muted-foreground">
                    {companyData.headquarters}
                  </p>
                </div>
                <div>
                  <Label>Founded</Label>
                  <p className="text-muted-foreground">{companyData.founded}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benefits */}
        <TabsContent value="benefits" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Benefits</CardTitle>
              <CardDescription>What we offer to our employees</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  {companyData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => {
                          const newBenefits = [...companyData.benefits];
                          newBenefits[index] = e.target.value;
                          setCompanyData({
                            ...companyData,
                            benefits: newBenefits,
                          });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newBenefits = companyData.benefits.filter(
                            (_, i) => i !== index
                          );
                          setCompanyData({
                            ...companyData,
                            benefits: newBenefits,
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCompanyData({
                        ...companyData,
                        benefits: [...companyData.benefits, "New Benefit"],
                      });
                    }}
                  >
                    Add Benefit
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {companyData.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <Heart className="h-5 w-5 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Culture */}
        <TabsContent value="culture" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Culture</CardTitle>
              <CardDescription>Our values and work environment</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  {companyData.culture.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={value}
                        onChange={(e) => {
                          const newCulture = [...companyData.culture];
                          newCulture[index] = e.target.value;
                          setCompanyData({
                            ...companyData,
                            culture: newCulture,
                          });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCulture = companyData.culture.filter(
                            (_, i) => i !== index
                          );
                          setCompanyData({
                            ...companyData,
                            culture: newCulture,
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCompanyData({
                        ...companyData,
                        culture: [...companyData.culture, "New Value"],
                      });
                    }}
                  >
                    Add Value
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {companyData.culture.map((value, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  We foster an inclusive and collaborative work environment
                  where innovation thrives. Our team members enjoy flexible work
                  arrangements and continuous learning opportunities.
                </p>
                <p>
                  Regular team-building activities, mentorship programs, and
                  professional development initiatives ensure that our employees
                  grow both personally and professionally.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
