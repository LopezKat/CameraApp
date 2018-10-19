import React, { Component } from 'react';
import { View, Text, Button, CameraRoll, Image, ScrollView, StyleSheet, PermissionsAndroid} from 'react-native';

 class CameraRollScene extends Component {

    state={
        photos: []
    }

    componentDidMount(){
        this.requestCameraRollPermission();
    }

    async requestCameraRollPermission(){
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    title: 'Acceso al storage',
                    message: 'Permite el acceso a tú albúm de fotos'
                }
            );
            if(granted==PermissionsAndroid.RESULTS.GRANTED){
                console.log('permiso garantizado');
            }else{
                console.log('permiso NO garantizado');
            }
        }catch{
            console.warn(error)
        }
    }


    showGalleryImages = () =>{
        CameraRoll.getPhotos({
            first: 10,
            assetType: 'Photos'
        })
        .then(r =>{
            this.setState({photos: r.edges})
        })
        .catch(err => console.log(err));
    }

    

  render() {
    return (
      <View>
        <Button 
            title="Cargar Imagenes de Galeria"
            onPress = {this.showGalleryImages}
        />
        <ScrollView>
            {
                this.state.photos.map((value,key)=>{
                    return (
                        <Image 
                            key={ key }
                            style={styles.imageSize}
                            source={{ uri: value.node.image.uri}}
                        />
                    )
                })
            }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    imageSize:{
        width: 400,
        height: 200
    }
});
export default CameraRollScene;