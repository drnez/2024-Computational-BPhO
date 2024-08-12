import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, tan, arcsin } from '../components/Default';

export default function Six({navigation}) {
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

    function plots(u, h, g, theta, fraction, range) {
        let x = [];
        let y = [];

        let x_now = 0;
        let y_now = h;
        let count = 0;
        let x_step = (1/fraction) * range;

        const tt = tan(theta);

        while (count <= fraction) {
            x.push(x_now);
            y.push(y_now);

            x_now += x_step;
            y_now = h + x_now*tt - ( (g/(2*u*u))*(1+tt*tt)*(x_now*x_now) );

            count += 1;
        }

        return [x,y];
    }

    function distance_travelled(u, g, theta, range) {
        const tt = tan(theta);

        const a = (u*u)/(g*(1+(tt*tt)));
        const b = tt;
        const c = tt - g*range*(1+tt*tt)/(u*u);

        const z_func = (z) => 0.5*Math.log(Math.abs(Math.sqrt(1+z*z)+z))+0.5*z*Math.sqrt(1+z*z);

        const s = a*(z_func(b) - z_func(c));

        return s;
    }

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(10);
    const [userH, setUserH] = useState(2);
    const [userG, setUserG] = useState(9.81);
    const [userTheta, setUserTheta] = useState(60);

    let st = sin(userTheta);
    let ct = cos(userTheta);

    const initial_range = ( (userU*userU)/userG ) * ( st*ct + ct*Math.sqrt(st*st + (2*userG*userH)/(userU*userU) ) );
    const initial_distance = distance_travelled(userU, userG, userTheta, initial_range);
    const initial_plots = plots(userU, userH, userG, userTheta,75, initial_range);
    const initial_xy = {
        x: initial_plots[0],
        y: initial_plots[1]
    };

    const max_theta = arcsin( 1/Math.sqrt(2+( (2*userG*userH)/(userU*userU) )) );
    const max_range = ( (userU*userU)/userG ) * Math.sqrt(1+(2*userG*userH)/(userU*userU));
    const final_distance = distance_travelled(userU, userG, max_theta, max_range);
    const final_plots = plots(userU, userH, userG, max_theta, 75, max_range);
    const final_xy = {
        x: final_plots[0],
        y: final_plots[1]
    };

    const data = merge_data(initial_xy, final_xy);

    return (
        <Default
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: black: using input launch angle, blue: launch angle optimised for max range</Text>
                    <View style={{padding:5}} />
                    <Text>Distance travelled by initial projectile: {Math.round(100*initial_distance)/100}m</Text>
                    <Text>Distance travelled by max range projectile: {Math.round(100*final_distance)/100}m</Text>
                    <View style={{padding: 10}} />
                    <Text>Launch Speed = {userU} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={1000}
                        onSlidingComplete={(value) => setUserU(value)}
                        onValueChange={smooth && setUserU}
                        value={userU}
                        step={10}
                    />
                    <Text>Launch Height = {userH} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={1000}
                        onSlidingComplete={(value) => setUserH(value)}
                        onValueChange={smooth && setUserH}
                        value={userH}
                        step={10}
                    />
                    <Text>Strength of Gravity = {userG} m/s^2</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.2}
                        maximumValue={250}
                        onSlidingComplete={(value) => setUserG(value)}
                        onValueChange={smooth && setUserG}
                        value={userG}
                        step={1}
                    />
                    <Text>Launch Angle = {userTheta} degrees</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={90}
                        onSlidingComplete={(value) => setUserTheta(value)}
                        onValueChange={smooth && setUserTheta}
                        value={userTheta}
                        step={1}
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
