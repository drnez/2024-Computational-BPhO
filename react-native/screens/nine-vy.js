import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Default from '../components/Default';

export default function NineVy({navigation, route}) {
    function merge_data (o1, o2) {
        // create set of unique x values
        const allXValues = [...new Set([...o1.x, ...o2.x])].sort((a, b) => a - b);

        // map x values to desired output format
        return allXValues.map(x => {
            const obj = { x };

            const o1Index = o1.x.indexOf(x);
            const o2Index = o2.x.indexOf(x);

            if (o1Index !== -1) {
                obj.y0 = o1.y[o1Index];
            }
            if (o2Index !== -1) {
                obj.y1 = o2.y[o2Index];
            }

            return obj;
        });
    };

    const normal_xy = {
        x: route.params.normal_all.t,
        y: route.params.normal_all.vy,
    };
    const ar_xy = {
        x: route.params.ar_all.t,
        y: route.params.ar_all.vy,
    };

    const data = merge_data(normal_xy, ar_xy);

    const normal_all = route.params.normal_all;
    const ar_all = route.params.ar_all;

    return (
        <Default
            header={"vy(m/s) against t(s):"}
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: black: drag-free model, blue: air resistance incorporated</Text>
                    <View style={{padding:5}} />
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate("Challenge Nine (5)", {normal_all, ar_all} )}
                    />
                    <Button
                        title="Back"
                        onPress={() => navigation.navigate("Challenge Nine (3)", {normal_all, ar_all} )}
                    />
                </>
            }
            buttons={
                <Button
                    title="Home"
                    onPress={() => navigation.navigate("Home")}
                />
            }
            navigation={navigation}
        />
    );
}
