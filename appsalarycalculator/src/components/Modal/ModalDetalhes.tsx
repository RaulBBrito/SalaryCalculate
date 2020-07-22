import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'

import './styles'
const { height } = Dimensions.get('window');

interface IValores{
  salariobruto: number;
  numdependente: number;
  desconto: number;
}

interface IValoresTabela{
  show: boolean; 
  close: () => void;
  calculo?: IValores;
}

interface ITabelaValores{
  referencia: string;
  descontos: number;
}

function calcularINSS(valueSalariobruto: number){

  const salarioBruto = valueSalariobruto;
  
  let inss: ITabelaValores = {referencia: '0%', descontos: 0};
  
  let totalRecolher = 0;

  console.log('Salario é igual a 1045.00'+(salarioBruto == 1045.00));
  if(salarioBruto >= 1045.00){
    totalRecolher = parseFloat((1045 * 0.075).toFixed(2));
    inss.referencia = '7,50%';
    inss.descontos = totalRecolher;
    console.log(totalRecolher);
  }

  if(salarioBruto >= 1045.01){
    let salario = salarioBruto > 2089.60 ? 2089.60 : salarioBruto;
    totalRecolher += parseFloat(((salario - 1045) * 0.09).toFixed(2));
    
    inss.referencia = '9,00%';
    inss.descontos = totalRecolher;
    console.log(totalRecolher);
  }

  if(salarioBruto >= 2089.61){
    let salario = salarioBruto > 3134.40 ? 3134.40 : salarioBruto;
    totalRecolher += parseFloat(((salario - 2089.60) * 0.12).toFixed(2));

    inss.referencia = '12,00%';
    inss.descontos = totalRecolher;
  }

  if(salarioBruto >= 3134.41 && salarioBruto <= 6101.06){
    totalRecolher += parseFloat(((salarioBruto - 3134.40) * 0.14).toFixed(2));

    inss.referencia = '14,00%';
    inss.descontos = totalRecolher;
  }else if(salarioBruto >= 6101.06){
    totalRecolher = 713.10;

    inss.referencia = 'Teto';
    inss.descontos = totalRecolher;
  }

  return inss;
}

function calcularIRRF(valueSalariobruto: number, dependentes: number){

  const salarioBruto = (dependentes > 0) ? valueSalariobruto - 189.59 : valueSalariobruto;
  
  let irrf: ITabelaValores = {referencia: '0%', descontos: 0};
  
  let totalRecolher = 0;

  console.log('Salario é igual a 1045.00'+(salarioBruto == 1045.00));
  if(salarioBruto <= 1903.98){
    totalRecolher = 0;
    irrf.referencia = '0%';
    irrf.descontos = totalRecolher;
  
  }else if(salarioBruto >= 1903.99 && salarioBruto < 2826.66){
    let valueirrf = salarioBruto * 0.075;
    totalRecolher += parseFloat((valueirrf - 142.80).toFixed(2));

    irrf.referencia = '7.50%';
    irrf.descontos = totalRecolher;

  }else if(salarioBruto >= 2826.66 && salarioBruto < 3751.06){
    let valueirrf = salarioBruto * 0.15;
    totalRecolher += parseFloat((valueirrf - 354.80).toFixed(2));

    irrf.referencia = '15.00%';
    irrf.descontos = totalRecolher;

  }else if(salarioBruto >= 3751.06 && salarioBruto < 4664.69){
    let valueirrf = salarioBruto * 0.22;
    totalRecolher += parseFloat((valueirrf - 636.13).toFixed(2));

    irrf.referencia = '22.00%';
    irrf.descontos = totalRecolher;
  
  }else if(salarioBruto >= 4664.69){
    let valueirrf = salarioBruto * 0.275;
    totalRecolher += parseFloat((valueirrf - 869.36).toFixed(2));

    irrf.referencia = '27.50%';
    irrf.descontos = totalRecolher;
  }

  return irrf;
}

