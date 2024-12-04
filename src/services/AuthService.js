import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  // Login user and store the access token in localStorage
  static async login(userData) {
    try {
      const response = await axios.post(API_URL + "signin", userData);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response ? error.response.data : error.message;
    }
  }

  // Register user and handle errors
  static async register(userData) {
    try {
      const response = await axios.post(API_URL + "signup", userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error.response ? error.response.data : error.message;
    }
  }

  // Logout user by removing the access token from localStorage
  static logout() {
    localStorage.removeItem("accessToken");
  }

  // Check if user is authenticated by checking the existence of the access token
  static isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }

  // Get the stored access token
  static getToken() {
    return localStorage.getItem("accessToken");
  }

  // Fetch user details from the server
  static async getUser() {
    try {
      const response = await axios.get("http://localhost:8080/api/user/info", {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw error.response ? error.response.data : error.message;
    }
  }
}
export default AuthService;
