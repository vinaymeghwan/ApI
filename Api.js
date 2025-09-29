// src/api/api.js

export const getUser = async () => {

    try {

        let response = await fetch("https://fakestoreapi.com/products");
        let json = await response.json();
        return json;

    }
    catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }

};

const BASE_URL = "https://fakestoreapi.com/products";

export const addProduct = async (product) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

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



{/*const BASE_URL = "https://fakestoreapi.com/products";
export const getProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data; // yeh array return karega
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};


export const addProduct = async (newProduct) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error("Failed to add product");
        }

        const data = await response.json();
        //  return data; // naya product return hoga
        // FakestoreAPI hamesha id=21 deta hai, isiliye manually unique id assign karte hain
        const uniqueId = Date.now(); // ya phir Math.random() use kar sakte ho
        return { ...data, id: uniqueId };
    } catch (error) {
        console.error("Error posting product:", error);
        return null;
    }
};


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
*/}