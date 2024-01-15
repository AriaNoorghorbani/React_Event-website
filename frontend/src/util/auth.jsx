export default function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getToken();
}
