import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { sin, cos } from '../components/Default';

export default function Eight({navigation}) {
    function plots(u, h, g, theta, bounces, C) {
        let x = [];
        let y = [];

        let x_now = 0;
        let y_now = h;
        let count = 0;
        let t = 0;
        const t_step = 0.04;

        const st = sin(theta);
        const ct = cos(theta);

        let vx = u*ct;
        let vy = u*st;

        while (count <= bounces) {
            x.push(x_now);
            y.push(y_now);

            let ax = 0;
            let ay = -g;

            x_now += vx*t_step + 0.5*ax*t_step*t_step;
            y_now += vy*t_step + 0.5*ay*t_step*t_step;

            vx += 0.5*(2*ax)*t_step;
            vy += 0.5*(2*ay)*t_step;

            if (y_now < 0) {
                y_now = 0;
                vy *= -C;
                count += 1;
            }

            t += t_step;
        }

        return [x,y];
    }

    const [smooth, setSmooth] = useState(false);

    const [userU, setUserU] = useState(10);
    const [userH, setUserH] = useState(2);
    const [userG, setUserG] = useState(9.81);
    const [userTheta, setUserTheta] = useState(60);
    const [CoR, setCoR] = useState(0.7);
    const [bounces, setBounces] = useState(5);

    const path = plots(userU, userH, userG, userTheta, bounces, CoR);
    const animation_xy = {
        x: path[0],
        y: path[1]
    };

    return (
        <Default
            x={path[0]}
            y={path[1]}
            sliders={
                <>
                    <Text style={{fontWeight:'bold'}}>Key: black: using input launch angle, blue: launch angle optimised for max range</Text>
                    <View style={{padding:5}} />
                    <Button
                    title="Animation"
                    onPress={() => navigation.navigate("Challenge Eight (2)", {animation_xy})}
                    />
                    <View style={{padding: 10}} />
                    <Text>Launch Speed = {userU} m/s</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        onSlidingComplete={(value) => setUserU(value)}
                        onValueChange={smooth && setUserU}
                        value={userU}
                        step={5}
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
                        maximumValue={150}
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
                    <Text>Coefficient of Restitution = {Math.round(100*CoR)/100}</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        onSlidingComplete={(value) => setCoR(value)}
                        onValueChange={smooth && setCoR}
                        value={CoR}
                        step={0.01}
                    />
                    <Text>Number of Bounces = {bounces}</Text>
                    <Slider
                        style={{width: 300, height: 40}}
                        minimumValue={1}
                        maximumValue={20}
                        onSlidingComplete={(value) => setBounces(value)}
                        onValueChange={smooth && setBounces}
                        value={bounces}
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
