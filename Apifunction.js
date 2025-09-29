useEffect(() => {
    fetchProducts();
}, []);

// GET
const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
};

// POST
const handleAdd = async () => {
    const newItem = { title: "New Product", price: 99, description: "New Item", image: "https://via.placeholder.com/70", category: "misc" };
    const added = await addProduct(newItem);
    if (added) setProducts([...products, added]);
};

// PUT
const handleUpdate = async (item) => {
    const updatedData = { ...item, price: item.price + 10 };
    const updated = await updateProduct(item.id, updatedData);
    if (updated) setProducts(products.map(p => (p.id === item.id ? updated : p)));
};

// DELETE
const handleDelete = async (itemId) => {
    const deleted = await deleteProduct(itemId);
    if (deleted) setProducts(products.filter(p => p.id !== itemId));
};






if (loading) {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
}