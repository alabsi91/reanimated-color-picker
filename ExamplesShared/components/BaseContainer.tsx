import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

type BaseContainerProps = {
  name: string;
  children: React.ReactNode;
  backgroundColor?: SharedValue<string>;
};

export default function BaseContainer({ name, backgroundColor, children }: BaseContainerProps) {
  const [showModal, setShowModal] = useState(false);

  const backgroundColorStyle = useAnimatedStyle(() => {
    return { backgroundColor: backgroundColor ? backgroundColor.value : '#aaa' };
  });

  return (
    <>
      <Pressable style={styles.btn} onPress={() => setShowModal(true)}>
        <Text style={styles.btnTxt}>{name} </Text>
      </Pressable>

      <Modal onRequestClose={() => setShowModal(false)} visible={showModal} animationType='slide'>
        <Animated.View style={[styles.wrapper, backgroundColorStyle]}>
          <View style={styles.container}>{children}</View>
          <View style={styles.closeBtnContainer}>
            <Pressable style={styles.btn} onPress={() => setShowModal(false)}>
              <Text style={styles.btnTxt}>Close</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
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

    ...Platform.select({
      web: { boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px' },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      },
    }),
  },
  closeBtnContainer: {
    marginVertical: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
