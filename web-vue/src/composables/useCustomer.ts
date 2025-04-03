import { ref } from "vue";
import { useApi } from "./useApi";

interface CustomerInput {
  name: string;
  phone?: string;
  email?: string;
  facebook?: string;
  notes?: string;
}

interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  facebook?: string;
  notes?: string;
  cars?: any[]; // You can define a proper Car interface if needed
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

export function useCustomer() {
  const api = useApi();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCustomers = async (params?: {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: string;
    include?: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getApi(
        "/customers",
        "Failed to fetch customers",
        { params }
      );
      return response?.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch customers";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchCustomer = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getApi(
        `/customers/${id}`,
        "Failed to fetch customer"
      );
      return response?.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch customer";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createCustomer = async (customer: CustomerInput) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.postApi("/customers", customer);
      return response?.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create customer";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateCustomer = async (id: string, customer: CustomerInput) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.patchApi(`/customers/${id}`, customer);
      return response?.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update customer";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteCustomer = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await api.deleteApi(`/customers/${id}`, {});
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete customer";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
