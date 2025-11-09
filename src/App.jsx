import React from "react";
import "./styles/simple.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("dashboard");
  const [user, setUser] = React.useState(null);

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [signupName, setSignupName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupRole, setSignupRole] = React.useState("student");

  const [showJobForm, setShowJobForm] = React.useState(false);
  const [newJobTitle, setNewJobTitle] = React.useState("");
  const [newJobLocation, setNewJobLocation] = React.useState("");
  const [newJobSalary, setNewJobSalary] = React.useState("");

  const [jobs, setJobs] = React.useState([
    { id: 1, title: "Software Developer", company: "Infosys", location: "Bangalore", salary: "₹5–7 LPA", status: "Open" },
    { id: 2, title: "Data Analyst", company: "TCS", location: "Mumbai", salary: "₹4–6 LPA", status: "Open" },
    { id: 3, title: "Web Developer", company: "Wipro", location: "Pune", salary: "₹4.5–6.5 LPA", status: "Open" },
    { id: 4, title: "System Engineer", company: "HCL", location: "Noida", salary: "₹3.5–5 LPA", status: "Open" },
  ]);

  const [applications, setApplications] = React.useState([
    { id: 1, studentName: "Priya Sharma", email: "student@test.com", jobTitle: "Software Developer", company: "Infosys", status: "Pending", date: "2025-01-15" },
    { id: 2, studentName: "Rajesh Kumar", email: "rajesh@test.com", jobTitle: "Data Analyst", company: "TCS", status: "Accepted", date: "2025-01-10" },
    { id: 3, studentName: "Anjali Patel", email: "anjali@test.com", jobTitle: "Web Developer", company: "Wipro", status: "Rejected", date: "2025-01-05" },
    { id: 4, studentName: "Vikram Singh", email: "vikram@test.com", jobTitle: "System Engineer", company: "HCL", status: "Pending", date: "2025-01-12" },
  ]);

  const [showAppModal, setShowAppModal] = React.useState(false);
  const [selectedAppForModal, setSelectedAppForModal] = React.useState(null);

  const [selectedAppInline, setSelectedAppInline] = React.useState(null);

  function handleLogin(e) {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return alert("Enter all fields");
    const role = loginEmail.includes("employer") ? "employer" : "student";
    const newUser = {
      name: loginEmail.split("@")[0],
      email: loginEmail,
      role,
      company: role === "employer" ? "Infosys" : undefined,
      phone: "9876543210",
      department: role === "student" ? "Computer Science" : undefined,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) return alert("Enter all fields");
    const newUser = {
      name: signupName,
      email: signupEmail,
      role: signupRole,
      company: signupRole === "employer" ? "TCS" : undefined,
      phone: "9876543210",
      department: signupRole === "student" ? "Computer Science" : undefined,
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUser(null);
    setLoginEmail("");
    setLoginPassword("");
    setIsSignup(false);
  }

  function goToPage(page) {
    setCurrentPage(page);
    setSelectedAppInline(null);
  }

  function applyToJob(job) {
    if (applications.some((a) => a.email === user.email && a.jobTitle === job.title)) {
      alert("You already applied to this job.");
      return;
    }
    const newApp = {
      id: applications.length + 1,
      studentName: user.name,
      email: user.email,
      jobTitle: job.title,
      company: job.company,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    setApplications((prev) => [newApp, ...prev]);
    alert("Application submitted.");
  }

  function postJob(e) {
    e.preventDefault();
    if (!newJobTitle || !newJobLocation || !newJobSalary) return alert("Fill all fields");
    const newJob = {
      id: jobs.length + 1,
      title: newJobTitle,
      company: user.company || "Employer Co",
      location: newJobLocation,
      salary: newJobSalary,
      status: "Open",
    };
    setJobs((p) => [newJob, ...p]);
    setShowJobForm(false);
    setNewJobTitle("");
    setNewJobLocation("");
    setNewJobSalary("");
  }

  function openStudentModal(app) {
    setSelectedAppForModal(app);
    setShowAppModal(true);
  }

  function closeStudentModal() {
    setSelectedAppForModal(null);
    setShowAppModal(false);
  }

  function viewInlineForEmployer(app) {
    setSelectedAppInline(app === selectedAppInline ? null : app);
  }

  if (!isLoggedIn && !isSignup) {
    return (
      <div className="container">
        <div className="auth-box">
          <h2>Login - Placement System</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" placeholder="Enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <p className="switch">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); }}>Signup here</a></p>
          <div className="test-logins">
            <p>Test Logins:</p>
            <p>Student: student@test.com</p>
            <p>Employer: employer@test.com</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn && isSignup) {
    return (
      <div className="container">
        <div className="auth-box">
          <h2>Signup - Placement System</h2>
          <form onSubmit={handleSignup}>
            <label>Full Name:</label>
            <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
            <label>Email:</label>
            <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            <label>Role:</label>
            <select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="employer">Employer</option>
            </select>
            <button type="submit" className="btn-primary">Create Account</button>
          </form>
          <p className="switch">Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }}>Login</a></p>
        </div>
      </div>
    );
  }

  const myApplications = applications.filter((a) => a.email === user.email);
  const employerJobs = jobs.filter((j) => j.company === (user.company || "Infosys"));
  const employerApplications = applications.filter((a) => a.company === (user.company || "Infosys"));

  const studentDashboard = (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p className="muted">Student Dashboard</p>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-title">Available Jobs</div>
          <div className="stat-num">{jobs.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">My Applications</div>
          <div className="stat-num">{myApplications.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending Status</div>
          <div className="stat-num">{myApplications.filter((a) => a.status === "Pending").length}</div>
        </div>
      </div>

      <div className="card">
        <h3>Available Job Openings</h3>
        <table className="main-table">
          <thead>
            <tr><th>Job Title</th><th>Company</th><th>Location</th><th>Salary</th><th>Action</th></tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td><button className="btn-small" onClick={() => applyToJob(job)}>Apply</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const studentApplicationsPage = (
    <div>
      <h3>My Applications</h3>
      <div className="card">
        <table className="main-table">
          <thead>
            <tr><th>Student Name</th><th>Job Title</th><th>Company</th><th>Status</th><th>Applied Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {myApplications.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center" }}>No applications yet.</td></tr>
            ) : myApplications.map((a) => (
              <tr key={a.id}>
                <td>{a.studentName}</td>
                <td>{a.jobTitle}</td>
                <td>{a.company}</td>
                <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td>{a.date}</td>
                <td><button className="btn-view" onClick={() => openStudentModal(a)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const studentProfile = (
    <div>
      <h3>My Profile</h3>
      <div className="card profile-card">
        <div className="profile-row"><strong>Name:</strong> {user.name}</div>
        <div className="profile-row"><strong>Email:</strong> {user.email}</div>
        <div className="profile-row"><strong>Role:</strong> {user.role}</div>
        <div className="profile-row"><strong>Phone:</strong> {user.phone}</div>
        {user.department && <div className="profile-row"><strong>Department:</strong> {user.department}</div>}
        <div style={{ marginTop: 15 }}>
          <button className="btn-secondary">Edit Profile</button>
          <button className="btn-secondary" style={{ marginLeft: 10 }}>Change Password</button>
        </div>
      </div>
    </div>
  );

  const employerDashboard = (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p className="muted">Employer Dashboard - {user.company}</p>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-title">Active Job Posts</div>
          <div className="stat-num">{employerJobs.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Applications</div>
          <div className="stat-num">{employerApplications.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending Review</div>
          <div className="stat-num">{employerApplications.filter((a) => a.status === "Pending").length}</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Applications</h3>
        <table className="main-table">
          <thead>
            <tr><th>Student Name</th><th>Position</th><th>Applied Date</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {employerApplications.slice(0, 5).map((a) => (
              <tr key={a.id}>
                <td>{a.studentName}</td>
                <td>{a.jobTitle}</td>
                <td>{a.date}</td>
                <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td><button className="btn-view" onClick={() => viewInlineForEmployer(a)}>View</button></td>
              </tr>
            ))}
            {employerApplications.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: "center" }}>No applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const employerManageJobs = (
    <div>
      <h3>Job Listings</h3>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button className="btn-secondary" onClick={() => setShowJobForm(true)}>Post New Job</button>
      </div>
      <div className="card">
        <table className="main-table">
          <thead>
            <tr><th>Job Title</th><th>Company</th><th>Location</th><th>Salary</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td><span className="badge open">Open</span></td>
                <td><button className="btn-view" onClick={() => viewInlineForEmployer({ ...job, studentName: "", email: "", date: "", status: "—" })}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const employerApplicationsPage = (
    <div>
      <h3>All Applications</h3>
      <div className="card">
        <table className="main-table">
          <thead>
            <tr><th>Student Name</th><th>Job Title</th><th>Company</th><th>Status</th><th>Applied Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {employerApplications.map((a) => (
              <tr key={a.id}>
                <td>{a.studentName}</td>
                <td>{a.jobTitle}</td>
                <td>{a.company}</td>
                <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td>{a.date}</td>
                <td><button className="btn-view" onClick={() => viewInlineForEmployer(a)}>View</button></td>
              </tr>
            ))}
            {employerApplications.length === 0 && <tr><td colSpan="6" style={{ textAlign: "center" }}>No applications found.</td></tr>}
          </tbody>
        </table>

        {selectedAppInline && (
          <div className="inline-details card">
            <h4>Application Details</h4>
            <div className="detail-box"><strong>Student Name:</strong> {selectedAppInline.studentName || "—"}</div>
            {selectedAppInline.email && <div className="detail-box"><strong>Email:</strong> {selectedAppInline.email}</div>}
            {selectedAppInline.jobTitle && <div className="detail-box"><strong>Job Title:</strong> {selectedAppInline.jobTitle}</div>}
            {selectedAppInline.company && <div className="detail-box"><strong>Company:</strong> {selectedAppInline.company}</div>}
            {selectedAppInline.status && <div className="detail-box"><strong>Status:</strong> {selectedAppInline.status}</div>}
            {selectedAppInline.date && <div className="detail-box"><strong>Applied Date:</strong> {selectedAppInline.date}</div>}
          </div>
        )}

      </div>
    </div>
  );

  const employerProfile = (
    <div>
      <h3>My Profile</h3>
      <div className="card profile-card">
        <div className="profile-row"><strong>Name:</strong> {user.name}</div>
        <div className="profile-row"><strong>Email:</strong> {user.email}</div>
        <div className="profile-row"><strong>Role:</strong> {user.role}</div>
        <div className="profile-row"><strong>Phone:</strong> {user.phone}</div>
        <div className="profile-row"><strong>Company:</strong> {user.company}</div>
        <div style={{ marginTop: 15 }}>
          <button className="btn-secondary">Edit Profile</button>
          <button className="btn-secondary" style={{ marginLeft: 10 }}>Change Password</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-title">Placement Management System</div>
        <ul>
          <li className={currentPage === "dashboard" ? "active" : ""} onClick={() => goToPage("dashboard")}>Dashboard</li>
          {user.role === "student" && <li className={currentPage === "browse" ? "active" : ""} onClick={() => goToPage("browse")}>Browse Jobs</li>}
          <li className={currentPage === "applications" ? "active" : ""} onClick={() => goToPage("applications")}>{user.role === "employer" ? "Applications" : "My Applications"}</li>
          <li className={currentPage === "profile" ? "active" : ""} onClick={() => goToPage("profile")}>{user.role === "employer" ? "Company Profile" : "My Profile"}</li>
          {user.role === "employer" && <li className={currentPage === "manage-jobs" ? "active" : ""} onClick={() => goToPage("manage-jobs")}>Manage Jobs</li>}
        </ul>
      </aside>

      <main className="content">
        <div className="header">
          <div className="title">Placement Management System</div>
          <div className="header-right">
            <span className="hello">Hello, {user.name} ({user.role})</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="page-body">
          {user.role === "student" && currentPage === "dashboard" && studentDashboard}
          {user.role === "student" && currentPage === "browse" && studentDashboard}
          {user.role === "student" && currentPage === "applications" && studentApplicationsPage}
          {user.role === "student" && currentPage === "profile" && studentProfile}

          {user.role === "employer" && currentPage === "dashboard" && employerDashboard}
          {user.role === "employer" && currentPage === "manage-jobs" && employerManageJobs}
          {user.role === "employer" && currentPage === "applications" && employerApplicationsPage}
          {user.role === "employer" && currentPage === "profile" && employerProfile}
        </div>
      </main>

      {showJobForm && (
        <div className="modal-overlay" onClick={() => setShowJobForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Post New Job</h3>
            <form onSubmit={postJob}>
              <label>Job Title</label>
              <input value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)} />
              <label>Location</label>
              <input value={newJobLocation} onChange={(e) => setNewJobLocation(e.target.value)} />
              <label>Salary</label>
              <input value={newJobSalary} onChange={(e) => setNewJobSalary(e.target.value)} />
              <div style={{ marginTop: 12 }}>
                <button className="btn-primary" type="submit">Post Job</button>
                <button className="btn-secondary" type="button" onClick={() => setShowJobForm(false)} style={{ marginLeft: 8 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAppModal && selectedAppForModal && (
        <div className="modal-overlay" onClick={closeStudentModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Application Details</h3>
            <hr />
            <div className="details-view">
              <div className="detail-box"><strong>Student Name:</strong> {selectedAppForModal.studentName}</div>
              <div className="detail-box"><strong>Email:</strong> {selectedAppForModal.email}</div>
              <div className="detail-box"><strong>Job Title:</strong> {selectedAppForModal.jobTitle}</div>
              <div className="detail-box"><strong>Company:</strong> {selectedAppForModal.company}</div>
              <div className="detail-box"><strong>Status:</strong> {selectedAppForModal.status}</div>
              <div className="detail-box"><strong>Applied Date:</strong> {selectedAppForModal.date}</div>
            </div>
            <button className="btn-close" onClick={closeStudentModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
