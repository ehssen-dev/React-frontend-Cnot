import apiClient from "../apiClient";

class SupplierService {
  static async getAllSuppliers() {
    return await apiClient.get("/suppliers/all");
  }

  static async getSupplierById(supplierId) {
    return await apiClient.get(`/suppliers/${supplierId}`);
  }

  static async createSupplier(supplierData) {
    return await apiClient.post("/suppliers/add", supplierData);
  }

  static async updateSupplier(supplierId, supplierData) {
    return await apiClient.put(`/suppliers/${supplierId}`, supplierData);
  }

  static async deleteSupplier(supplierId) {
    return await apiClient.delete(`/suppliers/${supplierId}`);
  }

  static async getTopPerformingSuppliers(minOnTimeDeliveryRate, minQualityRating) {
    return await apiClient.get("/suppliers/top-performing", {
      params: { minOnTimeDeliveryRate, minQualityRating },
    });
  }

  static async findBestSupplier() {
    return await apiClient.get("/suppliers/best");
  }
}

export default SupplierService;
