import Animated from 'react-native-reanimated';

export function AnimatedTitle() {
  return (
    <Animated.Text
      style={{
        fontSize: 20,
        marginTop: 50,
        animationName: {
          '50%': { transform: [{ scale: 2 }] },
        },
        animationIterationCount: 2,
        animationDuration: '500ms',
      }}>
      Ecuaciones de segundo grado
    </Animated.Text>
  );
}
