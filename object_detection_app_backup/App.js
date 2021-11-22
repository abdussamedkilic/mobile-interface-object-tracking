import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      objectCount: 0,
      image: null,
      images: [],
      showResult: false,
      //spinner: true
    }
  }

  cleanupSingleImage = () => {
    let img = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);

    ImagePicker.cleanSingle(this.state.img ? this.state.img.uri : null)
      .then(() => {
        console.log(`removed tmp image ${this.state.img.uri} from tmp directory`);
        setImage(null)
      })
      .catch((e) => {
        alert(e);
      });
  }

  pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',

    })
      .then((image) => {
        console.log('received image', image);

        // Upload image
        this.uploadImage(image.path);

        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          }
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  uploadImage = async (imagePath) => {
    var photo = {
      uri: imagePath,
      type: 'image/jpeg',
      name: 'image.jpg',
    };

    var body = new FormData();
    body.append('image', photo);
    body.append('title', 'A beautiful photo!');

    const response = await fetch('object tracking api', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: body
    }).then((response) => response.json())
      .then((json) => {
        return json.data;
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ objectCount: response, showResult: true });
  }

  pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);

        // Upload image
        this.uploadImage(image.path);

        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null
        });

      })
      .catch((e) => alert(e));
  }

  renderImage = (image) => {
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={image}
      />
    );
  }

  renderResult = () => {
    return (
      <Image source={{ uri: 'object tracking api/output.png' + '?' + new Date() }} style={{ width: 300, height: 300 }} />
    );
  }

  renderAsset = (image) => {
    return this.renderResult();
  }

  render() {
    const { objectCount, image } = this.state
    return (
      <View style={styles.container} >

        <ScrollView style={styles.scrollView}>
          {image ? this.renderAsset(image) : null}
        </ScrollView>

        <Text style={styles.number}>
          Founded Object Count : {objectCount}
        </Text>

        <TouchableOpacity
          onPress={() => this.pickSingleWithCamera(false)}
          style={styles.button}
        >
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.pickSingle(false)}
          style={styles.button}
        >
          <Text style={styles.text}>Galery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.cleanupSingleImage()}
          style={styles.button}
        >
          <Text style={styles.text}>Cleanup Single Image</Text>
        </TouchableOpacity>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#A9A9A9',
    borderWidth: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    marginHorizontal: 3,
    marginVertical: 3,
    alignContent: 'center',
    height: 150,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,

  },
  text: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  },
  number: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    borderColor: 'black',
    borderBottomWidth: 12,
    borderRadius: 50,
    borderStyle: 'dotted',
  }
});

export default App;