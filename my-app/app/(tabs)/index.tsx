import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';

export default function HelloWorldScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -100,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    spin.start();
    bounce.start();

    return () => {
      spin.stop();
      bounce.stop();
    };
  }, [spinValue, bounceValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello World</Text>
      <Animated.View
        style={[
          styles.ball,
          { transform: [{ rotate: spin }, { translateY: bounceValue }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
});
