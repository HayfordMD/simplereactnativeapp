import { StyleSheet, Text, View } from 'react-native';
import RetroGridBackground from '@/components/RetroGridBackground';

export default function NeonTestScreen() {
  return (
    <View style={styles.container}>
      <RetroGridBackground />
      <View style={styles.content}>
        <Text style={styles.title}>80s RETRO GRID</Text>
        <Text style={styles.subtitle}>RACING INTO THE FUTURE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
