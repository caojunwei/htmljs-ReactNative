/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ArticleList = require("./ArticleList.js");
var TopicList = require("./TopicList.js");
var Icon = require('react-native-vector-icons/Ionicons');

var {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    StatusBarIOS,
    Navigator
    } = React;

var MainTabBar = React.createClass({
    getInitialState: function() {
        return {
            selectedTab:"tab1",
            hideTab:false
        };
    },
    render:function(){
        StatusBarIOS.setStyle("light-content", true)
        return (
            <TabBarIOS
                tintColor="#46afe4"
                barTintColor="#fff">
                <Icon.TabBarItem
                    title="文章"
                    iconName="android-list"
                    selected={this.state.selectedTab === 'tab1'}
                    onPress={() => {
                    this.setState({
                        selectedTab: 'tab1',
                    });
                }}>

                    <ArticleList navigator={this.props.navigator}/>


                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="聊天"
                    iconName="chatboxes"
                    selected={this.state.selectedTab === 'tab2'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'tab2',
                        });
                      }}>

                    <TopicList navigator={this.props.navigator}/>


                </Icon.TabBarItem>


            </TabBarIOS>
        );
    },
    _renderTab1:function(){
        return <ArticleList/>
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('MainTabBar', () => MainTabBar);
module.exports = MainTabBar;
