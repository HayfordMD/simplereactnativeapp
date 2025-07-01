import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const NeonHorizonBackground = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1000],
  });

  // Generate racing horizon lines with neon colors
  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < 20; i++) {
      lines.push(
        <Animated.View
          key={i}
          style={[
            styles.line,
            {
              backgroundColor: i % 2 === 0 ? '#00FFFF' : '#FF00FF',
              top: 100 + i * 40,
              transform: [{ translateX }],
            },
          ]}
        />
      );
    }
    return lines;
  };

  return (
    <View style={styles.container}>
      {renderLines()}
      <View style={styles.gradientOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  line: {
    position: 'absolute',
    height: 2,
    width: 2000,
    opacity: 0.7,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default NeonHorizonBackground;
