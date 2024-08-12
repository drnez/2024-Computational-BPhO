import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { View, Dimensions } from 'react-native';

function ProjectileAnimation({path}) {
    const sf = 5;

    const x = useSharedValue(path.x[0]);
    const y = useSharedValue(Dimensions.get("window").height - path.y[0]);

    useEffect(() => {
        path.x.forEach((_, index) => {
            setTimeout(() => {
                x.value = withTiming(path.x[index] * sf, {duration:5});
                y.value = withTiming(Dimensions.get("window").height - 200 - path.y[index] * sf, {duration:5});
            }, index*5);
        });
    }, [path]);

    const animated_style = useAnimatedStyle(() => {
        return {
            transform: [{translateX: x.value}, {translateY: y.value}]
        };
    });

    return <Animated.View style={[{
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        postition: 'absolute',
    }, animated_style]} />;
}

export default function EightTwo({route}) {
    return (
        <View style={{flex:1}}>
            <View style={{
                zIndex: -1,
                backgroundColor: 'lime',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }} />
            <View style={{
                zIndex: -1,
                backgroundColor: 'cyan',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 105
            }} />
            <ProjectileAnimation path={route.params.animation_xy} />
        </View>
    );
}
