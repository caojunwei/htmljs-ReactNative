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
    Text
    } = React;
var CameraRollView = require("./CameraRollView.js")
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
        return (
                    <Image
                        source={asset.node.image}
                        style={{width:80,height:80,margin:4,alignSelf:"flex-start",flex:1}}
                        />
        );
    },
    getInitialState: function() {
        return {
            isLogin:false
        };
    },
    _back:function(){
        this.props.navigator.pop();
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
        flexDirection:"row",
        backgroundColor:"#ddd",
    }
});

AppRegistry.registerComponent('PickImageView', () => PickImageView);

module.exports = PickImageView;