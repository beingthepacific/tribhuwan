/* ===== PORTAL LOGIN & DASHBOARD FUNCTIONALITY ===== */

// Test credentials
const credentials = {
  students: {
    'student101': 'student123',
    'student102': 'student123',
    'student103': 'student123',
    'student104': 'student123'
  },
  teachers: {
    'T001': 'teacher123',
    'T002': 'teacher123',
    'T003': 'teacher123'
  }
};

// Current user
let currentUser = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initPortal();
  setupTabSwitching();
  setupFormSubmission();
  setupNavigation();
});

function initPortal() {
  // Check if user is already logged in
  const savedUser = localStorage.getItem('tribhuwan_user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    loadDashboard(user.type, user.id, user.name);
  }
}

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll('.login-tab-btn');
  const forms = document.querySelectorAll('.login-form');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.dataset.tab;

      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update active form
      forms.forEach(form => form.classList.remove('active'));
      document.querySelector(`#${tab}-login-form`).classList.add('active');
    });
  });
}

function setupFormSubmission() {
  const studentForm = document.getElementById('student-login-form');
  const teacherForm = document.getElementById('teacher-login-form');

  if (studentForm) {
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const roll = document.getElementById('student-roll').value;
      const password = document.getElementById('student-password').value;
      loginStudent(roll, password);
    });
  }

  if (teacherForm) {
    teacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('teacher-id').value;
      const password = document.getElementById('teacher-password').value;
      loginTeacher(id, password);
    });
  }
}

function loginStudent(roll, password) {
  if (credentials.students[roll] === password) {
    const user = {
      type: 'student',
      id: roll,
      name: getStudentName(roll)
    };
    localStorage.setItem('tribhuwan_user', JSON.stringify(user));
    loadDashboard('student', roll, user.name);
  } else {
    showNotification('Invalid Roll Number or Password', 'error');
  }
}

function loginTeacher(id, password) {
  if (credentials.teachers[id] === password) {
    const user = {
      type: 'teacher',
      id: id,
      name: getTeacherName(id)
    };
    localStorage.setItem('tribhuwan_user', JSON.stringify(user));
    loadDashboard('teacher', id, user.name);
  } else {
    showNotification('Invalid Employee ID or Password', 'error');
  }
}

function getStudentName(roll) {
  const names = {
    'student101': 'Raj Kumar Singh',
    'student102': 'Priya Sharma',
    'student103': 'Ankit Patel',
    'student104': 'Isha Verma'
  };
  return names[roll] || 'Student';
}

function getTeacherName(id) {
  const names = {
    'T001': 'Ms. Sharma',
    'T002': 'Mr. Patel',
    'T003': 'Mr. Kumar'
  };
  return names[id] || 'Teacher';
}

function loadDashboard(userType, userId, userName) {
  const loginPage = document.getElementById('login-page');
  const studentDashboard = document.getElementById('student-dashboard');
  const teacherDashboard = document.getElementById('teacher-dashboard');

  // Hide login page
  loginPage.style.display = 'none';

  // Show appropriate dashboard
  if (userType === 'student') {
    studentDashboard.style.display = 'flex';
    teacherDashboard.style.display = 'none';
    document.getElementById('student-name').textContent = userName;
    document.getElementById('profile-name').textContent = userName;
  } else if (userType === 'teacher') {
    teacherDashboard.style.display = 'flex';
    studentDashboard.style.display = 'none';
    document.getElementById('teacher-name').textContent = userName;
  }

  currentUser = { type: userType, id: userId, name: userName };
  setupDashboardNavigation(userType);
}

function setupNavigation() {
  // Already handled in setupDashboardNavigation
}

function setupDashboardNavigation(userType) {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.dashboard-section');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.dataset.section;

      // Update active nav item
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');

      // Update active section
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(`section-${section}`).classList.add('active');
    });
  });

  // Set initial active section
  navItems[0].classList.add('active');
  sections[0].classList.add('active');
}

function logout() {
  localStorage.removeItem('tribhuwan_user');
  currentUser = null;

  const loginPage = document.getElementById('login-page');
  const studentDashboard = document.getElementById('student-dashboard');
  const teacherDashboard = document.getElementById('teacher-dashboard');

  loginPage.style.display = 'flex';
  studentDashboard.style.display = 'none';
  teacherDashboard.style.display = 'none';

  // Reset forms
  document.getElementById('student-login-form').reset();
  document.getElementById('teacher-login-form').reset();
  document.querySelector('.login-tab-btn.active').classList.remove('active');
  document.querySelector('[data-tab="student"]').classList.add('active');
  document.querySelector('[data-tab="student"]').parentElement.nextElementSibling.classList.add('active');
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

function resetPassword(type) {
  showNotification(`Password reset email would be sent to your registered email address.`, 'info');
}

// STUDENT FUNCTIONS
function downloadResource(filename) {
  showNotification(`Downloading: ${filename}`, 'success');
}

function editProfile() {
  showNotification('Profile editing feature coming soon!', 'info');
}

function viewStudentDetails(rollNo) {
  showNotification(`Viewing details for Roll No: ${rollNo}`, 'info');
}

// TEACHER FUNCTIONS
function manageClass(className) {
  showNotification(`Managing class: ${className}`, 'info');
}

function publishResults(event) {
  event.preventDefault();
  const className = document.getElementById('result-class').value;
  const examType = document.getElementById('exam-type').value;

  if (!className || !examType) {
    showNotification('Please select class and exam type', 'error');
    return;
  }

  showNotification(`Results published for ${className} - ${examType}`, 'success');
  
  // Reset form
  event.target.reset();
}

function saveAttendance(event) {
  event.preventDefault();
  const className = document.getElementById('attendance-class').value;
  const date = document.getElementById('attendance-date').value;

  if (!className || !date) {
    showNotification('Please select class and date', 'error');
    return;
  }

  showNotification(`Attendance saved for ${className} on ${date}`, 'success');
  event.target.reset();
}

function deleteResource(resourceId) {
  showNotification('Resource deleted successfully', 'success');
}

// UTILITY FUNCTIONS
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
