import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button, Modal, TextInput, TouchableOpacity } from "react-native";
import { deleteProduct, getUser, } from "../API/Api";
import { launchImageLibrary } from "react-native-image-picker";


const LoginScreen = () => {

    const [products, setProducts] = useState([]);
    const [modalvisible, setModalVisible] = useState(false);
    const [input, setInput] = useState({
        id: null,
        title: "",
        price: "",
        image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    });

    useEffect(() => {
        fatchData();
    }, []);

    const fatchData = async () => {
        const data = await getUser();
        setProducts(data);

    };


    const handleAdd = () => {
        const newItem = {
            ...input,
            id: Date.now(), // unique id generate karo
            price: Number(input.price)
        };
        // Add state me 


        setProducts([...products, newItem]);
        setModalVisible(false);
        setInput({ id: null, title: "", price: "", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png" });
    };

    const handleUpdateSave = () => {
        setProducts(products.map(p =>               //state me hi update hogi api me nhi
            p.id === input.id
                ? { ...p, title: input.title, price: Number(input.price), image: input.image }
                : p
        ));

        setModalVisible(false);
        setInput({ id: null, title: "", price: "", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png" });
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
    };


    // Pick image from gallery
    const pickImage = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (!response.didCancel && !response.error) {
                setInput({ ...input, image: response.assets[0].uri });
            }
        });
    };


    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Button title="Add Product" onPress={() => {
                setInput({
                    id: null,
                    title: "",
                    price: "",
                    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
                })
                setModalVisible(true)
            }} />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>

                        <Image source={{ uri: item.image }} style={{ width: 70, height: 70, resizeMode: "contain" }} />
                        <View style={{ marginLeft: 10, flexDirection: "column" }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.Price}>${item.price}</Text>

                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Button title="Delete" onPress={() => handleDelete(item.id)} />
                                <Button
                                    title="Update"
                                    onPress={() => {

                                        setInput({ ...item });
                                        setModalVisible(true);
                                    }}
                                />
                            </View>
                        </View>

                    </View>
                )}
            />

            <Modal
                visible={modalvisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modal}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", margin: 10 }}>  {input.id === null ? "Add Product" : "Update Product"}</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <Text style={{ fontSize: 30, alignSelf: "center" }}>+</Text>
                        <Text style={{ fontSize: 15 }}>Add Image</Text>
                    </TouchableOpacity>
                    <View style={styles.modalbox}>

                        <TextInput
                            placeholder="Enter Name"
                            style={styles.input}
                            value={input.title}
                            onChangeText={(text) => setInput({ ...input, title: text })}
                        />
                        <TextInput
                            placeholder="Price"
                            keyboardType="numeric"
                            style={styles.input}
                            value={String(input.price)}
                            onChangeText={(text) => setInput({ ...input, price: Number(text) })}
                        />
                        <TextInput
                            placeholder="Image URL"
                            style={styles.input}
                            value={input.image}
                            onChangeText={(text) => setInput({ ...input, image: text })}
                        />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Button title="Cancle" onPress={() => setModalVisible(false)} />
                            <Button
                                title="Save"
                                onPress={() => {
                                    if (input.id === null) {
                                        handleAdd(); // new item
                                    } else {
                                        handleUpdateSave(); // existing item
                                    }
                                }}
                            />

                        </View>
                    </View>
                </View>

            </Modal>


        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 14, fontWeight: "600", flexWrap: "wrap", flex: 1 },
    Price: { fontSize: 13, color: "green" },
    card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, marginVertical: 6, height: 100, borderRadius: 10 },
    modal: { alignSelf: "center", alignItems: "center", justifyContent: "center", marginTop: "30%", width: "95+%", height: "70%", backgroundColor: "white" },
    input: { borderWidth: 1, height: 40, width: 300, borderColor: "#ccc", borderRadius: 5, paddingVertical: 10, margin: 10, marginTop: 10, color: "black" },

});

export default LoginScreen;