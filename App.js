/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Plataform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,
}

export default class App extends Component {

  state = { ...initialState} //criou um outro objeto com os mesmos valores, não altera o original

  addDigit = n => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) { //validação, apenas 1 '.'. verifica se vai limpar o display, se não limpar, continua, se nao for limpar display, vai ignorar
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n //concanetar os numeros
    this.setState({ displayValue, clearDisplay: false})

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })

    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
    if(this.state.current === 0) {
      //quando current for 0 (indice do array), ele seta a operação q eu marquei/selecionei,
      //depois seta o current para 1 (segunda indice do array) e depois seta o display para ser limpo a partir do proximo digito informado
      this.setState({ operation, current: 1, clearDisplay: true }) 
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`, //``para garantir que é string
        operation: equals ? null : operation, // se operation for "="
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      })
    }


  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory}/>
          <Button label="/" operation onClick={this.setOperation}/>
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation}/>
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation}/>
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.setOperation}/>
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit}/>
          <Button label="=" operation onClick={this.setOperation}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
