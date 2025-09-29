// API file for products
// All methods are asynchronous

const BASE_URL = "https://fakestoreapi.com/products";

/**
 * GET - Fetch all products
 */
export const getProducts = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data; // array of products
    } catch (error) {
        console.error("GET error:", error);
        return [];
    }
};

/**
 * GET - Fetch single product by ID
 */
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data; // single product object
    } catch (error) {
        console.error("GET by ID error:", error);
        return null;
    }
};

/**
 * POST - Add new product
 * newProduct = { title: '', price: 0, description: '', image: '', category: '' }
 */
export const addProduct = async (newProduct) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) throw new Error("Failed to add product");
        const data = await response.json();
        return data; // newly added product
    } catch (error) {
        console.error("POST error:", error);
        return null;
    }
};

/**
 * PUT - Update existing product by ID
 * updatedData = { title, price, description, etc. }
 */
export const updateProduct = async (id, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) throw new Error("Failed to update product");
        const data = await response.json();
        return data; // updated product
    } catch (error) {
        console.error("PUT error:", error);
        return null;
    }
};

/**
 * DELETE - Delete product by ID
 */
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete product");
        const data = await response.json();
        return data; // deleted product info
    } catch (error) {
        console.error("DELETE error:", error);
        return null;
    }
};
