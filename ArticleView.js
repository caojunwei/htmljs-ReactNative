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
    ActivityIndicatorIOS,
    WebView,
    TouchableHighlight,
    Image
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
                >dddd</WebView>
                <View style={styles.footer}>
                    <TouchableHighlight onPress={this._back} underlayColor="#aaa">
                        <Image
                         style={styles.button}
                         source={require('image!back')}
                         resizeMode="cover"
                         />
                    </TouchableHighlight>
                </View>
                </View>
        );
    },

    getInitialState: function() {
        return {
            url:"http://www.html-js.com/article/"+this.props.article.id
        };
    },

    componentDidMount: function() {
        this.setStates({
            url:"http://www.html-js.com/article/"+this.props.article.id
        })
    },
    _back:function(){
        this.props.navigator.pop();
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
        //alignItems:"center",
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
    title:{
        fontSize:16,
        lineHeight:30,
        color:"#fff"
    },
    webView: {
        flex: 1,
        backgroundColor: '#fff',

    },

});

AppRegistry.registerComponent('ArticleView', () => ArticleView);

module.exports = ArticleView;