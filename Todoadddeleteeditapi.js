import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';

export default function App() {
    const [data, setData] = useState([])
    const [text, setText] = useState("")
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            .then((res) => res.json())
            .then((josan) => {
                const items = josan.map((item) => ({
                    id: item.id.toString(),
                    title: item.title,
                }));
                setData(items)
            })
            .catch(() => Alert.alert("Error", "Api se data fatch nhi huaa"))
    }, [])

    const addItem = () => {
        if (!text.trim()) {
            Alert.alert("error", "please add text ");
            return;
        }
        const newItem = { id: Date.now().toString(), title: text };
        setData([newItem, ...data]);
        setText('')
    }

    const editItem = (item) => {
        setEditingId(item.id);
        setText(item.title);
    };

    const saveEdit = () => {
        const updated = data.map((i) =>
            i.id === editingId ? { ...i, title: text } : i);
        setData(updated);
        setEditingId(null);
        setText("");
    };

    const deleteItem = (id) => {
        Alert.alert("Confirm", "Delete krna h ", [
            { text: "cancel" },
            { text: "Delete", onPress: () => { setData(data.filter((i) => i.id !== id)) } }
        ])
    };
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#fff", paddingTop: 40 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Todo List</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
                placeholder="Add Item"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity
                style={{ height: 50, borderRadius: 5, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                onPress={editingId ? saveEdit : addItem}>
                <Text style={{ color: '#fff', fontSize: 18 }}>{editingId ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>

                            <Text style={{ flex: 1, fontSize: 14, backgroundColor: "red", height: 50, alignItems: "center", justifyContent: "center", alignSelf: "center" }}>{item.title}</Text>
                            <TouchableOpacity onPress={() => editItem(item)} style={{ marginRight: 10 }}>
                                <Text style={{ color: '#007bff' }}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => deleteItem(item.id)} style={{ marginRight: 10 }}>
                                <Text style={{ color: '#007bff' }}>Delete</Text>
                            </TouchableOpacity>

                        </View>

                    )}
                />
            </View>
        </View>

    )
}