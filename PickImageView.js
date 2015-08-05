/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var {
    AppRegistry,
    StyleSheet,
    CameraRoll,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Text,
    AlertIOS
    } = React;
var CameraRollView = require("./camera/CameraRollView.js")
var PickImageView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}></View>
                <View style={styles.content}>
                    <CameraRollView
                        ref="cameraroll"
                        batchSize={20}
                        groupTypes="SavedPhotos"
                        imagesPerRow={4}
                        renderImage={this._renderImage}
                        style={{}}
                        />
                </View>
                <TouchableHighlight onPress={this._back} underlayColor="#eee" style={styles.close}>
                    <Icon name="ios-close-empty" size={40} color="#999" style={{width:30,height:30,marginLeft:7}}/>
                </TouchableHighlight>
            </View>
        );
    },
    _renderImage(asset) {
        var imageSize = 75;
        var imageStyle = [{margin:4}, {width: imageSize, height: imageSize}];
        asset.node.image.assetThumbnail = true;
        return (
            <TouchableHighlight  onPress={this._pick(asset.node.image)} underlayColor="#eee">
                    <Image
                        source={asset.node.image}
                        style={{width:80,height:80,margin:4,alignSelf:"flex-start",flex:1}}
                        />
            </TouchableHighlight>
        );
    },
    getInitialState: function() {
        return {
            isLogin:false
        };
    },
    _pick:function(image){
        this.props.navigator.pop();
        console.log(image)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://www.html-js.com/upload');
        xhr.onload = () => {
            if (xhr.status !== 200) {
                AlertIOS.alert(
                    'Upload failed',
                    'Expected HTTP 200 OK response, got ' + xhr.status
                );
                return;
            }
            if (!xhr.responseText) {
                AlertIOS.alert(
                    'Upload failed',
                    'No response payload.'
                );
                return;
            }
            var data = JSON.parse(xhr.responseText);
            console.log(data)

        };
        var formdata = new FormData();
        formdata.append('pic',image);
        xhr.send(formdata);
    },


});

var styles = StyleSheet.create({
    tip:{
        position:"absolute",
        left:0,
        top:0,
        bottom:0,
        right:0,
        backgroundColor:"rgba(0,0,0,0)",
        alignItems:"center",

    },
    tipText:{
        backgroundColor:"#333",
        color:"#fff",
        padding:5,
        paddingLeft:8,
        paddingRight:8,
        borderRadius:5,
        marginTop:200,
        fontSize:12
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    statusbar:{
        backgroundColor:"#46afe4",
        height:20
    },
    content:{
        flex:1,
        marginTop:30,
        flexDirection:"row",
    },
    close:{
        position:"absolute",
        right:10,
        top:30,
        height:30,
        width:30,
    },
});

AppRegistry.registerComponent('PickImageView', () => PickImageView);

module.exports = PickImageView;