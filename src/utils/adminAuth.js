import API_HOST from '../config/api';

const LOGIN_PATH = '/admin/login';
const ADMIN_PATH_PREFIX = '/admin';
const ADMIN_API_MARKER = '/api/admin/';

const isAdminPage = () => window.location.pathname.startsWith(ADMIN_PATH_PREFIX);

const isAdminApiUrl = (url) => {
  const value = typeof url === 'string' ? url : url?.url;
  return Boolean(value?.includes(ADMIN_API_MARKER));
};

export const clearAdminSession = () => {
  try {
    localStorage.removeItem('adminAuth');
  } catch {
    // localStorage can fail in private or restricted browser contexts.
  }
};

export const redirectToAdminLogin = () => {
  if (isAdminPage() && window.location.pathname !== LOGIN_PATH) {
    window.location.replace(LOGIN_PATH);
  }
};

export const forceAdminLogout = () => {
  clearAdminSession();
  redirectToAdminLogin();
};

export const logoutAdmin = async () => {
  clearAdminSession();

  try {
    await fetch(`${API_HOST}/api/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // The local session is already cleared; network failure should not block logout.
  } finally {
    redirectToAdminLogin();
  }
};

export const handleAdminAuthResponse = (response) => {
  if ((response.status === 401 || response.status === 403) && isAdminApiUrl(response.url)) {
    forceAdminLogout();
    return false;
  }

  return true;
};

export const adminFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  handleAdminAuthResponse(response);
  return response;
};

export const verifyAdminSession = async () => {
  if (!isAdminPage()) {
    return true;
  }

  const isMarkedLoggedIn = (() => {
    try {
      return localStorage.getItem('adminAuth') === 'true';
    } catch {
      return false;
    }
  })();

  if (!isMarkedLoggedIn) {
    forceAdminLogout();
    return false;
  }

  try {
    const response = await adminFetch(`${API_HOST}/api/admin/verify`, {
      method: 'GET',
    });

    if (!response.ok) return false;
    return true;
  } catch {
    forceAdminLogout();
    return false;
  }
};
