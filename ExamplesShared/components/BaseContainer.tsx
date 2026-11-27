import React, { createContext, useContext, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type RegisterBackgroundColor = (color: SharedValue<string>) => void;

const RegisterBackgroundColorContext = createContext<RegisterBackgroundColor | null>(null);

/**
 * The color the example follows, tinting the modal background while the example runs inside a `BaseContainer`.
 *
 * Rendered on its own, outside a container, it is an ordinary shared value and nothing paints with it.
 */
export function useContainerBackgroundColor(initialColor: string): SharedValue<string> {
  const color = useSharedValue(initialColor);
  const registerBackgroundColor = useContext(RegisterBackgroundColorContext);

  useEffect(() => registerBackgroundColor?.(color), [registerBackgroundColor, color]);

  return color;
}

type BaseContainerProps = {
  name: string;
  children: React.ReactNode;
};

export default function BaseContainer({ name, children }: BaseContainerProps) {
  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<SharedValue<string> | null>(null);

  const backgroundColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: backgroundColor ? backgroundColor.value : '#aaa' };
  });

  return (
    <>
      <Pressable style={styles.btn} onPress={() => setShowModal(true)}>
        <Text style={styles.btnTxt}>{name} </Text>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Animated.View style={[styles.wrapper, backgroundColorStyle]}>
            <SafeAreaPaddingView>
              <View style={styles.container}>
                <RegisterBackgroundColorContext.Provider value={setBackgroundColor}>
                  {children}
                </RegisterBackgroundColorContext.Provider>
              </View>
              <View style={styles.closeBtnContainer}>
                <Pressable style={styles.btn} onPress={() => setShowModal(false)}>
                  <Text style={styles.btnTxt}>Close</Text>
                </Pressable>
              </View>
            </SafeAreaPaddingView>
          </Animated.View>
        </SafeAreaProvider>
      </Modal>
    </>
  );
}

/** Pads its children by the safe area insets, known from the first render. */
function SafeAreaPaddingView({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  const paddingStyle = {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };

  return <View style={[styles.wrapper, paddingStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#707070',
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 300,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  closeBtnContainer: {
    marginVertical: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
