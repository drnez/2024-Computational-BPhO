import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, arctan } from '../components/Default';

export default function Three({navigation}) {
    function merge_data (o1, o2, o3) {
        // create set of unique x values
        const allXValues = [...new Set([...o1.x, ...o2.x, ...o3.x])].sort((a, b) => a - b);

        // map x values to desired output format
        return allXValues.map(x => {
            const obj = { x };

            const o1Index = o1.x.indexOf(x);
            const o2Index = o2.x.indexOf(x);
            const o3Index = o3.x.indexOf(x);

            if (o1Index !== -1) {
                obj.y0 = o1.y[o1Index];
            }
            if (o2Index !== -1) {
                obj.y1 = o2.y[o2Index];
            }
            if (o3Index !== -1) {
                obj.y2 = o3.y[o3Index];
            }

            return obj;
        });
    };

    function min_u_theta(X, Y) {
        return arctan( (Y + Math.sqrt(X*X + Y*Y))/X );
    }
    function min_u_value(X, Y, g) {
        return Math.sqrt( g*(targetY + Math.sqrt(X*X + Y*Y)) )
    }

    function plots(u, g, theta) {
        let x = [];
        let y = [];

        let x_now = 0;
        let y_now = 0;
        let t = 0;
        const t_step = 0.2;

        while (x_now <= targetX) {
            x.push(x_now);
            y.push(y_now);

            x_now = u*t*cos(theta);
            y_now = u*t*sin(theta) - 0.5*g*t*t;

            t += t_step;
        }

        return [x,y];
    }

    function u_theta(X, Y, u, g, Sign) {
        const a = (g/(2*u*u))*X*X;
        const b = -1 * X;
        const c = Y + (g*X*X)/(2*u*u);

        const Discriminant = b*b - 4*a*c;
        let Numerator = -b;
        if (Sign === '+') {
            Numerator += Math.sqrt(Discriminant);
        }
        else if (Sign === '-') {
            Numerator -= Math.sqrt(Discriminant);
        }

        return arctan(Numerator/(2*a));
    }

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(150);
    const [userG, setUserG] = useState(9.81);
    const [targetX, setTargetX] = useState(1000);
    const [targetY, setTargetY] = useState(300);

    // min u values
    const Min_u_theta = min_u_theta(targetX, targetY);
    const Min_u = min_u_value(targetX, targetY, userG);
    const Min_u_plots = plots(Min_u, userG, Min_u_theta);
    const Min_u_xy = {
        x: Min_u_plots[0],
        y: Min_u_plots[1]
    };

    // low + high ball
    const Low_theta = u_theta(targetX, targetY, userU, userG, '-');
    const Low_t_plots = plots(userU, userG, Low_theta);
    const Low_t_xy = {
        x: Low_t_plots[0],
        y: Low_t_plots[1]
    };

    const High_theta = u_theta(targetX, targetY, userU, userG, '+');
    const High_t_plots = plots(userU, userG, High_theta);
    const High_t_xy = {
        x: High_t_plots[0],
        y: High_t_plots[1]
    };

    const data = merge_data(Min_u_xy, Low_t_xy, High_t_xy);

    return (
        <Default
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: red: high ball (max theta), blue: low ball (min theta), black: min u trajectory</Text>
                    <View style={{padding:5}} />
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
                    <Text>Target X = {targetX}m</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={2000}
                        onSlidingComplete={(value) => setTargetX(value)}
                        onValueChange={smooth && setTargetX}
                        value={targetX}
                        step={10}
                    />
                    <Text>Target Y = {targetY}m</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={2000}
                        onSlidingComplete={(value) => setTargetY(value)}
                        onValueChange={smooth && setTargetY}
                        value={targetY}
                        step={10}
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
