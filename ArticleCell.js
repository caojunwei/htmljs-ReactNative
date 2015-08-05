/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var colors = ["#ef6f67","#46afe4","#81cc7a","#00cbbd"]
var random_color = function(){
  return colors[Math.floor(Math.random()*colors.length)]
}
var ArticleCell = React.createClass({


  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.row}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {this.props.article.title}
              </Text>
              <View style={styles.descContainer} >
                <Image
                    style={styles.icon}
                    source={{uri: this.props.article.user_headpic}}
                    />
                <Text style={styles.desc} numberOfLines={1}>
                  {this.props.article.user_nick}  {this.props.article.publish_time}
                  </Text>

              </View>

              {this.props.article.tags?
                  <View style={styles.tags} >
                    {this.props.article.tags.split(',').map(function(result) {
                      return <Text style={[styles.tag,{backgroundColor:random_color()}]}> {result}</Text>;
                    })}
                  </View>
              :null}
              <View style={styles.count_container}>
                <View style={styles.count_item}>
                  <Icon name="ios-heart-outline" size={20} color="#999" />
                  <Text style={{fontSize:12,color:"#999",marginLeft:4,lineHeight:15}}>{this.props.article.zan_count}</Text>
                </View>
                <TouchableHighlight onPress={this.props.showCommit} underlayColor="#fff">
                  <View style={styles.count_item}>

                    <Icon name="ios-chatboxes-outline" size={20} color="#999" />
                    <Text style={{fontSize:12,color:"#999",marginLeft:4,lineHeight:15}}>{this.props.article.comment_count}</Text>

                  </View>
                </TouchableHighlight>

              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingBottom:5
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    paddingTop:10,
    paddingLeft:5,
    paddingBottom:7,
    paddingRight:5
  },
  descContainer:{
    flex:1,
    flexDirection:"row",
    paddingTop:5,
    paddingLeft:5,
    paddingBottom:5,
  },
  desc:{
    fontSize: 12,
    fontWeight: '200',
    color:"#999999",
    marginLeft:5,

  },
  icon:{
    width:16,
    height:16,
    borderRadius:8,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  tags:{
    flex: 1,
    flexDirection:"row",
    paddingTop:5,
    paddingLeft:5,
    paddingBottom:0,
    flexWrap:'wrap',
  },
  tag:{
    fontSize: 11,
    color:"#fff",
    marginRight:7,
    marginBottom:5,
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:1,
    paddingRight:3,
    borderRadius:2,
    overflow:"hidden",
    opacity:0.7,
    backgroundColor:"#ff0000"
  },
  count_container:{
    position:"absolute",
    right:5,
    bottom:5,
    flexDirection:"row",
  },
  count_item:{
    height:20,
    marginLeft:15,
    flexDirection:"row",
  }
});

module.exports = ArticleCell;
