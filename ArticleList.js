/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var ArticleCell = require("./ArticleCell.js")
var ArticleView = require("./ArticleView.js")
var ArticleTalk = require("./ArticleTalk.js")
var LoginView = require("./LoginView.js")
var MessageTip = require("./MessageTip.js")
var RefreshableListView = require('react-native-refreshable-listview')
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicatorIOS,
    ScrollView
    } = React;

var ArticleList = React.createClass({
    render: function() {
        return (

        <View style={styles.container}>
            <View style={styles.statusbar}></View>
            <View style={styles.topbar}>
                <Text style={styles.toptitle}>码上读</Text>
            </View>
            <View style={styles.tags_container}>
                <ScrollView style={styles.nav_tags} horizontal={true} directionalLockEnabled={true} automaticallyAdjustContentInsets={false}
                            contentContainerStyle={styles.contentContainer} alwaysBounceHorizontal={true} alwaysBounceVertical={false}
                            showsHorizontalScrollIndicator={false}>
                    {this.state.tags.map(function(tag){
                        return <Text style={styles.nav_tag}>{tag.name}</Text>
                    })}
                </ScrollView>
            </View>
            <RefreshableListView
                style = {styles.list}
                loadData={this.reloadArticles}
                refreshDescription="玩命加载中"
                minDisplayTime={2000}
                minPulldownDistance={20}
                ref="listview"
                renderSeparator={this.renderSeparator}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={true}
                onEndReachedThreshold={20}
                />
            {this.state.isLoading?<View style={styles.loadingContainer}>
            <ActivityIndicatorIOS
                style={styles.centerLoading}
                size="large"
                />
                </View>:null}
        </View>
        );
    },
    renderRow: function(
        article: Object
    ) {
        return (
            <ArticleCell
                article={article} onSelect={() => this.selectArticle(article)}
                showCommit={() => this.showCommit(article)}
                />
        );
    },
    renderSeparator: function() {
        var style = styles.rowSeparator;
        style = [style, styles.rowSeparatorHide];
        return (
            <View  style={style}/>
        );
    },
    getInitialState: function() {
        return {
            isLoading: false,
            isLoadingTail: false,
            nowPage:1,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1.id !== row2.id,
            }),
            tags:[],
            filter: '',
            queryNumber: 0,
            test:true,
            articles:[]
        };
    },

    componentDidMount: function() {
        this.queryArticles('');
        //setTimeout(()=>{
        //    this.showLogin();
        //},300)

    },
    queryArticles: function(){
        this.setState({
            isLoading: true,
        });
        fetch("http://www.html-js.com/article.json?page="+this.state.nowPage)
            .then((response) => response.json())
            .catch((error) => {

            })
            .then((responseData) => {
                var articles = this.state.articles.concat(responseData.data.articles)
                this.setState({
                    isLoading: false,
                    articles:articles
                })
                this.setState({
                    dataSource: this.getDataSource()
                });
            })
            .done();

        fetch("http://www.html-js.com/tag.json")
            .then((response) => response.json())
            .catch((error) => {

            })
            .then((responseData) => {
                console.log(responseData)
                var arr = responseData.splice(0,10)
                this.setState({
                    tags: arr,
                })
            })
            .done();
    },
    getDataSource: function(): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(this.state.articles);
    },
    reloadArticles:function(){
        console.log("reloadArticles")
        this.state.nowPage = 1;
        this.queryArticles()
    },
    onEndReached:function(){
        console.log("---------------end----------------")
        if(this.state.isLoading){
            return;
        }
        else{
            console.log(this.state.nowPage)
            this.state.nowPage++;
            console.log(this.state.nowPage)
            this.queryArticles()
        }
    },
    selectArticle:function(article){
        this.props.navigator.push({
          component: ArticleView,
          passProps: {article},
        });
    },
    showCommit:function(article){
        this.props.navigator.push({
            component: ArticleTalk,
            passProps: {article},
        })
    },
    showLogin:function(){
        this.props.navigator.push({
            component: LoginView,
            passProps: {},
        })
    }
});

var styles = StyleSheet.create({
    topbar:{
        backgroundColor:"#46afe4",
        height:50
    },
    toptitle:{
        fontSize:20,
        color:"#fff",
        height:50,
        top:14,
        textAlign: 'center',
    },
    statusbar:{
        backgroundColor:"#46afe4",
        height:20
    },
    tags_container:{
        height:35,
        borderColor:"#fff",
        borderBottomColor:"#eee",
        borderWidth:1,
    },
    nav_tags:{
        margin:0,
        padding:0,
    },
    nav_tag:{
        paddingLeft:13,
        paddingRight:13,
        height:30,
        color:"#444",
        fontSize:14,
        lineHeight:25,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    list:{
        flex: 1,
        marginBottom:50
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rowSeparator: {
        backgroundColor: '#efefef',
        height: 1,
        marginLeft: 4,
    },
    centerLoading: {
        width:100,
        height:100,
        //backgroundColor:"#333",
        borderRadius:15,
    },
    loadingContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        left:0,
        top:0,
        right:0,
        bottom:0,
        backgroundColor:"rgba(255, 255, 255, 0)"
    }
});

AppRegistry.registerComponent('ArticleList', () => ArticleList);

module.exports = ArticleList;