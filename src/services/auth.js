import api from './api';

export const login = async (username, password) => {
  // Formato x-www-form-urlencoded requerido por OAuth2PasswordRequestForm en FastAPI
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};