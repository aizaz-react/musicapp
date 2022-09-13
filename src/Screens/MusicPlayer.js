import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {songs} from '../Assets/Data';
import Slider from '@react-native-community/slider';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });
  }, [scrollX]);

  const renderSongs = ({item, index}) => (
    <Animated.View style={styles.mainImageWrapper}>
      <View key={index} style={[styles.imageWrapper, styles.elevation]}>
        <Image
          style={styles.image}
          source={{
            uri: item.artwork,
          }}
        />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          renderItem={renderSongs}
          data={songs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <View>
          <Text style={[styles.songsTitle, styles.songContent]}>
            {songs[songIndex]?.title}
          </Text>
          <Text style={[styles.songsArtist, styles.songContent]}>
            {songs[songIndex]?.artist}
          </Text>
        </View>
        <View>
          <Slider
            style={styles.slider}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#ffd369"
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="#fff"
          />
          <View style={styles.sliderLabelDuration}>
            <Text style={styles.sliderLabelText}>00:00</Text>
            <Text style={styles.sliderLabelText}>00:00</Text>
          </View>
        </View>
        <View style={styles.musicControl}>
          <TouchableOpacity>
            <Icon name="play-skip-back-outline" size={35} color="#ffde69" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-pause-circle" size={70} color="#ffde69" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play-skip-forward-outline" size={35} color="#ffde69" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Icon name="heart-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="repeat" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopColor: '#393E46',
    borderTopWidth: 1,
  },
  mainImageWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageWrapper: {
    flex: 1,
    width: width - 80,
    marginVertical: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  elevation: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  songContent: {
    textAlign: 'center',
    color: '#eee',
  },
  songsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  songsArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  slider: {
    width: width - 50,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  sliderLabelDuration: {
    width: width - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  sliderLabelText: {
    color: '#fff',
    fontWeight: '500',
  },
  musicControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },
});
