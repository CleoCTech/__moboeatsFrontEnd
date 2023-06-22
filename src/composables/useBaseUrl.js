import { ref } from 'vue';

export function useBaseUrl() {
  const baseUrl = ref('http://localhost:8000');

  return {
    baseUrl,
  };
}