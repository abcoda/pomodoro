import React from 'react'
import {Button,View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  clock:{
    fontSize:60,
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.onFinish = props.onFinish
    this.onReset = props.onReset
    this.onToggle = props.onToggle
    this.loop = props.loop
    this.state = {
      running: props.running,
      time: props.time
    }
    if(this.state.running) {
      this.toggleTimer()
      this.interval = setInterval(this.tick,1000)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.running !== prevProps.running) {
      this.setState({
        running: this.props.running
      },() => {
        if (!this.state.running) {
          clearInterval(this.interval)
        }
      })
    }
    if (this.props.time !== prevProps.time) {
      this.setState({
        time:this.props.time
      })
    }
  }

  tick = () => {
    if (this.state.running) {
      this.setState(prevState => ({
        time: prevState.time - 1
      }),()=>{
        if (this.state.time <= 0 && this.state.running) {
          this.onFinish()
          if (this.loop){
            this.setState({
              time:this.props.time
            })
          }
        }
      })
    }
  }

  toggleTimer = () => {
    if (!(this.state.running)) {
      this.interval = setInterval(this.tick,1000)
    }
    else {
      clearInterval(this.interval)
    }
    if (this.onToggle) {
      this.onToggle()
    }
    else {
      this.setState(prevState => ({
        running: !(prevState.running),
      }))
    }


  }

  resetTimer = () => {
    if (this.state.running){
      this.toggleTimer()
    }
    if(this.onReset) {
      this.onReset(() => {this.setState({
        time:this.props.time
      })})
    }
    else {
      this.setState({
        time:this.props.time
      })
    }
  }

  render() {
    const minutes = Math.floor(this.state.time/60)
    const seconds = this.state.time%60
    return (
      <View style={styles.container}>
        <Text style={styles.clock}>
          {minutes +
          ':' +
          (seconds>9 ? '' + seconds : '0' + seconds)}
        </Text>
        <View style={{flexDirection:'row'}}>
          <Button
            color={this.state.running ? '#FF6666' : '#00cc66'}
            onPress={this.toggleTimer}
            title={(this.state.running ? "Stop" : "Start")}
          />
          <Text style={{width:5}}/>
          <Button title="Reset" onPress={this.resetTimer}/>
        </View>
        <Text>{this.state.running}</Text>
      </View>
    );
  }
}
