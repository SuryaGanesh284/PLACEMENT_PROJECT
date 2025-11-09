// Global variables
var currentUser = null;
var currentPage = 'dashboard';

// Sample data
var jobsData = [
    { id: 1, title: 'Software Developer', company: 'Infosys', location: 'Bangalore', salary: '₹5-7 LPA', status: 'Open' },
    { id: 2, title: 'Data Analyst', company: 'TCS', location: 'Mumbai', salary: '₹4-6 LPA', status: 'Open' },
    { id: 3, title: 'Web Developer', company: 'Wipro', location: 'Pune', salary: '₹4.5-6.5 LPA', status: 'Open' },
    { id: 4, title: 'System Engineer', company: 'HCL', location: 'Noida', salary: '₹3.5-5 LPA', status: 'Open' },
    { id: 5, title: 'Java Developer', company: 'Tech Mahindra', location: 'Chennai', salary: '₹5-6 LPA', status: 'Open' }
];

var applicationsData = [
    { id: 1, studentName: 'Priya Sharma', jobTitle: 'Software Developer', status: 'Pending', date: '2025-01-15' },
    { id: 2, studentName: 'Amit Verma', jobTitle: 'Data Analyst', status: 'Accepted', date: '2025-01-10' },
    { id: 3, studentName: 'Ravi Kumar', jobTitle: 'Web Developer', status: 'Rejected', date: '2025-01-05' },
    { id: 4, studentName: 'Sneha Patel', jobTitle: 'System Engineer', status: 'Pending', date: '2025-01-12' },
    { id: 5, studentName: 'Rahul Singh', jobTitle: 'Java Developer', status: 'Accepted', date: '2025-01-08' }
];

// Initialize app when page loads
window.onload = function() {
    setupEventListeners();
};

// Setup all event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Signup form
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Switch between login and signup
    document.getElementById('showSignup').addEventListener('click', function(e) {
        e.preventDefault();
        showSignupPage();
    });
    
    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginPage();
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation links
    var navLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    }
}

// Show login page
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'none';
}

// Show signup page
function showSignupPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

// Show main app
function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    // Determine role based on email
    var role = 'student';
    if (email.indexOf('admin') !== -1) {
        role = 'admin';
    } else if (email.indexOf('employer') !== -1) {
        role = 'employer';
    } else if (email.indexOf('officer') !== -1) {
        role = 'placement-officer';
    }
    
    // Create user object
    currentUser = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        role: role,
        phone: '9876543210',
        department: role === 'student' ? 'Computer Science' : null,
        company: role === 'employer' ? 'Infosys' : null
    };
    
    // Show main app
    document.getElementById('userNameDisplay').textContent = 'Hello, ' + currentUser.name;
    showMainApp();
    navigateToPage('dashboard');
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    
    var name = document.getElementById('signupName').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var role = document.getElementById('signupRole').value;
    
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    // Create user object
    currentUser = {
        id: 1,
        name: name,
        email: email,
        role: role,
        phone: '9876543210',
        department: role === 'student' ? 'Computer Science' : null,
        company: role === 'employer' ? 'TCS' : null
    };
    
    // Show main app
    document.getElementById('userNameDisplay').textContent = 'Hello, ' + currentUser.name;
    showMainApp();
    navigateToPage('dashboard');
}

// Handle logout
function handleLogout() {
    currentUser = null;
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    showLoginPage();
}

// Navigate to different pages
function navigateToPage(page) {
    currentPage = page;
    
    // Update active nav link
    var navLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
        if (navLinks[i].getAttribute('data-page') === page) {
            navLinks[i].classList.add('active');
        }
    }
    
    // Load page content
    var content = '';
    if (page === 'dashboard') {
        content = renderDashboard();
    } else if (page === 'jobs') {
        content = renderJobs();
    } else if (page === 'applications') {
        content = renderApplications();
    } else if (page === 'profile') {
        content = renderProfile();
    }
    
    document.getElementById('mainContent').innerHTML = content;
    
    // Re-attach event listeners for dynamic content
    attachDynamicEventListeners(page);
}

