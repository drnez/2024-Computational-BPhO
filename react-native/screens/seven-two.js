import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { cos, sin } from '../components/Default';

export default function SevenTwo({navigation, route}) {
    function merge_data (o1, o2, o3, o4, o5, o6, o7, o8) {
        // create set of unique x values
        const allXValues = [...new Set([...o1.x, ...o2.x, ...o3.x, ...o4.x, ...o5.x, ...o6.x, ...o7.x, ...o8.x])].sort((a, b) => a - b);

        // map x values to desired output format
        return allXValues.map(x => {
            const obj = { x };

            const o1Index = o1.x.indexOf(x);
            const o2Index = o2.x.indexOf(x);
            const o3Index = o3.x.indexOf(x);
            const o4Index = o4.x.indexOf(x);
            const o5Index = o5.x.indexOf(x);
            const o6Index = o6.x.indexOf(x);
            const o7Index = o7.x.indexOf(x);
            const o8Index = o8.x.indexOf(x);

            if (o1Index !== -1) {
                obj.y0 = o1.y[o1Index];
            }
            if (o2Index !== -1) {
                obj.y1 = o2.y[o2Index];
            }
            if (o3Index !== -1) {
                obj.y2 = o3.y[o3Index];
            }
            if (o4Index !== -1) {
                obj.y3 = o4.y[o4Index];
            }
            if (o5Index !== -1) {
                obj.y4 = o5.y[o5Index];
            }
            if (o6Index !== -1) {
                obj.y5 = o6.y[o6Index];
            }
            if (o7Index !== -1) {
                obj.yStar = o7.y[o7Index];
            }
            if (o8Index !== -1) {
                obj.yStar2 = o8.y[o8Index];
            }

            return obj;
        });
    };

    function plots(u, g, theta, graph_range) {
        let x = [];
        let y = [];
        let x_now = 0;
        let y_now = 0;

        let t = 0;
        const t_step = 0.03;

        while (x_now <= graph_range) {
            let ux = u*cos(theta);
            let uy = u*sin(theta);

            x_now = ux*t;
            y_now = uy*t - 0.5*g*t*t;

            x.push(x_now);
            y.push(y_now);

            t += t_step
        }

        return [x,y];
    }

    const userU = route.params.userU;
    const userG = route.params.userG;
    const maxima = route.params.maxima_xy;
    const minima = route.params.minima_xy;

    const graph_range = 15;

    const th30 = plots(userU, userG, 30, graph_range);
    const th45 = plots(userU, userG, 45, graph_range);
    const th60 = plots(userU, userG, 60, graph_range);
    const th70d5 = plots(userU, userG, 70.5, graph_range);
    const th78 = plots(userU, userG, 78, graph_range);
    const th85 = plots(userU, userG, 85, graph_range);

    const th30_plots = {
        x: th30[0],
        y: th30[1]
    };
    const th45_plots = {
        x: th45[0],
        y: th45[1]
    };
    const th60_plots = {
        x: th60[0],
        y: th60[1]
    };
    const th70d5_plots = {
        x: th70d5[0],
        y: th70d5[1]
    };
    const th78_plots = {
        x: th78[0],
        y: th78[1]
    };
    const th85_plots = {
        x: th85[0],
        y: th85[1]
    }

    const data = merge_data(th30_plots, th45_plots, th60_plots, th70d5_plots, th78_plots, th85_plots, maxima, minima);

    return (
        <Default
            min_y={-10}
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key (degrees): black: θ=30, blue: θ=45, red: θ=60, green: θ=70.5, pink: θ=78, purple: θ=85 || red star: maximum in r against t, cyan star: minimum in r against t</Text>
                    <View style={{padding:5}} />
                    <Button
                        title="Back"
                        onPress={() => navigation.navigate("Challenge Seven")}
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
