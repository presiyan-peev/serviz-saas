import { ref } from "vue";
import { useApi } from "./useApi";

interface CarInput {
  make: string;
  model: string;
  registrationPlate: string;
  vinNumber?: string;
  yearOfProduction?: number;
  power?: string;
  fuel?: string;
  ownerId: number;
}

interface Car {
  id: number;
  customerId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  oldLicensePlates: string[];
  vin: string;
  power: string;
  fuel: string;
  cubicCapacity: number;
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

export function useCar() {
  const api = useApi();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCars = async (params?: {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: string;
    include?: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getApi("/cars", "Failed to fetch cars", {
        params,
      });
      return response?.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch cars";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchCar = async (id: number, include?: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.getApi(`/cars/${id}`, "Failed to fetch car", {
        params: { include },
      });
      return response?.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch car";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createCar = async (car: CarInput) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.postApi("/cars", car);
      return response?.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to create car";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateCar = async (id: number, car: CarInput) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.patchApi(`/cars/${id}`, car);
      return response?.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to update car";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteCar = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await api.deleteApi(`/cars/${id}`, {});
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to delete car";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchCars,
    fetchCar,
    createCar,
    updateCar,
    deleteCar,
  };
}
