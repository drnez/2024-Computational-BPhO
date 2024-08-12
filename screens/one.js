import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Default, { deg_to_rad } from '../components/Default';

export default function One({navigation}) {
    const [smooth, setSmooth] = useState(true);

    const [theta, setTheta] = useState(45);
    const [u, setU] = useState(20);
    const [h, setH] = useState(2);
    const [g, setG] = useState(9.81);
    let t_step = 0.02;

    let x = [];
    let y = [];

    let t = 0;
    let x_now = 0;
    let y_now = 0;

    while (y_now >= 0) {
        let ux = u*Math.cos(deg_to_rad(theta))
        let uy = u*Math.sin(deg_to_rad(theta))

        x_now = ux*t
        y_now = h + uy*t - 0.5*g*t*t

        x.push(x_now)
        y.push(y_now)

        t += t_step
    }

    return (
        <Default
            x={x}
            y={y}
            sliders={
                <>
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
