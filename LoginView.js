/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var PickImageView = require("./PickImageView.js");
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Image
    } = React;

var LoginView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}></View>
                <View style={styles.content}>
                    <Text style={styles.title}>登录/注册</Text>
                    <View style={styles.form}>
                        <TextInput placeholder="输入注册邮箱" style={styles.input} onChangeText={(text) => {
                            this.checkEmail(text);
                        }}>

                        </TextInput>
                        <TextInput placeholder="输入密码" password={true} style={styles.input}>

                        </TextInput>
                        {this.state.isLogin?null:
                            <View>
                                <TextInput placeholder="输入昵称"  style={styles.input}>

                                </TextInput>
                                <Text style={{marginLeft:40,marginRight:40,color:"#aaa",textAlign:"center"}}>然后上传个掉渣天的头像吧</Text>
                                <TouchableHighlight underlayColor="#fff" onPress={this._pickImage} style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginLeft:40,marginRight:40}}>
                                    <Image source={{uri:this.state.head_pic}} style={styles.head_pic}></Image>
                                </TouchableHighlight>
                            </View>
                        }
                        <TouchableHighlight onPress={this._submit} underlayColor="#eee" style={styles.submit}>
                            <View style={styles.button}><Text style={styles.buttonText}>{this.state.isLogin?"登录":"注册"}</Text></View>
                        </TouchableHighlight>

                    </View>
                </View>
                <TouchableHighlight onPress={this._back} underlayColor="#eee" style={styles.close}>
                    <Icon name="ios-close-empty" size={40} color="#999" style={{width:30,height:30,marginLeft:7}}/>
                </TouchableHighlight>
            </View>
        );
    },
    /**
     * 输入email字段的时候判断此email是否是注册过的,没注册的把界面变成注册界面
     * @param email
     */
    checkEmail:function(email){
        if(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(email)){
            fetch("http://www.html-js.com/user/check.json?email="+email)
                .then((response) => response.json())
                .catch((error) => {

                })
                .then((responseData) => {
                    if(responseData.success){
                        this.setState({
                            isLogin:false
                        })
                    }else{
                        this.setState({
                            isLogin:true
                        })
                    }
                })
                .done();
        }

    },
    getInitialState: function() {
        AsyncStorage.getItem("login_user_pick_image",function(url){
            if(url)
            this.state.head_pic = url;
        })
        return {
            isLogin:false,
            head_pic:"http://htmljs.b0.upaiyun.com/uploads/1438098680186-1bb87d41d15fe27b500a4bfcde01bb0e.png"
        };
    },
    _back:function(){
        this.props.navigator.pop();
    },
    _pickImage:function(){
      this.props.navigator.push({
          component:PickImageView
      })
    },
    /**
     * 提交登录/注册
     * @private
     */
    _submit:function(){

    },
    /**
     * 获取当前登录用户token,如果没登陆,返回空
     */
    getToken:function(cb){
        AsyncStorage.getItem("token",function(err,token){
            cb(err,token);
        })
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
        marginTop:70,
        marginBottom:70,
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
        marginBottom:20
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
    head_pic:{
        width:50,
        height:50,
        marginTop:20,
        opacity:0.6
    }
});

AppRegistry.registerComponent('LoginView', () => LoginView);

module.exports = LoginView;