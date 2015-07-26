/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated
    } = React;

var MessageTip = React.createClass({
    render: function() {
        return (
            <Animated.View style={[styles.tip,{opacity:this.state.tipOpacity}]}><Text style={styles.tipText}>{this.state.tipText}</Text></Animated.View>
        );
    },

    getInitialState: function() {
        return {
            tipText:"棒棒的",
            tipOpacity:new Animated.Value(0)
        };
    },
    show:function(str){
        this._showTip(str)
    },
    _showTip:function(str){
        this.setState({
            tipText:str
        })
        Animated.spring(this.state.tipOpacity, {
            toValue: 1,
        }).start();
        setTimeout(()=>{
            this._hideTip()
        },1000)
    },
    _hideTip:function(){
        Animated.spring(this.state.tipOpacity, {
            toValue: 0,
        }).start();
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
    }
});

AppRegistry.registerComponent('MessageTip', () => MessageTip);

module.exports = MessageTip;