import { ref } from "@vue/runtime-core";
import { useApi } from "./useApi";

export function useCustomer() {
  const { getApi, postApi, putApi, deleteApi } = useApi();
  const customers = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCustomers() {
    loading.value = true;
    error.value = null;
    try {
      const response = await getApi("/customers", { include: "cars" });
      customers.value = response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch customers";
    } finally {
      loading.value = false;
    }
  }

  async function createCustomer(customerData: any) {
    loading.value = true;
    error.value = null;
    try {
      const response = await postApi("/customers", customerData);
      customers.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to create customer";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateCustomer(customerId: string, customerData: any) {
    loading.value = true;
    error.value = null;
    try {
      const response = await putApi(`/customers/${customerId}`, customerData);
      const index = customers.value.findIndex((c: any) => c.id === customerId);
      if (index !== -1) {
        customers.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to update customer";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCustomer(customerId: string) {
    loading.value = true;
    error.value = null;
    try {
      await deleteApi(`/customers/${customerId}`);
      customers.value = customers.value.filter((c: any) => c.id !== customerId);
    } catch (err) {
      error.value = err.message || "Failed to delete customer";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
