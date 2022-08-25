import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera} from '../../models/reduxModels';
import CheckBox from '@react-native-community/checkbox';
import {TakePictureResponse} from 'react-native-camera';

const FileUpload = ({
  SetStep,
  control,
  camera,
  OpenCamera,
  OpenFile,
  getValues,
  ClearPictureData,
  zipname,
}: FileProps) => {
  const [file3, SetFile3] = useState<boolean>(false);
  const [file4, SetFile4] = useState<boolean>(false);
  const [file5, SetFile5] = useState<boolean>(false);
  const CheckState = () => {
    if (
      !!getValues('documentIdentificationNo1') &&
      !!getValues('documentIdentificationNo2') &&
      !!camera?.camera1 &&
      !!camera.camera2
    ) {
      SetStep(4);
    } else {
      ToastAndroid.show('Invalid Data', 2000);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#22C2F4',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 5,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Upload Document</Text>
      </View>
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <CheckBox
          style={{
            position: 'absolute',
            left: 10,
          }}
          tintColor={'#ffff'}
          onCheckColor={'#ffff'}
          onFillColor={'#ffff'}
          onTintColor={'#ffff'}
          tintColors={{
            true: '#ffff',
            false: '#ffff',
          }}
          value={true}></CheckBox>
        <Text style={{color: '#fff', fontSize: 18}}>Aadhaar Card</Text>
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.label}>
          Aadhaar Card Number <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Aadhaar Card Number'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="documentIdentificationNo1"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Aadhaar Front Image <Text style={{color: 'red'}}>*</Text>
        </Text>
        {!!camera?.camera1 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={{uri: camera?.camera1.uri}}
              style={{
                height: 150,
                width: 200,
                borderRadius: 10,
              }}></Image>
            <TouchableOpacity onPress={() => ClearPictureData(1)}>
              <Ionicons
                color={'red'}
                name={'close-circle'}
                size={35}
                style={{
                  marginLeft: -60,
                  marginTop: -25,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {!camera?.camera1 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenCamera(1)}
                  color={'#C1C1C1'}
                  name={'camera-outline'}
                  size={30}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenFile(1)}
                  color={'#C1C1C1'}
                  name={'folder-outline'}
                  size={30}
                />
              </View>
            </View>
          </View>
        )}
        <Text style={styles.label}>
          Aadhaar Back Image <Text style={{color: 'red'}}>*</Text>
        </Text>
        {!!camera?.camera6 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={{uri: camera?.camera6.uri}}
              style={{
                height: 150,
                width: 200,
                borderRadius: 10,
              }}></Image>
            <TouchableOpacity onPress={() => ClearPictureData(6)}>
              <Ionicons
                color={'red'}
                name={'close-circle'}
                size={35}
                style={{
                  marginLeft: -60,
                  marginTop: -25,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {!camera?.camera6 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenCamera(6)}
                  color={'#C1C1C1'}
                  name={'camera-outline'}
                  size={30}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenFile(6)}
                  color={'#C1C1C1'}
                  name={'folder-outline'}
                  size={30}
                />
              </View>
            </View>
          </View>
        )}
        <Text style={styles.label}>Aadhaar Card Zip</Text>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <View
              style={{
                height: 80,
                width: 80,
                borderColor: '#D7D7D7',
                borderWidth: 0.5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!!zipname ? (
                <Ionicons
                  color={'green'}
                  name={'checkmark-circle-outline'}
                  size={40}
                />
              ) : (
                <Ionicons
                  onPress={() => OpenFile(7)}
                  color={'#C1C1C1'}
                  name={'folder-outline'}
                  size={30}
                />
              )}
            </View>
          </View>
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <View
              style={{
                height: 80,
                width: 160,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    placeholder={'Share Code'}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name="shareCode"
                rules={{required: true}}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <CheckBox
          style={{
            position: 'absolute',
            left: 10,
          }}
          tintColor={'#ffff'}
          onCheckColor={'#ffff'}
          onFillColor={'#ffff'}
          onTintColor={'#ffff'}
          tintColors={{
            true: '#ffff',
            false: '#ffff',
          }}
          value={true}></CheckBox>
        <Text style={{color: '#fff', fontSize: 18}}>Pan Card</Text>
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.label}>
          Pan Card Number <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Pan Card Number'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="documentIdentificationNo2"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Pan Card Image <Text style={{color: 'red'}}>*</Text>
        </Text>
        {!!camera?.camera2 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={{uri: camera?.camera2.uri}}
              style={{
                height: 150,
                width: 200,
                borderRadius: 10,
              }}></Image>
            <TouchableOpacity onPress={() => ClearPictureData(2)}>
              <Ionicons
                color={'red'}
                name={'close-circle'}
                size={35}
                style={{
                  marginLeft: -60,
                  marginTop: -25,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {!camera?.camera2 && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenCamera(2)}
                  color={'#C1C1C1'}
                  name={'camera-outline'}
                  size={30}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => OpenFile(2)}
                  color={'#C1C1C1'}
                  name={'folder-outline'}
                  size={30}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          flexDirection: 'row',
        }}>
        <CheckBox
          style={{
            position: 'absolute',
            left: 10,
          }}
          tintColor={'#ffff'}
          onCheckColor={'#ffff'}
          onFillColor={'#ffff'}
          onTintColor={'#ffff'}
          tintColors={{
            true: '#ffff',
            false: '#ffff',
          }}
          value={file3}
          onValueChange={newValue => (
            SetFile3(newValue), ClearPictureData(3)
          )}></CheckBox>
        <Text style={{color: '#fff', fontSize: 18}}>Passport</Text>
      </View>
      {!!file3 && (
        <View style={{padding: 15}}>
          <Text style={styles.label}>Passport Number</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder={'Passport Number'}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="documentIdentificationNo3"
            // rules={{required: true}}
          />
          <Text style={styles.label}>Passport Image</Text>
          {!!camera?.camera3 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Image
                source={{uri: camera?.camera3.uri}}
                style={{
                  height: 150,
                  width: 200,
                  borderRadius: 10,
                }}></Image>
              <TouchableOpacity onPress={() => ClearPictureData(3)}>
                <Ionicons
                  color={'red'}
                  name={'close-circle'}
                  size={35}
                  style={{
                    marginLeft: -60,
                    marginTop: -25,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {!camera?.camera3 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenCamera(3)}
                    color={'#C1C1C1'}
                    name={'camera-outline'}
                    size={30}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenFile(3)}
                    color={'#C1C1C1'}
                    name={'folder-outline'}
                    size={30}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <CheckBox
          style={{
            position: 'absolute',
            left: 10,
          }}
          tintColor={'#ffff'}
          onCheckColor={'#ffff'}
          onFillColor={'#ffff'}
          onTintColor={'#ffff'}
          tintColors={{
            true: '#ffff',
            false: '#ffff',
          }}
          value={file4}
          onValueChange={newValue => (
            SetFile4(newValue), ClearPictureData(4)
          )}></CheckBox>
        <Text style={{color: '#fff', fontSize: 18}}>Voter's Identity Card</Text>
      </View>
      {!!file4 && (
        <View style={{padding: 15}}>
          <Text style={styles.label}>Voter's Identity Card Number</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder={"Voter's Identity Card Number"}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="documentIdentificationNo4"
            // rules={{required: true}}
          />
          <Text style={styles.label}>Voter's Identity Card Image</Text>
          {!!camera?.camera4 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Image
                source={{uri: camera?.camera4.uri}}
                style={{
                  height: 150,
                  width: 200,
                  borderRadius: 10,
                }}></Image>
              <TouchableOpacity onPress={() => ClearPictureData(4)}>
                <Ionicons
                  color={'red'}
                  name={'close-circle'}
                  size={35}
                  style={{
                    marginLeft: -60,
                    marginTop: -25,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {!camera?.camera4 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenCamera(4)}
                    color={'#C1C1C1'}
                    name={'camera-outline'}
                    size={30}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenFile(4)}
                    color={'#C1C1C1'}
                    name={'folder-outline'}
                    size={30}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <CheckBox
          style={{
            position: 'absolute',
            left: 10,
          }}
          tintColor={'#ffff'}
          onCheckColor={'#ffff'}
          onFillColor={'#ffff'}
          onTintColor={'#ffff'}
          tintColors={{
            true: '#ffff',
            false: '#ffff',
          }}
          value={file5}
          onValueChange={newValue => (
            SetFile5(newValue), ClearPictureData(5)
          )}></CheckBox>
        <Text style={{color: '#fff', fontSize: 18}}>Driving Licence</Text>
      </View>
      {!!file5 && (
        <View style={{padding: 15}}>
          <Text style={styles.label}>Driving Licence Number</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder={'Driving Licence Number'}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="documentIdentificationNo5"
            // rules={{required: true}}
          />
          <Text style={styles.label}>Driving Licence Image</Text>
          {!!camera?.camera5 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Image
                source={{uri: camera?.camera5.uri}}
                style={{
                  height: 150,
                  width: 200,
                  borderRadius: 10,
                }}></Image>
              <TouchableOpacity onPress={() => ClearPictureData(5)}>
                <Ionicons
                  color={'red'}
                  name={'close-circle'}
                  size={35}
                  style={{
                    marginLeft: -60,
                    marginTop: -25,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {!camera?.camera5 && (
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenCamera(5)}
                    color={'#C1C1C1'}
                    name={'camera-outline'}
                    size={30}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderColor: '#D7D7D7',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    onPress={() => OpenFile(5)}
                    color={'#C1C1C1'}
                    name={'folder-outline'}
                    size={30}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      <View style={{padding: 15}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={{
                marginTop: 40,
                height: 40,
                backgroundColor: '#A4A4A4',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => SetStep(2)}>
              <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => CheckState()}>
              <Text style={{color: '#fff', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FileUpload;
const styles = StyleSheet.create({
  label: {
    color: '#575759',
    margin: 15,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#22C2F4',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#D7D7D7',
    height: 50,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
});
interface FileProps {
  control?: any;
  SetStep?: any;
  camera?: Camera;
  OpenCamera?: any;
  OpenFile?: any;
  getValues?: any;
  ClearPictureData?: any;
  zipname?: string;
}
