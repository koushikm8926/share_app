import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Icon from '../components/Global/Icon';
import LinearGradient from 'react-native-linear-gradient';
import {sendStyles} from '../styles/sendStyles';

const ReceivedFileScreen: FC = () => {
  const [receivedFiles, setReceivedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFilesFromDirectory = async () => {
    setIsLoading(true);
    const PlatformPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/`
        : `${RNFS.DocumentDirectoryPath}`;

    try {
      const exists = await RNFS.exists(PlatformPath);
      if (!exists) {
        setReceivedFiles([]);
        setIsLoading(false);
        return;
      }

      const files = await RNFS.readDir(PlatformPath);

      const formattedFiles = files.map(file => ({
        id: file.name,
        name: file.name,
        size: file.size,
        uri: file.path,
        mimeType: file.name.split('.').pop() || 'unknown',
      }));

      setReceivedFiles(formattedFiles);
    } catch (error) {
      console.error('error fatching files', error);
      setReceivedFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilesFromDirectory();
  }, []);

  const renderThumbnail = (mimeType: string) => {
    switch (mimeType) {
      case 'mp3':
        return (
          <Icon
            name="musical-notes"
            size={16}
            color="blue"
            iconFamily="Ioncons"
          />
        );
      case 'mp4':
        return (
          <Icon name="videocam" size={16} color="green" iconFamily="Ioncons" />
        );
      case 'jpg':
        return (
          <Icon name="image" size={16} color="orange" iconFamily="Ioncons" />
        );
      case 'pdf':
        return (
          <Icon name="document" size={16} color="red" iconFamily="Ioncons" />
        );
      default:
        return (
          <Icon name="folder" size={16} color="gray" iconFamily="Ioncons" />
        );
    }
  };

  return (
    <LinearGradient
      colors={['#FFFF', '#CDDAEE', '#8DBAFF']}
      style={sendStyles.container}
      start={{x:0,y:1}} 
      end={{x:0,y:0}}>
      <SafeAreaView />
      <View></View>
    </LinearGradient>
  );
};

export default ReceivedFileScreen;

const styles = StyleSheet.create({});
