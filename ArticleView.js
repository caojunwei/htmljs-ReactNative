/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var ArticleTalk = require("./ArticleTalk.js")
var MessageTip = require("./MessageTip.js")
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS,
    WebView,
    TouchableHighlight,
    Image,
    Animated
    } = React;

var ArticleView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}></View>

            <WebView
                     automaticallyAdjustContentInsets={false}
                     style={styles.webView}
                     url={this.state.url}
                     javaScriptEnabledAndroid={true}
                     startInLoadingState={true}
                ></WebView>
                <View style={styles.footer}>
                    <TouchableHighlight onPress={this._back} underlayColor="#aaa" style={styles.buttonItem}>
                        <Icon name="ios-arrow-left" size={30} color="#aaa" style={styles.button}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._zan} underlayColor="#aaa" style={styles.buttonItem}>
                        <View style={styles.buttonContainer}>
                        <Icon name="ios-heart-outline" size={30} color="#aaa" style={styles.button}/>
                            <Text style={{fontSize:13,color:"#666",marginLeft:4,lineHeight:28}}>{this.props.article.zan_count}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._toTalk} underlayColor="#aaa" style={styles.buttonItem}>
                        <View style={styles.buttonContainer}>
                        <Icon name="ios-chatboxes-outline" size={30} color="#aaa" style={styles.button}/>
                        <Text style={{fontSize:13,color:"#666",marginLeft:4,lineHeight:28}}>{this.props.article.comment_count}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                    <MessageTip ref="messageTip"/>
                </View>
        );
    },

    getInitialState: function() {
        return {
            url:"http://www.html-js.com/article/"+this.props.article.id+"?is_clear=1",
            tipText:"棒棒的",
            tipOpacity:new Animated.Value(0)
        };
    },

    componentDidMount: function() {
        this.setState({
            url:"http://www.html-js.com/article/"+this.props.article.id+"?is_clear=1"
        })
    },
    _back:function(){
        this.props.navigator.pop();
    },
    _zan:function(){
        this.refs.messageTip.show("点赞成功")
    },
    _toTalk:function(){
        this.props.navigator.push({
            component: ArticleTalk,
            passProps: {article:this.props.article},
        })
    }

});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    statusbar:{
        backgroundColor:"#46afe4",
        height:20
    },
    header:{
        height:44,
        backgroundColor:"#46afe4",
        alignItems:"center",

    },
    footer:{
        height:44,
        backgroundColor:"#fff",
        flexDirection:"row",

        borderWidth:1,
        borderColor:"#fff",
        borderTopColor:"#ddd",
        justifyContent:"space-around",
    },
    back:{
        width:30,
        height:30,
    },
    button:{
        width:30,
        height:30,
        marginTop:5
    },
    buttonItem{
        height:30,
        flex:1
    },
    title:{
        fontSize:16,
        lineHeight:30,
        color:"#fff"
    },
    webView: {
        flex: 1,
        backgroundColor: '#fff',

    },
    buttonContainer:{
        flexDirection:"row"
    }
});

AppRegistry.registerComponent('ArticleView', () => ArticleView);

module.exports = ArticleView;