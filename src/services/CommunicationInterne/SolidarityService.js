import apiClient from "../apiClient";

class SolidarityService {
  static async getAllSolidarityOlympics() {
    return await apiClient.get("/solidarite-olympique/all");
  }
}

export default SolidarityService;
