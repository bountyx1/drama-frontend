import React,{Component} from 'react'
import { View,StyleSheet,StatusBar,TouchableOpacity} from 'react-native';
import {  IconButton,Text ,Portal} from 'react-native-paper';
import Video from 'react-native-video'
import * as ScreenOrientation from 'expo-screen-orientation';
import Slider from '@react-native-community/slider';
import colors from '../../styles/colors'
import {socket} from '../../api/explore'
import {VideoLoading} from '../Loading'
import Container from '../Container'

const Msg = msg => socket.emit("player",msg)

const Btn = ({icon,onPress}) => (
    <IconButton  
    color="white" 
    onPress={onPress}
    size={40} 
    icon={icon} 
    /> 
)

export const ControlBtns = ({isPlaying,pause,resume,forward,backward,fullscreen,show}) => {
    return(
    <Container show={show}>   
        <View style={styles.btns}>
            <Btn icon="skip-backward" onPress={backward} />
            <Btn icon={ isPlaying ?  "play-circle" : "pause-circle"  } onPress={ isPlaying ? resume :  pause}  />
            <Btn icon="skip-forward"  onPress={forward} />
            <Btn  onPress={fullscreen} icon="fullscreen" />
        </View>
    </Container>
    )
}

export const  PlayerSlider = ({currentTime,duration,pause,positionChange , show}) => {
    
    const getCurrentPosition = (currentTime) => {
        const result = new Date(currentTime * 1000).toISOString().substr(11, 8);
        return result
    }

    return(
        <Container show={show}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text>
                    {(getCurrentPosition(currentTime))}
                </Text>
                <Text>
                    {(getCurrentPosition(duration))}
                </Text>
            </View>
            <Slider
            style={{width: "100%"}}
            step={1}
            value={currentTime || 0}
            onSlidingStart={()=>pause()}
            onSlidingComplete={(value) => positionChange(value) }
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.darkRed}
            thumbTintColor={colors.darkRed}
            maximumTrackTintColor={colors.medium}
            />
        </Container>
    )
}

class VideoPlayer extends Component {
    videoRef = undefined
    
    constructor(props){
        super(props)

        this.state = {
        uri:props.videourl,
        auth: {"Cookie":props.header},
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'cover',
        duration: 0.0,
        currentTime: 0.0,
        paused: props.paused || true,
        height:"30%",
        position:0,
        showControl: props.showControl || false,
        isVideoLoading: true
        }

    

        this._handlePause = this._handlePause.bind(this)
        this._handleResume = this._handleResume.bind(this)
        this._handleFullScreen = this._handleFullScreen.bind(this)
        this._handleForward = this._handleForward.bind(this)
        this._handleBackward = this._handleBackward.bind(this)
        this._handlePosition = this._handlePosition.bind(this)
    }

    _handleVideoRef = ref => {
        this.videoRef = ref
    }

    _handlePause = () => {
        this.setState({paused:true},()=>Msg({paused:true}))
    }

    _handleResume = () => {
        this.setState({paused:false},()=>Msg({paused:false}))
    }

    _handleFullScreen = () => {
        if(this.props.landascape){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
        this.setState({height:"100%"})
        this.props.onChange()
        }
        else{
            ScreenOrientation.unlockAsync()
            this.setState({height:"30%"})
            this.props.onChange()
        }
    }

    _handleForward = () => {
        let position = this.state.currentTime + 20
        this._handlePosition(position)
    }

    _handleBackward = () => {
        let position = this.state.currentTime - 20
        this._handlePosition(position)
    }

    _handleProgress = ({currentTime: time}) => {
        this.setState({currentTime:time})
    }

    _handlePosition = (position) => {
        this.setState({currentTime:position},()=>Msg({currentTime:position}))
        this.setState({position:position},()=>Msg({position:position}))
    }


    _handleLoad = (event) => {
        this.setState({duration:event.duration})
        this.setState({isVideoLoading:false})
    }

    _handleError = () => {
        console.log("Video Load Error")
    }

    _handleHideControl = () => {
        this.setState({showControl:!this.state.showControl})
    }

    componentDidMount(){
        this._handleFullScreen()
        StatusBar.setHidden(true);
        socket.on('player', (msg)=>this.setState(msg));
    }

    componentWillUnmount() {
        StatusBar.setHidden(false);
        ScreenOrientation.unlockAsync()

   }

render() {
    return (
        <>
            <Video
            source={{ uri: this.state.uri ,headers : this.state.auth }}
            style={{height:this.state.height}}
            resizeMode={this.state.resizeMode}          
            paused={this.state.paused}
            minLoadRetryCount={5}
            onError={this._handleError}
            rate={this.state.rate}
            muted={this.state.muted}
            ref={this._handleVideoRef}
            onLoad={this._handleLoad}
            seek={this.state.position}
            onProgress={this._handleProgress}
            onSeek={({currentTime})=> this.setState({currentTime})}
            onTouchStart={()=> this._handleHideControl() }
            />

        <Portal>
        <View  style={[styles.controlContainer,{bottom:this.props.landascape ? "70%" : 80}]}>
            <VideoLoading  isLoading={this.state.isVideoLoading}/>
            <ControlBtns
            isPlaying={this.state.paused}
            pause={this._handlePause} 
            resume={this._handleResume} 
            forward={this._handleForward}
            backward={this._handleBackward}
            fullscreen={this._handleFullScreen}
            show={this.state.showControl}
            />
            <PlayerSlider
            duration={this.state.duration}
            currentTime={this.state.currentTime}
            pause={this._handlePause}
            positionChange={this._handlePosition}
            show={this.state.showControl}
            />
        </View>
        </Portal>
        </>
    )}
}

export default VideoPlayer



const styles = StyleSheet.create({
   controlContainer : {
       position:"absolute",
       width:"100%"
   },
   btns :{
       flexDirection:"row",
       alignSelf:"center" 
   },
   
})
