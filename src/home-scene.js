import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

class HomeScene extends Component {

    state = { result: {} };

    onResult = data =>{
        this.setState({
            result: data
        });
        console.log('home:-', data)
    }

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text> Home :)</Text>
                <Button
                    title='Abrir Camra'
                    onPress={() => navigation.navigate('CameraScreen', {onResult: this.onResult})}
                />
                <Image 
                    style={{                    
                        width: 200,
                        height: 200,
                        resizeMode: 'contain'
                    }}

                    source={{
                        uri: this.state.result.base64 ? 'data:image/jpg;base64,' + this.state.result.base64 : ''
                    }}
                />                        
            </View>
        );
    }
}

export default HomeScene;