import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, tan, arcsin } from '../components/Default';

export default function Four({navigation}) {
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

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(10);
    const [userH, setUserH] = useState(2);
    const [userG, setUserG] = useState(9.81);
    const [userTheta, setUserTheta] = useState(60);

    let st = sin(userTheta);
    let ct = cos(userTheta);

    const initial_range = ( (userU*userU)/userG ) * ( st*ct + ct*Math.sqrt(st*st + (2*userG*userH)/(userU*userU) ) );
    const initial_time = initial_range / (userU*ct);
    const initial_plots = plots(userU, userH, userG, userTheta, 75, initial_range);
    const initial_xy = {
        x: initial_plots[0],
        y: initial_plots[1]
    };

    const max_theta = arcsin( 1/Math.sqrt(2+( (2*userG*userH)/(userU*userU) )) );
    const max_range = ( (userU*userU)/userG ) * Math.sqrt(1+(2*userG*userH)/(userU*userU));
    const final_time = max_range / (userU*cos(max_theta));
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
                    <Text>Time of initial flight: {Math.round(100*initial_time)/100} seconds</Text>
                    <Text>Range of initial flight: {Math.round(100*initial_range)/100} meters</Text>
                    <Text>Time of optimum flight: {Math.round(100*final_time)/100} seconds</Text>
                    <Text>Range of optimum flight: {Math.round(100*max_range)/100} meters</Text>
                    <Text>Launch angle of optimum flight: {Math.round(100*max_theta)/100} degrees</Text>
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
                    <Text>Strength of Gravity = {Math.round(100*userG)/100} m/s^2</Text>
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
