/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
    } = React;

var MessageTip = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}></View>
                <View style={styles.content}>
                    <Text style={styles.title}>登录/注册</Text>
                    <View style={styles.form}>
                        <TextInput placeholder="输入注册邮箱" style={styles.input}>

                        </TextInput>
                        <TextInput placeholder="输入密码" password={true} style={styles.input}>

                        </TextInput>
                        <TouchableHighlight onPress={this._submit} underlayColor="#eee" style={styles.submit}>
                            <View style={styles.button}><Text style={styles.buttonText}>登录或注册</Text></View>
                        </TouchableHighlight>
                    </View>
                </View>
                <TouchableHighlight onPress={this._back} underlayColor="#eee" style={styles.close}>
                    <Icon name="ios-close-empty" size={40} color="#999" style={{width:30,height:30,marginLeft:7}}/>
                </TouchableHighlight>
            </View>
        );
    },

    getInitialState: function() {
        return {
        };
    },
    _back:function(){
        this.props.navigator.pop();
    },
    _submit:function(){

    },
    /**
     * 获取当前登录用户,如果没登陆,返回空
     */
    getCurrentUser:function(){

    }

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
    title:{
        fontSize:26,
        color:"#444",
        flex:1,
        alignItems:"center",
        textAlign:"center",
        marginTop:60,
        marginBottom:60,
    },
    input:{
      marginLeft:40,
        marginRight:40,
        height:45,
        borderWidth:1,
        borderColor:"#ddd",
        borderRadius:5,
        paddingLeft:10,
        fontSize:18,
        color:"#666",
        marginBottom:30
    },
    submit:{
        marginLeft:40,
        marginRight:40,
        height:45,


        borderRadius:5,

        marginTop:20,
        overflow:"hidden",
    },
    button:{
        height:45,
        backgroundColor:"#46afe4",
        borderColor:"#46afe4",
        borderWidth:1,
    },
    buttonText:{
        color:"#fff",
        textAlign:"center",
        backgroundColor:"#46afe4",
        fontSize:16,
        marginTop:13
    },
    close:{
        position:"absolute",
        right:10,
        top:30,
        height:30,
        width:30,
    },
});

AppRegistry.registerComponent('MessageTip', () => MessageTip);

module.exports = MessageTip;