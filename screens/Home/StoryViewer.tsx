import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video'; // Make sure you have installed react-native-video

const StoryViewer = ({ route, navigation }) => {
  const { story } = route.params; 
  // "story" should include { id, videoUrl, label, etc. }

  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  // Called when the video finishes playing
  const handleVideoEnd = () => {
    // For a real “Stories” experience, you might jump to the next story automatically
    navigation.goBack(); // or move to the next story
  };

  // Called if there's an error in the video
  const handleVideoError = (error) => {
    console.log('Video Error:', error);
  };

  return (
    <View style={styles.container}>
      {/* Video player */}
      <Video
        source={{ uri: story.videoUrl }} 
        style={styles.video}
        resizeMode="cover"
        paused={paused}
        onEnd={handleVideoEnd}
        onError={handleVideoError}
      />

      {/* Like button */}
      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Text style={styles.likeButtonText}>
          {liked ? '♥ Liked' : '♡ Like'}
        </Text>
      </TouchableOpacity>

      {/* Pause/Play toggle (optional) */}
      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => setPaused((prev) => !prev)}
      >
        <Text style={styles.pauseButtonText}>{paused ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>

      {/* Close the story */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryViewer;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
    position: 'absolute',
  },
  likeButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  likeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  pauseButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  pauseButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    lineHeight: 24,
  },
});

