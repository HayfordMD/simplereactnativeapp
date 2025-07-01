import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

const RetroGridBackground = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40], // Grid cell height
  });

  // Generate grid lines
  const renderGrid = () => {
    const grid = [];
    const columns = Math.ceil(width / 40) + 1;
    const rows = Math.ceil(height / 40) + 2;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        grid.push(
          <Animated.View
            key={`${i}-${j}`}
            style={[
              styles.gridCell,
              {
                left: j * 40,
                top: i * 40,
                transform: [{ translateY }],
                borderColor: i % 2 === 0 ? '#00FFFF' : '#FF00FF',
              },
            ]}
          />
        );
      }
    }
    return grid;
  };

  return (
    <View style={styles.container}>
      {renderGrid()}
      <View style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  gridCell: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 1,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default RetroGridBackground;
