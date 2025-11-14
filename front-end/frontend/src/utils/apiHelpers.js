/**
 * Helper para obter a URL base da API sem expor diretamente
 * Usa variável de ambiente VITE_API_URL
 * @returns {string} URL base da API sem o sufixo /api
 */
export const getApiBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    // Remove /api do final se existir
    return apiUrl.replace(/\/?api\/?$/, '');
};

/**
 * Helper para construir URL completa de storage
 * @param {string} photoPath - Caminho da foto (ex: /storage/photos/photo.jpg)
 * @returns {string|null} URL completa da foto ou null se não houver caminho
 */
export const getPhotoUrl = (photoPath) => {
    if (!photoPath) {
        return null;
    }
    if (typeof photoPath !== 'string') {
        return null;
    }
    
    // Se já é uma URL completa, retorna como está
    if (photoPath.startsWith('http')) {
        return photoPath;
    }
    
    // Obtém a URL base sem expor diretamente
    const host = getApiBaseUrl();
    
    // Normaliza o caminho
    let finalUrl;
    if (photoPath.startsWith('/storage')) {
        finalUrl = `${host}${photoPath}`;
    } else if (photoPath.startsWith('storage')) {
        finalUrl = `${host}/${photoPath}`;
    } else {
        finalUrl = `${host}/storage/${photoPath}`;
    }
    
    return finalUrl;
};

