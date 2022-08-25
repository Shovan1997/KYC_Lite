import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const Alart = ({
  isVisible,
  setIsVisible,
  okText,
  cancelText,
  title,
  subTitle,
  okPress,
  cancelPress,
}: QubeAlertProps) => {
  const styles = StyleSheet.create({
    centerModal: {
      justifyContent: 'center',
      margin: 15,
    },
    modalCard: {
      backgroundColor: '#FFF2F2',
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
      minHeight: 150,
      justifyContent: 'space-between',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    okButtonContainer: {
      flex: 1,
      paddingLeft: 5,
    },
    cancelButtonContainer: {
      flex: 1,
      paddingRight: 5,
    },
    button: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    okButton: {
      backgroundColor: '#22C2F4',
      height: 40,
    },
    cancelButton: {
      backgroundColor: '#FF6E6E',
      borderRadius: 5,
      height: 40,
      borderColor: '#fff',
      borderWidth: 1,
    },
    okButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    cancelButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    bikeImage: {
      height: 100,
      width: 100,
      zIndex: -1,
      position: 'absolute',
      top: 10,
      right: 10,
      opacity: 0.7,
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    titleText: {
      color: '#22C2F4',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subTitleText: {
      color: '#3B0918',
      fontSize: 16,
    },
  });
  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      backdropOpacity={0.4}
      animationInTiming={400}
      animationOutTiming={400}
      collapsable={true}
      style={styles.centerModal}>
      <View style={styles.modalCard}>
        <View style={styles.textContainer}>
          {!!title && <Text style={[styles.titleText]}>{title}</Text>}
          {!!subTitle && <Text style={[styles.subTitleText]}>{subTitle}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.cancelButtonContainer}>
            {!!cancelText && !!cancelPress && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={cancelPress}>
                <Text style={[styles.cancelButtonText]}>{cancelText}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.okButtonContainer}>
            {!!okPress && !!okText && (
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={okPress}>
                <Text style={[styles.okButtonText]}>{okText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Alart;
interface QubeAlertProps {
  isVisible: boolean;
  setIsVisible: any;
  okText: string;
  cancelText?: string;
  okPress: any;
  cancelPress?: any;
  title: string;
  subTitle?: string;
}