// Render dashboard page
function renderDashboard() {
    var pendingCount = 0;
    for (var i = 0; i < applicationsData.length; i++) {
        if (applicationsData[i].status === 'Pending') {
            pendingCount++;
        }
    }
    
    var html = '<div>';
    html += '<h2>Welcome, ' + currentUser.name + '!</h2>';
    html += '<p>Role: ' + currentUser.role.replace('-', ' ').toUpperCase() + '</p>';
    
    html += '<div class="dashboard-grid">';
    html += '<div class="card"><h3>Total Jobs</h3><p class="stat-number">' + jobsData.length + '</p></div>';
    html += '<div class="card"><h3>Total Applications</h3><p class="stat-number">' + applicationsData.length + '</p></div>';
    html += '<div class="card"><h3>Pending</h3><p class="stat-number">' + pendingCount + '</p></div>';
    html += '</div>';
    
    html += '<div class="card" style="margin-top: 20px;">';
    html += '<h3>Recent Jobs</h3>';
    html += '<table>';
    html += '<thead><tr><th>Job Title</th><th>Company</th><th>Location</th><th>Salary</th></tr></thead>';
    html += '<tbody>';
    
    for (var i = 0; i < 3 && i < jobsData.length; i++) {
        html += '<tr>';
        html += '<td>' + jobsData[i].title + '</td>';
        html += '<td>' + jobsData[i].company + '</td>';
        html += '<td>' + jobsData[i].location + '</td>';
        html += '<td>' + jobsData[i].salary + '</td>';
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Render jobs page
function renderJobs() {
    var html = '<div>';
    html += '<h2>Job Listings</h2>';
    
    html += '<div class="card">';
    html += '<table>';
    html += '<thead><tr><th>Job Title</th><th>Company</th><th>Location</th><th>Salary</th><th>Status</th><th>Action</th></tr></thead>';
    html += '<tbody>';
    
    for (var i = 0; i < jobsData.length; i++) {
        html += '<tr>';
        html += '<td>' + jobsData[i].title + '</td>';
        html += '<td>' + jobsData[i].company + '</td>';
        html += '<td>' + jobsData[i].location + '</td>';
        html += '<td>' + jobsData[i].salary + '</td>';
        html += '<td><span class="badge-open">' + jobsData[i].status + '</span></td>';
        html += '<td><button class="btn-small view-job-btn" data-id="' + jobsData[i].id + '">View</button></td>';
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Render applications page
function renderApplications() {
    var html = '<div>';
    html += '<h2>Applications</h2>';
    
    html += '<div class="card">';
    html += '<table>';
    html += '<thead><tr><th>Student Name</th><th>Job Title</th><th>Status</th><th>Applied Date</th><th>Action</th></tr></thead>';
    html += '<tbody>';
    
    for (var i = 0; i < applicationsData.length; i++) {
        var badgeClass = 'badge-' + applicationsData[i].status.toLowerCase();
        html += '<tr>';
        html += '<td>' + applicationsData[i].studentName + '</td>';
        html += '<td>' + applicationsData[i].jobTitle + '</td>';
        html += '<td><span class="' + badgeClass + '">' + applicationsData[i].status + '</span></td>';
        html += '<td>' + applicationsData[i].date + '</td>';
        html += '<td><button class="btn-small view-app-btn" data-id="' + applicationsData[i].id + '">View</button></td>';
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Render profile page
function renderProfile() {
    var html = '<div>';
    html += '<h2>My Profile</h2>';
    
    html += '<div class="card">';
    html += '<h3>Personal Information</h3>';
    html += '<div class="profile-info">';
    html += '<p><strong>Name:</strong> ' + currentUser.name + '</p>';
    html += '<p><strong>Email:</strong> ' + currentUser.email + '</p>';
    html += '<p><strong>Role:</strong> ' + currentUser.role.replace('-', ' ') + '</p>';
    
    if (currentUser.phone) {
        html += '<p><strong>Phone:</strong> ' + currentUser.phone + '</p>';
    }
    
    if (currentUser.department) {
        html += '<p><strong>Department:</strong> ' + currentUser.department + '</p>';
    }
    
    if (currentUser.company) {
        html += '<p><strong>Company:</strong> ' + currentUser.company + '</p>';
    }
    
    html += '</div>';
    html += '<div style="margin-top: 20px;">';
    html += '<button class="btn-secondary" id="editProfileBtn">Edit Profile</button>';
    html += '<button class="btn-secondary" id="changePasswordBtn" style="margin-left: 10px;">Change Password</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

// Attach event listeners to dynamically created content
function attachDynamicEventListeners(page) {
    if (page === 'jobs') {
        var jobBtns = document.querySelectorAll('.view-job-btn');
        for (var i = 0; i < jobBtns.length; i++) {
            jobBtns[i].addEventListener('click', function() {
                var jobId = this.getAttribute('data-id');
                alert('Viewing job details for job ID: ' + jobId);
            });
        }
    } else if (page === 'applications') {
        var appBtns = document.querySelectorAll('.view-app-btn');
        for (var i = 0; i < appBtns.length; i++) {
            appBtns[i].addEventListener('click', function() {
                var appId = this.getAttribute('data-id');
                alert('Viewing application details for application ID: ' + appId);
            });
        }
    } else if (page === 'profile') {
        var editBtn = document.getElementById('editProfileBtn');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                alert('Edit profile functionality coming soon!');
            });
        }
        
        var changePassBtn = document.getElementById('changePasswordBtn');
        if (changePassBtn) {
            changePassBtn.addEventListener('click', function() {
                alert('Change password functionality coming soon!');
            });
        }
    }
}
