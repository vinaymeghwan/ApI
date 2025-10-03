
//fatch data example

{/*import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

export default function FetchExample() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("HTTP error " + res.status);
                }
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => console.log("Error:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: { padding: 8, fontSize: 16 },
});
*/}



//simple basic example of fetching data

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Productapi() {
    const [data, setData] = useState(null);


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.log("Error:", err));
    }, []);

    return (
        <View>
            <Text>Fetch Example:</Text>
            {data && <Text>{data.title}</Text>}
        </View>
    );
}





