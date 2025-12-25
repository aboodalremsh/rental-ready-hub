const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Get the stored auth token
 */
function getToken() {
  return localStorage.getItem('auth_token');
}

/**
 * Set the auth token
 */
export function setToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

/**
 * Make an authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    // Fetch can fail due to server down, CORS, blocked mixed-content, VPN/proxy, firewall, etc.
    if (error instanceof TypeError || String(error?.message || "").includes("Failed to fetch")) {
      throw new Error(
        "Cannot reach the backend at http://localhost:3001. Make sure the Node.js server is running on THIS device, then open http://localhost:3001/api/health to verify connectivity."
      );
    }
    throw error;
  }
}

// ============ AUTH API ============

export const authApi = {
  async signUp(email, password, fullName) {
    const data = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    });
    setToken(data.token);
    return data;
  },

  async signIn(email, password) {
    const data = await apiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  async signOut() {
    setToken(null);
    return { message: 'Signed out' };
  },

  async getCurrentUser() {
    const token = getToken();
    if (!token) return null;
    
    try {
      const data = await apiRequest('/auth/me');
      return data.user;
    } catch {
      setToken(null);
      return null;
    }
  },

  isAuthenticated() {
    return !!getToken();
  }
};

// ============ PROPERTIES API ============

export const propertiesApi = {
  async getAll() {
    return apiRequest('/properties');
  },

  async getFeatured() {
    return apiRequest('/properties/featured');
  },

  async getById(id) {
    return apiRequest(`/properties/${id}`);
  },

  async create(propertyData) {
    return apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }
};

// ============ RENTALS API ============

export const rentalsApi = {
  async getMyRentals() {
    return apiRequest('/rentals');
  },

  async create(rentalData) {
    return apiRequest('/rentals', {
      method: 'POST',
      body: JSON.stringify(rentalData),
    });
  },

  async update(id, data) {
    return apiRequest(`/rentals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
};

// ============ SAVED PROPERTIES API ============

export const savedApi = {
  async getAll() {
    return apiRequest('/saved');
  },

  async check(propertyId) {
    const data = await apiRequest(`/saved/check/${propertyId}`);
    return data.saved;
  },

  async save(propertyId) {
    return apiRequest('/saved', {
      method: 'POST',
      body: JSON.stringify({ property_id: propertyId }),
    });
  },

  async unsave(propertyId) {
    return apiRequest(`/saved/${propertyId}`, {
      method: 'DELETE',
    });
  }
};

// ============ CONTACT API ============

export const contactApi = {
  async send(messageData) {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }
};

// ============ HEALTH CHECK ============

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
