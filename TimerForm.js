import React from 'react'
import {Button,View, Text, StyleSheet, TextInput} from 'react-native'

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
      colorInput:{
        height:20,
      },
      inputGroup:{
        paddingBottom:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:6
      },
          inputLarge:{
            height: 40,
            width:100,
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 5,
            textAlign: 'center',
            borderTopRightRadius:4,
            borderTopLeftRadius:4
          },
          secondRow:{
            flexDirection: 'row',
            borderColor: 'gray',
            borderWidth: 1,
            borderBottomLeftRadius:2,
            borderBottomRightRadius:2,
            alignItems:'center'
          },
              inputSmall:{
                height: 25,
                width:44,
                padding:2
              },
})

export default class TimerForm extends React.Component {
  constructor(props) {
    super(props)
    this.onLabelChange = props.onLabelChange
    this.onTimeChange = props.onTimeChange
    this.onDelete = props.onDelete
    this.onColorChange = props.onColorChange
    this.id = props.id
    this.state={
      minutes:props.minutes,
      seconds:props.seconds,
      label:props.label,
      color:props.color.slice(1,7)
    }
  }

  handleLabelChange = text => {
    this.setState({
      label:text
    })
    this.onLabelChange(text,this.id)
  }

  handleMinutesChange = (minutes,id) => {
    this.setState({
      minutes:minutes
    }, () => {
      if (!isNaN(minutes)){
        this.onTimeChange(this.state.minutes,this.state.seconds,this.id)
      }
    })
  }

  handleSecondsChange = (seconds,id) => {
    this.setState({
      seconds:seconds
    }, () => {
      if (!isNaN(seconds)){
        this.onTimeChange(this.state.minutes,this.state.seconds,this.id)
      }
    })
  }

  handleColorChange = (color) => {
    this.setState({
      color:color
    })
    this.onColorChange('#' + color,this.id)
  }

  handleDelete = () => {
    this.onDelete(this.id)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width:80,height:30,flexDirection:'row',borderColor:'#' +this.state.color,borderWidth:3,borderRadius:4,marginRight:6}}>
          <Text style={{marginLeft:2}}>#</Text>
          <TextInput
            style={styles.colorInput}
            value={this.state.color}
            onChangeText={(color) => this.handleColorChange(color)}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputLarge}
            value={this.state.label}
            onChangeText={(text) => this.handleLabelChange(text)}
          />
          <View style={styles.secondRow}>
            <TextInput
              style={[styles.inputSmall,{textAlign:'right'}]}
              value={String(this.state.minutes)}
              onChangeText={(minutes) => this.handleMinutesChange(minutes)}
              keyboardType='numeric'
            />
            <Text style={{height:20,width:10,textAlign:'center'}}>:</Text>
            <TextInput
              style={[styles.inputSmall, {textAlign:'left'}]}
              value={String(this.state.seconds)}
              onChangeText={(seconds) => this.handleSecondsChange(seconds)}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={{width:80}}>
          <Button title='Delete' color="#FF6666" onPress={() => this.handleDelete()}/>
        </View>
      </View>
    )
  }
}
