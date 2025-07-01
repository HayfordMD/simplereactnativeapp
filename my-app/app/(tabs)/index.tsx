import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <Link href="/neon-test" style={{ marginTop: 20 }}>
          <ThemedText type="link">Try 80s Neon Background</ThemedText>
        </Link>
      </ThemedView>
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
  titleContainer: {
    marginBottom: 20,
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
