import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
}

const whiteBalanceOrder = {
  auto: 'torch',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
}


export default class CameraScene extends Component {

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '4:3',
    showGallery: 'false',
    photos: [],
    recordOptions: {
      mute: 'false',
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality["288p"]
    },
    isRecording: false
  };

  flashEvent = () => {
    this.setState({
      flash: flashModeOrder[this.state.flash]
    });
  }

  balanceEvent = () => {
    this.setState({
      whiteBalance: whiteBalanceOrder[this.state.whiteBalance]
    });
  }


  typeEvent = () => {
    this.setState({
      type: this.state.type == 'front' ? 'back' : 'front'
    });
  }

  zoomEvent=(value)=>{
    this.setState({
      zoom: value
    });
  }

  textRecognizedEvent=({ textBlocks })=>{
    console.log(textBlocks);
  }

  onBarCodeReadEvent=({data, type})=>{
    console.log('data');
    console.log('type');
  }

  cameraRender() {
    return (
      <RNCamera
        ref={
          ref => {
            this.camera = ref;
          }
        }
        style={styles.camera}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        focusDepth={this.state.depth}
        /*onTextRecognized={this.textRecognizedEvent}*/
        onBarCodeRead={this.onBarCodeReadEvent}
        permissionDialogTitle={'Permiso para usar la camara'}
        permissionDialogMessage={'Necesitas el permiso para usuar la camara del dispositivo'}
      >
        <View style={styles.containerCamera}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.flashEvent}>
            <Text style={styles.textButton}>Flash: {this.state.flash}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.typeEvent}>
            <Text style={styles.textButton}>Type: {this.state.type}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.balanceEvent}>
            <Text style={styles.textButton}>Balance: {this.state.whiteBalance}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerZoom}>          
          <Slider style={styles.slider}
            step={0.1} 
            maximumValue={1}
            onValueChange={this.zoomEvent}
            />
        </View>
        <View style={styles.containerControls}>
          <Text>Controles</Text>
        </View>
      </RNCamera>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.cameraRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',

  },
  camera: {
    flex: 1,
  },
  containerCamera: {
    flex: 0.5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
  },
  textButton: {
    color: '#fff',
    fontSize: 14
  },
  containerZoom: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
  },
  containerControls: {
    flex: 0.2,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  slider: {
    width: 200
  }
});
