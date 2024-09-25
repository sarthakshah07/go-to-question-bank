export const getUser = () => {
  const userData =
    typeof window !== "undefined" && localStorage.getItem("user");
  if (!userData) return null;
  const user = JSON.parse(userData);
  console.log("user", user);
  return user;
};

export function setUser(user) {
  typeof window !== "undefined" &&
    localStorage.setItem("user", JSON.stringify(user));
}

export function removeUser() {
  typeof window !== "undefined" && localStorage.removeItem("user");
}
