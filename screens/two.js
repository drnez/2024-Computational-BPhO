import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, tan } from '../components/Default';

export default function Two({navigation}) {
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
                obj.yStar = o2.y[o2Index];
            }

            return obj;
        });
    };

    const [smooth, setSmooth] = useState(true);

    const [theta, setTheta] = useState(42);
    const [u, setU] = useState(10);
    const [h, setH] = useState(1);
    const [g, setG] = useState(9.81);

    let x = [];
    let y = [];

    let x_now = 0;
    let y_now = h;

    const st = sin(theta);
    const ct = cos(theta);
    const tt = tan(theta);
    const Range = ( (u*u)/g ) * ( st*ct + ct*Math.sqrt( st*st + (2*g*h)/(u*u) ) );
    const x_step = (1/100) * Range;

    const total_time = Range / (u*ct);
    const x_a = ( (u*u)/g ) * st*ct;
    const y_a = h + ( (u*u)/(2*g) )*st*st;

    while (x_now < Range) {
        x.push(x_now);
        y.push(y_now);

        x_now +=x_step;
        y_now = h + x_now*tt - ( (g/(2*u*u))*(1+tt*tt)*(x_now*x_now) );
    }
    
    const plots = {
        x: x,
        y: y
    };
    const apogee_plot = {
        x: [x_a, x_a],
        y: [y_a, y_a]
    };

    const data = merge_data(plots, apogee_plot);

    return (
        <Default
            data={data}
            sliders={
                <>
                    <Text>Total time of flight: {Math.round(total_time*100)/100} seconds</Text>
                    <Text>Apogee coordinates: ({Math.round(x_a*100)/100}, {Math.round(y_a*100)/100})</Text>
                    <Text style={{color:'red'}}>Red star: apogee</Text>
                    <View style={{padding: 7}} />
                    <Text>Launch Angle = {theta} degrees</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={90}
                        onSlidingComplete={(value) => setTheta(value)}
                        onValueChange={smooth && setTheta}
                        value={theta}
                        step={1}
                    />
                    <Text>Launch Speed = {u} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        onSlidingComplete={(value) => setU(value)}
                        onValueChange={smooth && setU}
                        value={u}
                        step={1}
                    />
                    <Text>Launch Height = {h} meters</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        onSlidingComplete={(value) => setH(value)}
                        onValueChange={smooth && setH}
                        value={h}
                        step={1}
                    />
                    <Text>Strength of Gravity = {Math.round(100*g)/100} m/s^2</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.2}
                        maximumValue={250}
                        onSlidingComplete={(value) => setG(value)}
                        onValueChange={smooth && setG}
                        value={g}
                        step={0.1}
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
