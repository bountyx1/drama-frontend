import React from 'react'
import { Share, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const ShareExample = ({message}) => {
    const onShare = async () => {
      try {
        const result = await Share.share({message});
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    return (
      <View style={{ marginTop: 50 }}>
        <IconButton icon="share-variant" onPress={onShare} size={36} color="white"/>
      </View>
    );
  };
  
  export default ShareExample;