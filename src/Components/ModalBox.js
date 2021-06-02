import React, { useState,useEffect } from 'react'
import { View,StyleSheet } from 'react-native'
import { TouchableRipple,Modal, Portal, Text, Button, Title, Paragraph, Divider, IconButton } from 'react-native-paper';
import CardBox from './CardBox'
import { useNavigation } from '@react-navigation/native';
import IconBtn,{WatchList} from './Btns';


const ModalBox = ({item,children}) => {
    const {description,title,img,id} = item
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const navigation = useNavigation();
    const _goTo = () => {
        navigation.navigate('Drama',{
            id
        });
        hideModal()
      }
      return(
          <>
          <Portal>
              <Modal visible={visible} onDismiss={hideModal}   contentContainerStyle={styles.modalBox}>
                  <View style={styles.modalBoxContainer}>
                      <CardBox img={img}/>
                      <View style={styles.detailContainer}>
                          <Title style={{flex:1}}>{title}</Title>
                          <Paragraph numberOfLines={4}>{description}</Paragraph>
                      </View>
                  </View>
                  
                  <View style={styles.btnContainer}> 
                      <Button  color="white" style={{width:"55%"}}    icon="play" mode="contained" uppercase={false}>Play</Button>
                      <WatchList id={id} />
                      <IconBtn size={35} name="Preview" icon="play-outline" />
                  </View>

                  
                  <Divider />
                  <View style={styles.bottom}>
                  <Button
                  onPress={ () => _goTo() }
                  contentStyle={{justifyContent:"flex-start"}}
                  icon="information-outline" mode="text"
                  color="white"
                  uppercase={false}> 
                  Episodes & info 
                  </Button>
                  </View>
              </Modal>
          </Portal>
          <TouchableRipple
           onPress={showModal}
           rippleColor="rgba(0, 0, 0, .32)"
           >
               <View>
               {children}
               </View>
           </TouchableRipple>
           </>
      )
  }


  export default ModalBox

  const styles = StyleSheet.create({
    modalBox:{
        height:"37%",
        width:"100%",
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
        position:'absolute',
        bottom:0,
        backgroundColor:"#252525",
    },
    modalBoxContainer:{
        flex:1,
        flexDirection:"row",
        padding:8,
    },
    detailContainer:{
        flex:1,
        flexDirection:"column",
    },
    btnContainer:{
        flex:0.3,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:10
    },
    bottom:{
        padding:2
    }
  });