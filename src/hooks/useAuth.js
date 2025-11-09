import { useState, useEffect } from 'react';

const STORAGE_KEY = 'placement_portal_auth';

// Utility: derive name from email
const deriveNameFromEmail = (email) => {
  const localPart = email.split('@')[0];
  const nameParts = localPart
    .split(/[._-]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .filter(part => part.length > 0);

  if (nameParts.length > 1) return nameParts.join(' ');
  return nameParts[0] || 'User';
};

// Utility: derive role from email
const deriveRoleFromEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase() || '';

  if (email.toLowerCase().includes('admin') || domain.includes('admin')) return 'admin';
  if (email.toLowerCase().includes('placement') || email.toLowerCase().includes('officer') || email.toLowerCase().includes('career'))
    return 'placement-officer';
  if (domain.includes('student') || domain.includes('.edu') || domain.includes('university') || domain.includes('college'))
    return 'student';
  return 'employer';
};

export function useAuth() {
  const [authState, setAuthState] = useState({
    user: null,
    isLoading: true,
    error: null,
  });

  // Load user from localStorage
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        if (storedAuth) {
          const userData = JSON.parse(storedAuth);
          userData.createdAt = new Date(userData.createdAt);
          setAuthState({
            user: userData,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem(STORAGE_KEY);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!credentials.email || !credentials.password)
        throw new Error('Please enter both email and password');

      if (credentials.password.length < 6)
        throw new Error('Invalid credentials');

      const name = deriveNameFromEmail(credentials.email);
      const role = deriveRoleFromEmail(credentials.email);

      let department;
      let company;

      if (role === 'student' || role === 'placement-officer' || role === 'admin') {
        const domain = credentials.email.split('@')[1];
        if (domain?.includes('cs') || domain?.includes('computer')) {
          department = 'Computer Science';
        } else if (domain?.includes('eng')) {
          department = 'Engineering';
        } else if (role === 'placement-officer') {
          department = 'Career Services';
        } else {
          department = 'General';
        }
      } else if (role === 'employer') {
        const domain = credentials.email.split('@')[1]?.toLowerCase() || '';
        if (domain.includes('infosys')) {
          company = 'Infosys Limited';
        } else if (domain.includes('tcs')) {
          company = 'Tata Consultancy Services';
        } else if (domain.includes('wipro')) {
          company = 'Wipro Technologies';
        } else if (domain.includes('hcl')) {
          company = 'HCL Technologies';
        } else if (domain.includes('tech') || domain.includes('mahindra')) {
          company = 'Tech Mahindra';
        } else {
          const companyName = domain.split('.')[0];
          company = companyName.charAt(0).toUpperCase() + companyName.slice(1) + ' Technologies';
        }
      }

      const authUser = {
        id: Date.now().toString(),
        name,
        email: credentials.email,
        role,
        department,
        company,
        createdAt: new Date(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));

      setAuthState({
        user: authUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Signup
  const signup = async (signupData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!signupData.name || !signupData.email || !signupData.password)
        throw new Error('Please fill in all required fields');

      if (signupData.password.length < 6)
        throw new Error('Password must be at least 6 characters long');

      const newUser = {
        id: Date.now().toString(),
        name: signupData.name,
        email: signupData.email,
        role: signupData.role,
        department: signupData.department,
        company: signupData.company,
        phone: signupData.phone,
        createdAt: new Date(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated: !!authState.user,
  };
}
