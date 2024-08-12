import { View, StyleSheet, Button, Text } from 'react-native';
import { CartesianChart, Scatter, Line, useLinePath, useAnimatedPath } from 'victory-native';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { useFont } from '@shopify/react-native-skia';
import { ScrollView } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useRef } from 'react';

export function deg_to_rad(degrees) {
    return degrees * Math.PI / 180;
}
export function rad_to_deg(radians) {
    return radians * (180 / Math.PI);
}
export function sin(degrees) {
    return Math.sin(deg_to_rad(degrees));
}
export function cos(degrees) {
    return Math.cos(deg_to_rad(degrees));
}
export function tan(degrees) {
    return Math.tan(deg_to_rad(degrees));
}
export function arctan(value) {
    return rad_to_deg(Math.atan(value));
}
export function arcsin(value) {
    return rad_to_deg(Math.asin(value));
}

export default function Default({x, y, data, sliders, navigation, header, buttons, min_y}) {
    const ss_ref = useRef();

    const font = useFont(Inter_400Regular, 12);

    if (x) data = x.map((value, index) => ({ x: value, y: y[index] }));

    const take_ss = async () => {
        try {
            const localUri = await captureRef(ss_ref, {
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{height: 230}}>
                <ScrollView style={{height: 0, flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={{fontSize:16, fontWeight: 'bold'}}>{header ? header : "y(m) against x(m):"}</Text>
                    <View style={{padding:6}} />
                    {sliders}
                </ScrollView>
            </View>
            <View style={{padding: 10}} />
            <View style={{flex:1}} ref={ss_ref} collapsable={false}>
                <CartesianChart
                    data={data}
                    xKey="x"
                    yKeys={["y", "y0", "y1", "y2", "y3", "y4", "y5", "y6", "yStar", "yStar2"]}
                    axisOptions={{font}}
                    domain={{y: [min_y]}}
                >
                    {
                        ({ points }) => (
                            <>
                                <Scatter
                                    points={points.y}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="black"
                                />
                                <Line
                                    points={points.y}
                                    color="black"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y0}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="black"
                                />
                                <Line
                                    points={points.y0}
                                    color="black"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y1}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="blue"
                                />
                                <Line
                                    points={points.y1}
                                    color="blue"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y2}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="red"
                                />
                                <Line
                                    points={points.y2}
                                    color="red"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y3}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="green"
                                />
                                <Line
                                    points={points.y3}
                                    color="green"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y4}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="pink"
                                />
                                <Line
                                    points={points.y4}
                                    color="pink"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y5}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="purple"
                                />
                                <Line
                                    points={points.y5}
                                    color="purple"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.y6}
                                    shape="circle"
                                    radius={2}
                                    style="fill"
                                    color="yellow"
                                />
                                <Line
                                    points={points.y6}
                                    color="yellow"
                                    curveType='natural'
                                    connectMissingData='true'
                                    strokeWidth={2}
                                />
                                <Scatter
                                    points={points.yStar}
                                    shape="star"
                                    radius={8}
                                    style="fill"
                                    color="red"
                                />
                                <Scatter
                                    points={points.yStar2}
                                    shape="star"
                                    radius={8}
                                    style="fill"
                                    color="cyan"
                                />
                            </>
                        )
                    }
                </CartesianChart>
            </View>
            {buttons}
            <Button
                title="Save Image"
                onPress={take_ss}
            />
            <View style={{padding:10}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 0,
    },
});
