import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStoryLike, postComment, fetchComments } from '../redux/slices/storiesSlice';
import Colors from '../components/Colors';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

const StoryViewer = ({ route, navigation }) => {
  const { story, index, stories } = route.params;
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const timerRef = useRef(null);

  // Get the latest story details from Redux if available, or use the passed story
  const storiesState = useSelector(state => state.stories);
  const currentStory = storiesState.stories.find(s => s.id === story.id) || story;
  const comments = storiesState.commentsByStory[story.id] || [];

  // Auto-advance to next story after 20 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goToNextStory();
    }, 20000);

    // Cleanup timer on unmount or when story changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, story]);

  // Fetch comments if needed when comments panel is shown
  useEffect(() => {
    if (showComments && comments.length === 0) {
      dispatch(fetchComments(story.id));
    }
  }, [showComments]);

  const goToNextStory = () => {
    if (index < stories.length - 1) {
      navigation.replace('StoryViewer', {
        story: stories[index + 1],
        index: index + 1,
        stories,
      });
    } else {
      // If no more stories, navigate back or close the viewer
      navigation.goBack();
    }
  };

  const handleNextPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    goToNextStory();
  };

  const handleToggleLike = () => {
    dispatch(toggleStoryLike(story.id));
  };

  const handlePostComment = () => {
    // Replace with your actual user id
    const userId = 11; 
    if (commentText.trim()) {
      dispatch(postComment({ storyId: story.id, userId, text: commentText }));
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: currentStory.image_url || currentStory.image }}
        style={styles.storyImage}
      />
      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <Text style={styles.username}>{currentStory.user.username}</Text>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleToggleLike} style={styles.iconButton}>
            <Image
              source={
                currentStory.is_liked
                  ? require('../../assets/images/heart_filled.png')
                  : require('../../assets/images/heart_outline.png')
              }
              style={styles.icon}
            />
            <Text style={styles.likeCount}>{currentStory.likes_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowComments(!showComments)}
            style={styles.iconButton}
          >
            <Image
              source={require('../../assets/images/comment.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Comments Panel */}
      {showComments && (
        <View style={styles.commentsContainer}>
          {storiesState.loading ? (
            <Loader />
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Text style={styles.commentUser}>{item.user.username}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              )}
            />
          )}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handlePostComment} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default StoryViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'space-between',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  likeCount: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  nextButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentsContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    maxHeight: height * 0.4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentUser: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 6,
  },
  commentText: {
    color: '#fff',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 8,
  },
  commentInput: {
    flex: 1,
    color: '#fff',
    padding: 8,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonText: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});
