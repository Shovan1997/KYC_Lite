import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  RTCIceCandidateType,
} from 'react-native-webrtc';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  OfferCall,
  HangupCall,
  PollAnswer,
  SendIce,
} from '../../services/WebrtcService';
import {
  CallItem,
  WebrtcPayloadItem,
  ProductItem,
} from '../../models/WebRTCModels';
import InCallManager from 'react-native-incall-manager';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {StoreState} from '../../models/reduxModels';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
var RNFS = require('react-native-fs');
const VideoCall = (props: any) => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const [videoURL, setVideoURL] = useState<any>('');
  const [videoStream, setVideoStream] = useState<
    MediaStream | boolean | undefined
  >();
  const [zip, setZip] = useState<any>();
  const [Pin, Setpin] = useState<any>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [remoteVideoURL, setRemoteVideoURL] = useState<string>('');
  const [key, setKey] = useState<number>();
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);
  const [videoStop, videoStopSet] = useState<boolean>(false);
  const [emailId, setEmailId] = useState<string>();
  const [receiveChannel, SetreceiveChannel] = useState<any>();
  var webrtcUuid: string;
  const configuration = {
    iceServers: [
      {url: 'stun:stun.l.google.com:19302'},
      {url: 'stun:stun1.l.google.com:19302'},
      {url: 'stun:stun2.l.google.com:19302'},
      {url: 'stun:stun3.l.google.com:19302'},
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com',
      },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808',
      },
    ],
  };
  var pc: RTCPeerConnection;
  var id: any;

  const sendIceData = async (
    candidate: RTCIceCandidateType,
    webrtcUuid: string,
  ) => {
    try {
      var response = await SendIce({
        ice_payload: candidate,
        webrtc_uuid: webrtcUuid,
      });
      if (response.data.exception) {
        console.log('Error From Ice Service : ', response.data.Errors);
      }
    } catch (error) {
      console.log('Error From Ice Service : ', error);
    }
  };

  const sendOfferData = async (offer: any) => {
    try {
      var response = await OfferCall({
        ...props.route.params.call,
        customer_email: emailId,
        offer_payload: offer,
      });
      if (!response.data.exception) {
        webrtcUuid = response.data.data.webrtc_uuid;
        pc.onicecandidate = ({candidate}) => {
          sendIceData(candidate, webrtcUuid);
        };
      } else {
        console.log('Error From Offer Service : ', response.data.Errors);
      }
    } catch (error) {
      console.log('Error From Offer Service : ', error);
    }
  };

  const addIceCandidate = async (candidate: RTCIceCandidateType) => {
    try {
      await pc.addIceCandidate(candidate);
    } catch (error) {}
  };

  const operateOnPollData = async (data: OfferPollingResponse) => {
    if (!data.answer_item) {
      ToastAndroid.show(
        'Executive has disconnected the call.',
        ToastAndroid.SHORT,
      );
      onHangupPress();
    } else {
      if (pc.signalingState == 'have-local-offer') {
        var answer = data.answer_payloads.find(
          m => m.type == 'answer',
        )?.payload;
        if (!!answer) {
          pc.setRemoteDescription(answer).then(
            () => {
              InCallManager.stopRingback();
              console.log('Remote Desc Set');
            },
            error => {
              console.log('Error Setting Remote Desc', error);
            },
          );
        }
      }
      var iceCandidates = data.answer_payloads.filter(
        m => m.type == 'answer_ice',
      );
      iceCandidates.forEach(element => {
        addIceCandidate(element.payload);
      });
    }
  };

  const setupPolling = () => {
    if (!!id) {
      clearInterval(id);
    }
    id = setInterval(async () => {
      try {
        if (!!emailId) {
          var response = await PollAnswer({
            customer_email: emailId,
            partner_id: props.route.params.call.partner_id,
            webrtc_uuid: webrtcUuid,
          });
          console.log(response);
          
          if (!response.data.exception) {
            operateOnPollData(response.data.data);
          } else {
            console.log('Error From Polling Service : ', response.data.Errors);
          }
        }
      } catch (error) {
        console.log('Error From Polling Service : ', error);
      }
    }, 5000);
  };

  const onHangupPress = () => {
    if (!!emailId) {
      HangupCall({
        customer_email: emailId,
        partner_id: props.route.params.call.partner_id,
      });
    }
    props.navigation.goBack();
  };

  const start = () => {
    try {
      InCallManager.start({media: 'video', ringback: '_DTMF_'});
      pc = new RTCPeerConnection(configuration);
      mediaDevices.enumerateDevices().then(async sourceInfos => {
        console.log(sourceInfos);
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind == 'videoinput' &&
            sourceInfo.facing == (isFront ? 'front' : 'environment')
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 0, // Provide your own width, height and frame rate here
              minHeight: 0,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        };
        const stream = await mediaDevices.getUserMedia(Object(constraints));
        pc.addStream(Object(stream));
        setVideoURL(Object(stream).toURL());
        setVideoStream(stream);
        pc.onaddstream = event => {
          setRemoteVideoURL(event.stream.toURL());
        };
        pc.onsignalingstatechange = () => {
          console.log('Signalling State : ', pc.signalingState);
          if (pc.signalingState == 'have-local-offer') {
            setupPolling();
          }
        };
        pc.onnegotiationneeded = async () => {
          console.log('Negotiation Needed');
          try {
            const dataChannel = pc.createDataChannel('sendDataChannel');
            SetreceiveChannel(dataChannel);
            dataChannel.onopen = () => {
              console.log('Channel Open');
              dataChannel.onmessage = onReceiveMessageCallback;
            };
            var offerData = await pc.createOffer();
            await pc.setLocalDescription(offerData);
            await sendOfferData(offerData);
          } catch (err) {
            console.error(err);
          }
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onReceiveMessageCallback = async (event: any) => {
    console.log(event, 'event');
    console.log(videoStop, videoStream, event?.data);

    if (!videoStop && !!event?.data) {
      let data = JSON.parse(event.data);
      setKey(data.key);
      if (data.key == 1) {
        setIsFront(true);
        videoStopSet(true);
      } else if (data.key == 5) {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [DocumentPicker.types.zip],
          copyTo: 'documentDirectory',
        });
        RNFS.readFile(response[0].fileCopyUri, 'base64').then((data: any) => {
          setZip(data);
        });
      } else {
        setIsFront(false);
        videoStopSet(true);
      }
    }
  };
  useEffect(() => {
    if (!!videoStream) {
      var videoTrack: any[] = Object(videoStream).getVideoTracks();
      if (videoTrack.length > 0) {
        if (videoStop) {
          videoTrack[0].enabled = false;
        } else {
          videoTrack[0].enabled = true;
        }
      }
    }
  }, [videoStop]);

  const muteCall = () => {
    var audioTrack: MediaStreamTrack[] = Object(videoStream).getAudioTracks();
    if (audioTrack.length > 0) {
      audioTrack[0].enabled = !audioTrack[0].enabled;
      setIsMuted(audioTrack[0].muted);
    }
  };

  const switchCamera = () => {
    let videoTrack: any[] = Object(videoStream).getVideoTracks();

    if (videoTrack.length > 0) {
      videoTrack[0]._switchCamera();
    }
  };

  useEffect(() => {
    if (!!props?.user?.customer_id) {
      setEmailId(props.user.contact_no);
    }
    // start();
  }, []);

  useEffect(() => {
    console.log(emailId);
    if (!!emailId) {
      setIsEmailVisible(false);
      start();
    } else {
      setIsEmailVisible(true);
    }

    return () => {
      InCallManager.stop();
      console.log('Cleanup');
      clearInterval(id);
      if (!!pc) {
        pc.close();
      }
    };
  }, [emailId]);
  let camera: RNCamera | null = null;

  const takePicture = async () => {
    if (!!camera) {
      const options: TakePictureOptions = {
        quality: 0.3,
        base64: true,
        width: 640,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);

      sendInstraction({
        data: data.base64,
        key: key,
      });
      videoStopSet(false);
    }
  };
  const sendInstraction = (product: sendInstractionPayload) => {
    if (!!receiveChannel) {
      receiveChannel.send(JSON.stringify(product));
      ToastAndroid.show('Request send to Bank', 3000);
    } else {
      console.log('No Channel', receiveChannel);
    }
  };
  const SendZip = () => {
    sendInstraction({
      data: zip,
      key: key,
      pin: Pin,
    });
    setZip(undefined);
    Setpin(undefined);
  };
  return (
    <View style={{flex: 1}}>
      {!videoStop ? (
        <>
          <RTCView
            streamURL={videoURL}
            objectFit={'cover'}
            zOrder={1}
            style={
              !!remoteVideoURL ? styles.smallVideoContainer : styles.container
            }
            mirror={true}
          />
          <RTCView
            streamURL={remoteVideoURL}
            objectFit={'cover'}
            zOrder={-2}
            style={!!remoteVideoURL ? styles.container : {flex: 0}}
            mirror={true}
          />
        </>
      ) : (
        <RNCamera
          ref={ref => {
            camera = ref;
          }}
          style={styles.preview}
          type={
            isFront
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
        />
      )}
      {!!zip && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: '#ffff',
              padding: 10,
              borderRadius: 5,
            }}>
            <TextInput
              style={styles.input}
              placeholder={'Security Pin'}
              onChangeText={value => Setpin(value)}
              value={Pin}
            />
            <TouchableOpacity style={styles.button} onPress={() => SendZip()}>
              <Text style={{color: '#fff', fontSize: 18}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!videoStop ? (
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            onPress={switchCamera}
            style={{flexShrink: 1, padding: 10}}>
            <Icon name="camera-reverse" color={'#fff'} size={30}></Icon>
          </TouchableOpacity>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '50%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#eb4034',
                borderColor: '#eb4034',
                height: 50,
                padding: 10,
                borderRadius: 4,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onHangupPress()}>
              <Text style={{color: '#ffff', fontSize: 18}}>Hangup</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={muteCall}
            style={{flexShrink: 1, padding: 10}}>
            <Icon
              name={isMuted ? 'mic' : 'mic-off'}
              color={'#ffff'}
              size={30}></Icon>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.fieldContainer}>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '50%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFF',
                borderColor: '#eb4034',
                height: 50,
                padding: 10,
                borderRadius: 4,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={takePicture}>
              <Text style={{color: '#ffff', fontSize: 18}}>Capture</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  smallVideoContainer: {
    position: 'absolute',
    top: 60,
    right: 15,
    height: 160,
    width: 90,
  },
  fieldContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
  },
  fieldContainer2: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
  },
  centerAlign: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacingMargin: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#D7D7D7',
    height: 48,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    color: 'white',
    height: 40,
    backgroundColor: '#22C2F4',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface OfferPollingResponse {
  answer_item: CallItem;
  answer_payloads: WebrtcPayloadItem[];
}

interface EmailForm {
  email_id: string;
}

const mapStateToProps = (state: StoreState) => ({
  user: state.user.userdetail,
});

export default connect(mapStateToProps)(VideoCall);
interface sendInstractionPayload {
  key?: number;
  data?: any;
  pin?: number;
}
