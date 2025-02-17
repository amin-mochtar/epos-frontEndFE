import { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Dimensions, Pressable, PermissionsAndroid, ViewStyle, ImageStyle, Platform, Text } from 'react-native';
import { Camera, CameraDeviceFormat, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import { Image } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { log, plaiStyles } from 'plai_common_frontend';
import { imStyles } from 'plai_common_frontend/src/components/input-image/input-image.style';
import { takeapicture } from '../../assets';
import RNFetchBlob from 'rn-fetch-blob';
import { eposCameraVisionStyle } from './epos-camera-vision.style';
import { pruTestID } from 'common_services_frontend';
import Orientation from 'react-native-orientation-locker'

export type TEposCameraVision = {
  onCapture: (base64Value: string) => void;
  base64Img: string;
  type?: 'ktp' | 'fullscreen' | 'custom';
  customStyle?: customStyle;
  cameraProps?: Camera;
  cameraFormat?: CameraDeviceFormat;
};

type customStyle = {
  cameraWrapper: ViewStyle;
  cameraResultStyle: ImageStyle;
};

export const EposCameraVision = ({
  onCapture,
  base64Img,
  type = 'ktp',
  customStyle,
  cameraProps,
  cameraFormat,
}: TEposCameraVision) => {
  const isTablet = DeviceInfo.isTablet();
  const { width } = Dimensions.get('window');
  const tabletMargin = isTablet ? (width * 30) / 100 : 0;
  const WIDTH_ASPECT_RATIO = 600;
  const HEIGHT_ASPECT_RATIO = 400;
  const PADDING_CONTAINER = !isTablet ? 32 : tabletMargin;
  const IMAGE_CONTAINER_ASPECT_RATIO = WIDTH_ASPECT_RATIO / HEIGHT_ASPECT_RATIO;
  const IMAGE_CONTAINER_WIDTH = width - PADDING_CONTAINER;
  const IMAGE_CONTAINER_HEIGHT = IMAGE_CONTAINER_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO;
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back')

  const format = useCameraFormat(device, [
    { photoAspectRatio: 6 / 4 },
    { photoResolution: { width: cameraFormat?.photoWidth || 600, height: cameraFormat?.photoHeight || 400 } },
  ])

  useEffect(() => {
    handleLaunchCameraImage();
  }, []);

  const handleRemoveBase64NotValidCharacter = (value: string) => value?.split('\r')?.join('')?.split('\n')?.join('');
  const fileToBase64 = async (fileUri: string) => {
    try {
      const base64Data = await RNFetchBlob.fs.readFile(fileUri, 'base64');
      onCapture(handleRemoveBase64NotValidCharacter(`${base64Data}`));
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const handleLaunchCameraImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        log('Camera permission given');
      } else {
        log('Camera permission denied');
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      // setIsShow(false);
    }
  };

  const handleCaptures = async () => {
    try {
      const file = await cameraRef?.current?.takePhoto({
        qualityPrioritization: 'balanced'
      });

      if (file?.path && file.path) {
        const additionalPath = Platform.OS === 'ios' ? '' : 'file:'
        fileToBase64(`${additionalPath}//${file?.path}`);
      }
    } catch (error) {
      console.error('Failed to capture photo:', error);
    }
  }

  const deviceOrientation = () => {
    const _orientation = Orientation.getDeviceOrientation((orientation) => {
      return orientation.toLowerCase();
    })
    return _orientation;
  }

  const cameraWrapperStyle = () => {
    const types = {
      ktp: eposCameraVisionStyle.ktp,
      fullscreen: eposCameraVisionStyle.fullscreen,
      custom: customStyle?.cameraWrapper,
    };

    return types[type] || types.ktp;
  };

  return (
    <View>
      {device && !base64Img ? (
        <>
          <View style={[cameraWrapperStyle()]}>
            <Camera
              ref={cameraRef}
              photo={true}
              style={[imStyles.image(IMAGE_CONTAINER_HEIGHT)]}
              isActive={true}
              device={device}
              orientation={deviceOrientation() as any}
              format={format}
              onInitialized={() => console.log('ready must be')}
              onError={(err) => console.log('onError', err)}
              {...cameraProps}
            />
          </View>

          <View style={[plaiStyles.mt32]}>
            <Pressable onPressIn={handleCaptures} style={[plaiStyles.selfCenter, eposCameraVisionStyle.iconCamera]}
              {...pruTestID(`button-camera`)}
            >
              <Image
                source={takeapicture}
                style={[plaiStyles.selfCenter, plaiStyles.mb24, eposCameraVisionStyle.iconCamera]}
              />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Image
            style={[
              eposCameraVisionStyle.captureResultWrapper,
              customStyle?.cameraResultStyle && customStyle?.cameraResultStyle,
            ]}
            source={{ uri: `data:image/jpeg;base64,${base64Img}` }}
          />
        </>
      )}
    </View>
  );
};
