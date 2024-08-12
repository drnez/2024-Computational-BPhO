import { View, Button, Text, StyleSheet } from "react-native";

export default function Home({navigation}) {
    return (
        <>
            <Text style={{backgroundColor:'white', padding:15, fontSize: 24.95, fontWeight:'bold'}}>Projectile Motion Simulations:</Text>
            <View style={{flex:1, backgroundColor: '#fff'}}>
                <View style={styles.button}>
                    <Button
                        title="Challenge One"
                        onPress={() => navigation.navigate("Challenge One")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Two"
                        onPress={() => navigation.navigate("Challenge Two")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Three"
                        onPress={() => navigation.navigate("Challenge Three")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Four"
                        onPress={() => navigation.navigate("Challenge Four")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Five"
                        onPress={() => navigation.navigate("Challenge Five")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Six"
                        onPress={() => navigation.navigate("Challenge Six")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Seven"
                        onPress={() => navigation.navigate("Challenge Seven")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Eight"
                        onPress={() => navigation.navigate("Challenge Eight")}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Challenge Nine"
                        onPress={() => navigation.navigate("Challenge Nine")}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
});
