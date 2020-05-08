import React from 'react';
import {KeyboardAvoidingView, Dimensions, Alert, TextInput, StyleSheet, Text, View, ScrollView, } from 'react-native';
import Button from 'react-native-button'

import Constants from 'expo-constants'
import Timer from './Timer'
import TimerForm from './TimerForm'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      running: false,
      current:0,
      timers: [
        {
          minutes:25,
          seconds:0,
          label:"Work",
          id:0,
          color:'#FF9999'
        },
        {
          minutes:5,
          seconds:0,
          label:"Break",
          id:1,
          color:'#99FFCC'
        },
      ]
    }
    this.count = this.state.timers.length - 1
  }

  onFinish = () => {
    this.setState({
      current:(this.state.current == this.state.timers.length - 1 ? 0 : this.state.current + 1)
    })
  }

  onLabelChange = (label,id) => {
    this.setState(prevState => ({
      timers:prevState.timers.map((timer) => {
        if(timer.id === id) {
          timer.label = label
        }
        return timer
      })
    }))
  }

  onTimeChange = (minutes,seconds,id) => {
    this.setState(prevState => ({
      timers:prevState.timers.map((timer) => {
        if(timer.id === id) {
          timer.minutes = minutes
          timer.seconds = seconds
        }
        return timer
      })
    }))
  }

  onColorChange = (color,id) => {
    this.setState(prevState => ({
      timers:prevState.timers.map((timer) => {
        if(timer.id === id) {
          timer.color = color
        }
        return timer
      })
    }))
  }

  onReset = (callback) => {
    this.setState({
      current:0
    },callback)
  }

  onToggle = () => {
    this.setState(prevState => ({
      running:!prevState.running
    }))
  }

  addTimer = () => {
    this.setState(prevState => ({
      timers: [...prevState.timers,{
        minutes:0,
        seconds:0,
        label:"New Timer",
        id:this.count + 1,
        color:'#CCCCCC',
      }],
      running: false,
      current: 0
    }), ()=>this.count++)
  }

  onDelete = (id) => {
    this.setState(prevState => ({
      timers: prevState.timers.filter(function(timer) {return timer.id !== id}),
      current:0

    }))
  }

  render() {
    const times = this.state.timers.map(timer => (timer.minutes*60 + timer.seconds*1))
    return (
      <View style={styles.window}>
        <View style={[styles.topBar,{backgroundColor:(typeof(this.state.timers[this.state.current]) !== 'undefined' ? this.state.timers[this.state.current].color : '#CCCCCC')}]}>
          <Text style={styles.label}>{(typeof(this.state.timers[this.state.current]) !== 'undefined' ? this.state.timers[this.state.current].label : '')}</Text>
        </View>
        <View style={styles.timer}>
          <Timer
            time={(times.length > 0 ? times[this.state.current] : 0)}
            onFinish={this.onFinish}
            loop={true}
            running={this.state.running}
            onReset={this.onReset}
            onToggle={this.onToggle}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.formList}>
          <ScrollView keyboardShouldPersistTaps='never'>
            {this.state.timers.map((info,index) => (
              <TimerForm
                label={info.label}
                minutes={info.minutes}
                seconds={info.seconds}
                color={info.color}
                id={info.id}
                key={info.id}
                onLabelChange={this.onLabelChange}
                onTimeChange={this.onTimeChange}
                onDelete={this.onDelete}
                onColorChange={this.onColorChange}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <Button

            style={styles.addButton}
            onPress={this.addTimer}>
            Add Timer
          </Button>

        </View>
      </View>
    )
  }
}



const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  window:{
    height: windowHeight,
  },
      topBar:{
        height:100,
        flexDirection:'column-reverse'
      },
          label:{
            fontSize:35,
            textAlign:'center',
            paddingBottom:15
          },
      timer:{
        height:150,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:0,
        borderTopWidth:2
      },
      formList:{
        paddingTop:10,
        flex:1,
        alignItems:'stretch'
      },
      addButton:{
        height:40,
        color:'#0099ff',
        justifyContent:'center',
        alignItems:'center'

      },
      buttonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        borderTopWidth:1,
        backgroundColor:'#eeeeee'
      }
});
