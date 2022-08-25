import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
import {StoreState} from '../../models/reduxModels';
import {connect} from 'react-redux';
import {TakeVideoSuccess} from '../../redux/actions/videoCameraActions';
const QubeCameraBlink = (props: any) => {
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [blinkCount, setBlinkCount] = useState<number>(0);
  let camera: RNCamera | null = null;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    instructionText: {
      color: '#fff',
      fontSize: 18,
    },
  });

  const takePicture = async () => {
    if (!!camera) {
      const options: TakePictureOptions = {
        quality: 0.3,
        base64: true,
        width: 640,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      props.TakeVideoSuccess(data);
      console.log('back');

      props.navigation.goBack();
    }
  };

  useEffect(() => {
    if (eyeOpen == false) {
      setBlinkCount(blinkCount + 1);
    }
  }, [eyeOpen]);

  useEffect(() => {
    console.log('Blinks: ', blinkCount);
    if (blinkCount == 4) {
      takePicture();
    }
  }, [blinkCount]);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        onFacesDetected={response => {
          let leftEye = response?.faces[0].leftEyeOpenProbability
            ? response?.faces[0].leftEyeOpenProbability
            : 1;
          let rightEye = response?.faces[0].rightEyeOpenProbability
            ? response?.faces[0].rightEyeOpenProbability
            : 1;
          setEyeOpen(Math.round(leftEye) == 1 && Math.round(rightEye) == 1);
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            height: 150,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}></View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: 50,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              // borderColor: theme.colors.primary,
            }}></View>
          <View
            style={{
              height: '100%',
              width: 50,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></View>
        </View>
        <View
          style={{
            height: 150,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text style={[styles.instructionText]}>
            Blink 4 times to capture picture
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {};
};

const mapDispatchToProps = {
  TakeVideoSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(QubeCameraBlink);
