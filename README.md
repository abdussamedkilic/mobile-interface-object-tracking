# mobile-interface-object-tracking
it's 3rd project from Fall Term Yazlab Projects

### Project content : 
  - In this project, you can take a picture with the android application we wrote with react-native code or you can choose the picture from the gallery,
Performs object tracking with Darknet Yolov3 algorithm on our server in the backend of the captured or selected picture.
After the object tracking is done, the picture is returned as output.jpg and how many objects are in the picture on the screen.

### To Run Porject u should :
  - install node modules with "npm i"
  - we use react-native-image-crop-picker library to make dependencies
    - Fix the repositories under buid.gradle by following the methods on [the site](https://github.com/ivpusic/react-native-image-crop-picker) 
  - Project can run on android 9 and above devices
  - When you open the application for the first time, you will see 3 buttons and picture places, with the first button you will take a photo from the camera, with the second button from the gallery.
you select a photo, with the third button you clear the currently displayed photo
  - After taking or selecting any photo, the photo is sent to the server and the object tracked photo returns.
In addition, the total number of objects on the photo is written on the screen.
    - However, this code is only a mobile interface, there is no server part, you have to write the server part yourself.
    
