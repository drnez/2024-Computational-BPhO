import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, tan, arctan, arcsin } from '../components/Default';

export default function Five({navigation}) {
    function merge_data (o1, o2, o3, o4, o5) {
        // create set of unique x values
        const allXValues = [...new Set([...o1.x, ...o2.x, ...o3.x, ...o4.x, ...o5.x])].sort((a, b) => a - b);

        // map x values to desired output format
        return allXValues.map(x => {
            const obj = { x };

            const o1Index = o1.x.indexOf(x);
            const o2Index = o2.x.indexOf(x);
            const o3Index = o3.x.indexOf(x);
            const o4Index = o4.x.indexOf(x);
            const o5Index = o5.x.indexOf(x);

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

            return obj;
        });
    };

    const min_u_theta = (X, Y) => 
        arctan( (Y + Math.sqrt(X*X + Y*Y))/X );
    const min_u_value = (X, Y, g) =>
        Math.sqrt( g*(targetY + Math.sqrt(X*X + Y*Y)) );

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

    function t_plots(u, g, theta) {
        let x = [];
        let y = [];

        let x_now = 0;
        let y_now = 0;
        let t = 0;
        const t_step = 0.2;

        x.push(x_now);
        y.push(y_now);

        while (y_now >= 0) {
            x_now = u*t*cos(theta);
            y_now = u*t*sin(theta) - 0.5*g*t*t;

            x.push(x_now);
            y.push(y_now);

            t += t_step;
        }

        return [x,y];
    }

    function x_plots(u, g, theta, range, fraction, type) {
        let x = [];
        let y = [];

        let x_now = 0;
        let y_now = 0;
        let count = 0;

        const x_step = (1/fraction)*range;
        const tt = tan(theta);

        while (count <= fraction) {
            if (type === 'bounding') {
                y_now = ((u*u)/(2*g))-(g/(2*u*u))*x_now*x_now;
                x_now += x_step;
            }

            x.push(x_now);
            y.push(y_now);

            if (type === 'range') {
                x_now += x_step;
                y_now = x_now*tt - ( (g/(2*u*u))*(1+tt*tt)*(x_now*x_now) );
            }

            count++;
        }

        return [x,y];
    }

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(150);
    const [userG, setUserG] = useState(9.81);
    const [targetX, setTargetX] = useState(1000);
    const [targetY, setTargetY] = useState(300);

    // min u values
    const Min_u_theta = min_u_theta(targetX, targetY);
    const Min_u = min_u_value(targetX, targetY, userG);
    const Min_u_plots = t_plots(Min_u, userG, Min_u_theta);
    const Min_u_xy = {
        x: Min_u_plots[0],
        y: Min_u_plots[1]
    };

    // low + high ball
    const Low_theta = u_theta(targetX, targetY, userU, userG, '-');
    const Low_t_plots = t_plots(userU, userG, Low_theta);
    const Low_t_xy = {
        x: Low_t_plots[0],
        y: Low_t_plots[1]
    };

    const High_theta = u_theta(targetX, targetY, userU, userG, '+');
    const High_t_plots = t_plots(userU, userG, High_theta);
    const High_t_xy = {
        x: High_t_plots[0],
        y: High_t_plots[1]
    };

    // max range
    const Max_range_theta = arcsin( 1/Math.sqrt(2) );
    const Max_range = ( (userU*userU)/userG );
    const Max_range_plots = x_plots(userU, userG, Max_range_theta, Max_range, 100, 'range');
    const Max_range_xy = {
        x: Max_range_plots[0],
        y: Max_range_plots[1]
    };

    // bounding parabola
    const Bounding_plots = x_plots(userU, userG, null, Max_range, 100, 'bounding');
    const Bounding_xy = {
        x: Bounding_plots[0],
        y: Bounding_plots[1]
    };

    const data = merge_data(Min_u_xy, Low_t_xy, High_t_xy, Max_range_xy, Bounding_xy);

    return (
        <Default
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: red: high ball (max theta), blue: low ball (min theta), black: min u trajectory, green: max range trajectory, pink: bounding parabola</Text>
                    <View style={{padding:5}} />
                    <Text>Launch Speed = {userU} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={1000}
                        onSlidingComplete={(value) => setUserU(value)}
                        onValueChange={smooth ? setUserU : null}
                        value={userU}
                        step={10}
                    />
                    <Text>Strength of Gravity = {Math.round(100*userG)/100} m/s^2</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.2}
                        maximumValue={250}
                        onSlidingComplete={(value) => setUserG(value)}
                        onValueChange={smooth ? setUserG : null}
                        value={userG}
                        step={1}
                    />
                    <Text>Target X = {targetX}m</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={2000}
                        onSlidingComplete={(value) => setTargetX(value)}
                        onValueChange={smooth ? setTargetX : null}
                        value={targetX}
                        step={10}
                    />
                    <Text>Target Y = {targetY}m</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={2000}
                        onSlidingComplete={(value) => setTargetY(value)}
                        onValueChange={smooth ? setTargetY : null}
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
