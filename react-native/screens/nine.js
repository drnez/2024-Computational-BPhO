import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos, tan, arcsin } from '../components/Default';

export default function Nine({navigation}) {
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

    function normal_plots(u, h, g, theta) {
        let x = [];
        let y = [];
        let t_arr = [];
        let vx_arr = [];
        let vy_arr = [];
        let v_arr = [];

        let x_now = 0;
        let y_now = h;
        let t = 0;
        const t_step = 0.02;

        const ux = u*cos(theta);
        const uy = u*sin(theta);

        while (y_now >= 0) {
            t += t_step;

            x.push(x_now);
            y.push(y_now);
            t_arr.push(t);

            x_now = ux*t;
            old_y = y_now;
            y_now = h + uy*t - 0.5*g*t*t;

            const vy = (y_now - old_y)/t_step;
            vy_arr.push(vy);
            vx_arr.push(ux);
            const v = Math.sqrt(ux*ux + vy*vy);
            v_arr.push(v);
        }

        return [x, y, t_arr, vx_arr, vy_arr, v_arr];
    }

    function ar_plots(u, h, g, theta, cD, A, rho, m) {
        const k = (0.5*cD*rho*A)/m;
        const t_step = 0.02;

        let x = [];
        let y = [];
        let t_arr = [];
        let vx_arr = [];
        let vy_arr = [];
        let v_arr = [];

        let x_now = 0;
        let y_now = h;
        let t = 0;

        let vx = u*cos(theta);
        let vy = u*sin(theta); //
        let v = u;

        while (y_now > 0) {
            x.push(x_now);
            y.push(y_now);
            t_arr.push(t);
            vx_arr.push(vx);
            vy_arr.push(vy);
            v_arr.push(v);

            const ax = -1*(vx/v)*k*v*v;
            const ay = -g-(vy/v)*k*v*v;

            x_now += vx*t_step + 0.5*ax*t_step*t_step;
            y_now += vy*t_step + 0.5*ay*t_step*t_step;

            vx += ax*t_step;
            vy += ay*t_step;
            v = Math.sqrt(vx*vx+vy*vy);

            t += t_step;
        }
        
        return [x, y, t_arr, vx_arr, vy_arr, v_arr];
    }

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(20);
    const [userH, setUserH] = useState(2);
    const [userG, setUserG] = useState(9.81);
    const [userTheta, setUserTheta] = useState(30);

    const [cD, setCD] = useState(1);
    const [area, setArea] = useState(0.0079);
    const [rho, setRho] = useState(1);
    const [mass, setMass] = useState(0.1);

    const normal_points = normal_plots(userU, userH, userG, userTheta);
    const normal_all = {
        x: normal_points[0],
        y: normal_points[1],
        t: normal_points[2],
        vx: normal_points[3],
        vy: normal_points[4],
        v: normal_points[5]
    };
    const normal_xy = {
        x: normal_points[0],
        y: normal_points[1]
    };

    const ar_points = ar_plots(userU, userH, userG, userTheta, cD, area, rho, mass);
    const ar_all = {
        x: ar_points[0],
        y: ar_points[1],
        t: ar_points[2],
        vx: ar_points[3],
        vy: ar_points[4],
        v: ar_points[5]
    };
    const ar_xy = {
        x: ar_points[0],
        y: ar_points[1]
    };

    const data = merge_data(normal_xy, ar_xy);

    return (
        <Default
            data={data}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: black: drag-free model, blue: air resistance incorporated</Text>
                    <View style={{padding:5}} />
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate("Challenge Nine (2)", {normal_all, ar_all})}
                    />
                    <View style={{padding: 10}} />
                    <Text>Launch Speed = {userU} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={250}
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
                    <Text>Drag Coefficient = {Math.round(100*cD)/100}</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.1}
                        maximumValue={5}
                        onSlidingComplete={(value) => setCD(value)}
                        onValueChange={smooth && setCD}
                        value={cD}
                        step={0.1}
                    />
                    <Text>Cross Sectional Area = {Math.round(1000*area)/1000} m^2</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={0.5}
                        onSlidingComplete={(value) => setArea(value)}
                        onValueChange={smooth && setArea}
                        value={area}
                        step={0.001}
                    />
                    <Text>Air Density = {Math.round(100*rho)/100} kgm^-3</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.1}
                        maximumValue={20}
                        onSlidingComplete={(value) => setRho(value)}
                        onValueChange={smooth && setRho}
                        value={rho}
                        step={0.1}
                    />
                    <Text>Object Mass = {Math.round(100*mass)/100} kg</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0.01}
                        maximumValue={2}
                        onSlidingComplete={(value) => setMass(value)}
                        onValueChange={smooth && setMass}
                        value={mass}
                        step={0.01}
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
