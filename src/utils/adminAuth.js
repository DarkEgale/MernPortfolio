import API_HOST from '../config/api';

const LOGIN_PATH = '/admin/login';

export const clearAdminSession = () => {
  try {
    localStorage.removeItem('adminAuth');
  } catch {
    // localStorage can fail in private or restricted browser contexts.
  }
};

export const redirectToAdminLogin = () => {
  if (window.location.pathname !== LOGIN_PATH) {
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
  if (response.status === 401 || response.status === 403) {
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
