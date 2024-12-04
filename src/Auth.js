// const cookie = useCookie('XSRF-TOKEN');
// console.log(cookie);

export const isAuthenticated = () => {
  localStorage.getItem("userToken");

  return !!localStorage.getItem("userToken");
};
export const loginUser = (token) => {
  localStorage.setItem("userToken", token);
};

export const logoutUser = () => {
  localStorage.removeItem("userToken");
};
