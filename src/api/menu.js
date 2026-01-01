import { api } from "./client";

// Base: client.js uses VITE_API_BASE_URL (default http://127.0.0.1:8000)
// Backend endpoints are under /api/

export async function fetchCategories() {
    const res = await api.get("/categories/");
    return res.data; // array
}

export async function fetchAllProducts({ page = 1, pageSize = 12 } = {}) {
    const res = await api.get("/products/", {
        params: { page, page_size: pageSize },
    });
    return res.data; // {count,next,previous,results}
}

export async function fetchCategoryProducts({ categoryId, page = 1, pageSize = 12 } = {}) {
    const res = await api.get(`/categories/${categoryId}/products/`, {
        params: { page, page_size: pageSize },
    });
    return res.data; // {count,next,previous,results}
}

export async function fetchRecommendedProducts() {
    const res = await api.get("/recommended-products/");
    return res.data; // array
}

export async function fetchSmallBanners() {
    const res = await api.get("/small-banners/");
    return res.data; // array
}
