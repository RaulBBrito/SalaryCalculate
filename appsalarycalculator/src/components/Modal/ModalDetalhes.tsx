import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'

import './styles'
const { height } = Dimensions.get('window');

interface IValores{
  salariobruto: number;
  numdependente: number;
  desconto: number;
}

interface model1{
  show: boolean; 
  close: () => void;
  calculo?: IValores;
}

const ModalDetalhes = ({show, close , calculo}:model1) => {

  const { width } = Dimensions.get('window');
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  });

  const openModal = () => {
    Animated.sequence([
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true }),
      Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()
    
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true })
    ]).start();
  }

  useEffect(() => {
    if(show){
      openModal()
    }else{
      closeModal()
    }
  }, [show])

  return( 
    <Animated.View 
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View 
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <View style={styles.indicator} />

        <Text style={styles.textTop}>
          Dados inseridos
        </Text>

        <View style={styles.dadosInseridos}>
            <Text style={styles.itemDescricao}>Salário Bruto</Text>
            <Text style={styles.itemValor}>R$ {calculo?.salariobruto}</Text>

            <Text style={styles.itemDescricao}>Número de dependentes</Text>
            <Text style={styles.itemValor}>{calculo?.numdependente}</Text>

            <Text style={styles.itemDescricao}>Outros descontos</Text>
            <Text style={styles.itemValor}>R$ {calculo?.desconto}</Text>
        </View>

        <Text style={styles.hr} />

        <View style={styles.dadosInseridos}>
            <Text style={styles.itemDescricaoL}>Salário Líquido</Text>
            <Text style={styles.itemValorL}>R$ {calculo?.salariobruto}</Text>
        </View>

        <View style={styles.dadosInseridos}>
            <Text style={styles.itemEventoB}>Evento</Text>
            <Text style={styles.itemRefB}>Ref. </Text>
            <Text style={styles.itemDescontoB}>Desconto</Text>

            <Text style={styles.itemEventoB}>INSS</Text>
            <Text style={styles.itemRef}>8,00%</Text>
            <Text style={styles.itemDesconto}>R$ 83,60</Text>

            <Text style={styles.itemEventoB}>IRRF</Text>
            <Text style={styles.itemRef}>0,00%</Text>
            <Text style={styles.itemDesconto}>R$ 0,00</Text>

            <Text style={styles.itemEventoB}>Outros Descontos</Text>
            <Text style={styles.itemRef}> - </Text>
            <Text style={styles.itemDesconto}>R$ 85,00</Text>

            <Text style={styles.itemDescricao}>Totais</Text>
            <Text style={styles.itemValor}>R$ 168,60</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: '#fff' }}>Fechar</Text>
        </TouchableOpacity>
       
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  modal: {
    marginLeft: 10,
    bottom: 0,
    position: 'absolute',
    height: '80%',
    backgroundColor: '#fff',
    width: '95%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center'
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
  },
  textTop: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
    borderBottomWidth: 1,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#673AB7', //#9b59b6
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  hr: {
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 1,
  },
  dadosInseridos: {
    marginTop: 10,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemDescricao: {
    marginTop: 7,
    alignItems: 'flex-start',
    width: '50%' 
  },
  itemValor: {
    marginTop: 7,
    textAlign: "right",
    width: '50%' 
  },
  itemDescricaoL: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    color: '#F5A836',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    width: '50%' 
  },
  itemValorL: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    color: '#F5A836',
    fontWeight: 'bold',
    textAlign: "right",
    width: '50%' 
  },

  itemEventoB: {
    width: '50%', 
    fontWeight: 'bold',
    marginTop: 7,
    borderBottomWidth: 1,
  },
  itemRefB: {
    width: '20%', 
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 7,
    borderBottomWidth: 1,
  },
  itemDescontoB: {
    width: '30%',
    marginTop: 7,
    textAlign: "right",
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },

  itemEvento: {
    width: '50%', 
    marginTop: 7,
    borderBottomWidth: 1,
  },
  itemRef: {
    width: '20%', 
    marginTop: 7,
    borderBottomWidth: 1,
  },
  itemDesconto: {
    width: '30%',
    marginTop: 7,
    borderBottomWidth: 1,
    textAlign: "right",
  }
});

export default ModalDetalhes