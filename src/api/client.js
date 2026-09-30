import axios from "axios";

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const tokens = {
  get access() { return localStorage.getItem("access"); },
  get refresh() { return localStorage.getItem("refresh"); },
  set({ access, refresh }) {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
  },
  clear() { localStorage.removeItem("access"); localStorage.removeItem("refresh"); },
};

client.interceptors.request.use((config) => {
  if (tokens.access) config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
});

// On 401, try to refresh the access token once, then retry the original request.
client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retried && tokens.refresh) {
      original._retried = true;
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
          refresh: tokens.refresh,
        });
        tokens.set(data);
        original.headers.Authorization = `Bearer ${data.access}`;
        return client(original);
      } catch {
        tokens.clear();
        window.location.hash = "#/login";
      }
    }
    return Promise.reject(error);
  }
);

// DRF returns either an array or a paginated { results } object.
export const unwrap = (res) => res.data.results ?? res.data;

export default client;
