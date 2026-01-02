import { api } from "./axiosConfig";

// Créer une commande (déjà existant)
export const placeOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

// Récupérer TOUTES les commandes (NOUVEAU)
export const getAllOrders = async () => {
  return await api.get("/orders");
};

// Récupérer une commande par ID
export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

// Mettre à jour le statut d'une commande
export const updateOrderStatus = async (id, status) => {
  return await api.put(`/orders/${id}`, { status });
};

// Supprimer une commande
export const deleteOrder = async (id) => {
  return await api.delete(`/orders/${id}`);
};