import apiClient from "../apiClient";

const InvoiceService = {
  getAllInvoices() {
    return apiClient.get("/invoices/all");
  },

  getInvoiceById(invoiceId) {
    return apiClient.get(`/invoices/${invoiceId}`);
  },

  createInvoice(invoiceData) {
    return apiClient.post("/invoices/add", invoiceData);
  },

  updateInvoice(invoiceId, invoiceData) {
    return apiClient.put(`/invoices/update/${invoiceId}`, invoiceData);
  },

  deleteInvoice(invoiceId) {
    return apiClient.delete(`/invoices/${invoiceId}`);
  },

  markAsPaid(invoiceId) {
    return apiClient.post(`/invoices/${invoiceId}/mark-as-paid`);
  },
};

export default InvoiceService;
