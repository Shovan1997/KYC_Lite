import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  TakePictureSuccess,
  ClearPictureData,
} from '../../redux/actions/cameraActions';
import {TakeVideoSuccess} from '../../redux/actions/videoCameraActions';
import {StoreState} from '../../models/reduxModels';
import Icons from 'react-native-vector-icons/Ionicons';
const QubeCamera = (props: any) => {
  const [video, SetVideo] = useState<boolean>(false);
  const [timer, SetTimer] = useState<number>(-1);
  let camera: RNCamera | null = null;
  var Count: any;
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
    capture: {
      // backgroundColor: theme.colors.card,
      // borderRadius: theme.roundness.smallRoundness,
      padding: 5,
      marginBottom: 10,
    },
  });

  const videoOperation = async () => {
    console.log('wait');

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('video start', timer);

    var cameraData = await camera?.recordAsync({
      codec: 'H264',
      quality: '480p',
      mute: true,
      fps: 15,
      videoBitrate: 1500,
    });
    props.TakeVideoSuccess(cameraData);
  };

  const stopVideoOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    camera?.stopRecording();
  };

  useEffect(() => {
    if (!!props?.route?.params && !!props.route.params?.video && !!camera) {
      SetTimer(5);
      SetVideo(true);
    }
  }, [camera]);

  useEffect(() => {
    if (!!video) {
      videoOperation();
    }
  }, [video]);
  useEffect(() => {
    if (timer >= 1) {
      CountDown();
    } else if (timer > -1) {
      props.navigation.goBack();
    }
    if (timer == 1) {
      stopVideoOperation();
    }
  }, [timer]);
  const CountDown = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    SetTimer(timer - 1);
  };
  const takePicture = async () => {
    if (!!camera) {
      const options: TakePictureOptions = {
        quality: 0.3,
        base64: true,
        width: 640,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      props.TakePictureSuccess({
        key: props.route.params.key,
        data: data,
      });
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={
          video ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
      />
      {!video && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Icons name="camera" color={'#FFFf'} size={70} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state: StoreState, ownProps: any) => {
  return {};
};

const mapDispatchToProps = {
  TakePictureSuccess,
  ClearPictureData,
  TakeVideoSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(QubeCamera);