function formatValor(amount: number, decimalCount = 2, decimal = ",", thousands = "."){
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = amount < 0 ? "-" : "";
  let valor = amount+"";
  let i = parseInt(valor = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
  let j = (i.length > 3) ? i.length % 3 : 0;

  let valorI = amount - parseInt(i);

  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(valorI).toFixed(decimalCount).slice(2) : "");

}

const ModalDetalhes = ({show, close , calculo}:IValoresTabela) => {
  //const { width } = Dimensions.get('window');
  let salBruto = (calculo?.salariobruto) ? calculo?.salariobruto : 0;
  let numdependente = (calculo?.numdependente) ? calculo?.numdependente : 0;
  let inssDesconto = calcularINSS(salBruto);
  let irrfDesconto = calcularIRRF((salBruto - inssDesconto.descontos), numdependente);

  let inssValorDesconto = ((inssDesconto.descontos).toFixed(2));
  const inssVlDesconto = formatValor(parseFloat(inssValorDesconto));

  let salarioBrutoFormat = (calculo?.salariobruto) ? calculo?.salariobruto : 0;
  const salarioBruto = formatValor(salarioBrutoFormat);

  //console.log((inssDesconto.descontos).toFixed(2)+" - "+inssDesconto.descontos+" - "+irrfDesconto.descontos+" - "+calculo.desconto);
  let totalDesc = ((calculo?.desconto) ? calculo?.desconto : 0).toString();
  let total = (parseFloat((inssDesconto.descontos).toString()) + parseFloat((irrfDesconto.descontos).toString()) + parseFloat(totalDesc));
  total = parseFloat(total.toString());
  
  const irrDesconto = formatValor(irrfDesconto.descontos);
  const totalFormat = formatValor(total);
  const outrosDesc = (calculo?.desconto) ? calculo?.desconto : 0;
  const outrosDescontos = formatValor(outrosDesc); 

  const salCalculo = (calculo?.salariobruto) ? calculo?.salariobruto : 0;
  const calc = (totalFormat) ? totalFormat : 0;
  const salarioLiquido = formatValor(salCalculo - total);
  console.log(salCalculo+" "+totalFormat);
  // salarioBruto = parseInt((salarioBruto).toFixed(2));
  // salarioBruto = parseInt(formatValor(salarioBruto));


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
            <Text style={styles.itemValor}>R$ {salarioBruto}</Text>

            <Text style={styles.itemDescricao}>Número de dependentes</Text>
            <Text style={styles.itemValor}>{calculo?.numdependente}</Text>

            <Text style={styles.itemDescricao}>Outros descontos</Text>
            <Text style={styles.itemValor}>R$ {outrosDescontos}</Text>
        </View>

        <Text style={styles.hr} />

        <View style={styles.dadosInseridos}>
            <Text style={styles.itemDescricaoL}>Salário Líquido</Text>
            <Text style={styles.itemValorL}>R$ {salarioLiquido}</Text>
        </View>

        <View style={styles.dadosInseridos}>
            <Text style={styles.itemEventoB}>Evento</Text>
            <Text style={styles.itemRefB}>Ref. </Text>
            <Text style={styles.itemDescontoB}>Desconto</Text>

            <Text style={styles.itemEventoB}>INSS</Text>
            <Text style={styles.itemRef}>{inssDesconto.referencia}</Text>
            <Text style={styles.itemDesconto}>- R$ {inssVlDesconto}</Text>

            <Text style={styles.itemEventoB}>IRRF</Text>
            <Text style={styles.itemRef}>{irrfDesconto.referencia}</Text>
            <Text style={styles.itemDesconto}>- R$ {irrDesconto}</Text>

            <Text style={styles.itemEventoB}>Outros Descontos</Text>
            <Text style={styles.itemRef}>-</Text>
            <Text style={styles.itemDesconto}>- R$ {outrosDescontos}</Text>

            <Text style={styles.itemDescricao}>Totais</Text>
            <Text style={styles.itemValor}>- R$ {totalFormat}</Text>
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
    width: '50%' ,
    color: 'red',
  },
  itemDescricaoL: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    color: 'green',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    width: '50%' 
  },
  itemValorL: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    color: 'green',
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
    color: 'red',
  }
});

export default ModalDetalhes