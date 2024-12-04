import apiClient from "../apiClient";

class PurchaseOrderService {
  static async getAllPurchaseOrders() {
    return await apiClient.get("/purchase-orders/all");
  }

  static async getPurchaseOrderById(purchaseId) {
    return await apiClient.get(`/purchase-orders/${purchaseId}`);
  }

  static async createPurchaseOrder(purchaseOrder) {
    return await apiClient.post("/purchase-orders/add", purchaseOrder);
  }

  static async updatePurchaseOrder(purchaseId, purchaseOrder) {
    return await apiClient.put(`/purchase-orders/${purchaseId}`, purchaseOrder);
  }

  static async deletePurchaseOrder(purchaseId) {
    return await apiClient.delete(`/purchase-orders/${purchaseId}`);
  }

  static async generatePurchaseOrders() {
    return await apiClient.get("/purchase-orders/generate");
  }
}

export default PurchaseOrderService;
