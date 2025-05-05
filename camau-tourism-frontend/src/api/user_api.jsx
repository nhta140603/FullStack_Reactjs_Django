const API_URL = "http://localhost:8000/api/client/";
const AVATAR_BASE_URL = "http://localhost:8000";

const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, { 
    ...options, 
    headers, 
    credentials: 'include'
  });

  if (!res.ok) throw new Error('Lỗi API');
  if (res.status === 204) return null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
};

export const getList = (resource) =>
    fetchWithAuth(`${API_URL}${resource}/`);

export const getDetail = (resource, slug) =>
  fetchWithAuth(`${API_URL}${resource}/${slug}/`);

export async function updateInfoUser(data) {
  return fetchWithAuth(`${API_URL}me/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getInfoUser() {
  return fetchWithAuth(`${API_URL}me/`, {
    method: "GET",
  });
}

export async function updateAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);

  return fetchWithAuth(`${API_URL}profile/avatar/`, {
    method: 'POST',
    body: formData,
  });
}

export function getAvatarUrl(src) {
  if (!src) return "/default-avatar.png";
  if (src.startsWith("http")) return src;
  return AVATAR_BASE_URL + src;
}