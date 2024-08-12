import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { cos, sin } from '../components/Default';

export default function Seven({navigation}) {
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
        const t_step = 0.06;

        while (x_now <= graph_range) {
            x.push(x_now);
            y.push(y_now);

            x_now += t_step;
            y_now = Math.sqrt((u*u*x_now*x_now)-(g*x_now*x_now*x_now*u*sin(theta))+(0.25*g*g*x_now*x_now*x_now*x_now));
        }

        return [x,y];
    }

    function stationary_points(u, g, thetas) {
        let min_max = null;
        let max_min = 0;

        let max_ts = [];
        let max_rs = [];
        let min_ts = [];
        let min_rs = [];

        let max_xs = [];
        let max_ys = [];
        let min_xs = [];
        let min_ys = [];

        for (const theta of thetas) {
            const st = sin(theta);
            const sqrt = Math.sqrt(st*st-(8/9));

            let max_t = ((3*u)/(2*g))*(st-sqrt);
            const min_t = ((3*u)/(2*g))*(st+sqrt);
            let max_r = Math.sqrt((u*u*max_t*max_t)-(g*max_t*max_t*max_t*u*st)+(0.25*g*g*max_t*max_t*max_t*max_t));
            const min_r = Math.sqrt((u*u*min_t*min_t)-(g*min_t*min_t*min_t*u*st)+(0.25*g*g*min_t*min_t*min_t*min_t));

            if (theta === 70.5) {
                max_t = (u/g)*Math.sqrt(2);
                max_r = Math.sqrt((u*u*max_t*max_t)-(g*max_t*max_t*max_t*u*st)+(0.25*g*g*max_t*max_t*max_t*max_t));
            }

            max_ts.push(max_t);
            min_ts.push(min_t);
            max_rs.push(max_r);
            min_rs.push(min_r);

            if ((isNaN(min_max) || typeof min_max !==  "number" || max_t < min_max) && !isNaN(max_t))
                min_max = max_t;
            if (min_t > max_min && !isNaN(min_t))
                max_min = min_t;

            const max_x = u*max_t*cos(theta);
            const min_x = u*min_t*cos(theta);
            const max_y = u*max_t*sin(theta) - 0.5*g*max_t*max_t;
            const min_y = u*min_t*sin(theta) - 0.5*g*min_t*min_t;

            max_xs.push(max_x);
            min_xs.push(min_x);
            max_ys.push(max_y);
            min_ys.push(min_y);
        }

        const maxima = {
            x: max_ts,
            y: max_rs
        };
        const minima = {
            x: min_ts,
            y: min_rs
        };

        const maxima_xy = {
            x: max_xs,
            y: max_ys
        };
        const minima_xy = {
            x: min_xs,
            y: min_ys
        };

        const graph_range = max_min + ((max_min - min_max)*2);

        return [maxima, minima, graph_range, maxima_xy, minima_xy];
    }

    const [smooth, setSmooth] = useState(true);

    const [userU, setUserU] = useState(10);
    const [userG, setUserG] = useState(10);

    const thetas = [30, 45, 60, 70.5, 78, 85];
    const stat_points = stationary_points(userU, userG, thetas);
    const graph_range = stat_points[2];

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

    const data = merge_data(th30_plots, th45_plots, th60_plots, th70d5_plots, th78_plots, th85_plots, stat_points[0], stat_points[1]);

    const maxima_xy = stat_points[3];
    const minima_xy = stat_points[4];

    return (
        <Default
            data={data}
            header={"Range(m) against Time(s):"}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key (degrees): black: θ=30, blue: θ=45, red: θ=60, green: θ=70.5, pink: θ=78, purple: θ=85 || red stars: maxima, cyan stars: minima</Text>
                    <View style={{padding:5}} />
                    <Text>Launch Speed = {userU} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        onSlidingComplete={(value) => setUserU(value)}
                        onValueChange={smooth && setUserU}
                        value={userU}
                        step={1}
                    />
                    <Text>Strength of Gravity = {Math.round(userG*100)/100} m/s^2</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.2}
                        maximumValue={25}
                        onSlidingComplete={(value) => setUserG(value)}
                        onValueChange={smooth && setUserG}
                        value={userG}
                        step={1}
                    />
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate("Challenge Seven (2)", {userU, userG, userG, maxima_xy, minima_xy})}
                    />
                </>
            }
            buttons={
                <View style={{flexDirection: "row"}}>
                    <Button
                        title="Home"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <Text>        </Text>
                    <Button
                        title="Toggle Smooth Scrolling"
                        onPress={() => {
                            if (smooth) setSmooth(false);
                            else setSmooth(true);
                        }}
                    />
                </View>
            }
            navigation={navigation}
        />
    );
}
