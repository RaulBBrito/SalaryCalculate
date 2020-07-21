import React, { useCallback, useRef, useState } from 'react';
import { Image, View,
  ScrollView,
  KeyboardAvoidingView,
  Platform, StyleSheet,
  Text
}
from 'react-native';

import ModalDetalhes from '../../components/Modal/ModalDetalhes';
import Toast from 'react-native-simple-toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Container, Title, FooterApp, FooterAppText} from './styles';

import logoImg from '../../assets/logo.png';

interface IValores{
  salariobruto: number;
  numdependente: number;
  desconto: number;
}

const DashBoard: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const [modal, setModal] = useState(false);
  const [calculo, setCalculo] = useState<IValores>();

  const navigation = useNavigation();

  const handleSignIn = useCallback((data: IValores) => {
    const calculoSomado: IValores = {
      salariobruto: data.salariobruto,
      numdependente: data.numdependente,
      desconto: data.desconto,
    };
    setCalculo(calculoSomado);

    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {
    //       text: 'Ask me later',
    //       onPress: () => console.log('Ask me later pressed')
    //     },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel'
    //     },
    //     { text: 'OK', onPress: () => console.log('OK Pressed') }
    //   ],
    //   { cancelable: false }
    // );
  
    setModal(true);    
    Toast.show('Carregando...');
    
    console.log(data);
  
  },[]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Salary Calculator</Title>
            </View>

            <Form style={styles.formulario} ref={formRef} onSubmit={handleSignIn}>
              
              <Input name="salariobruto" icon="dollar-sign" placeholder="Salário Bruto" />
              <Input name="numdependente" icon="users" placeholder="Numero de Dependentes" />
              <Input name="desconto" icon="dollar-sign" placeholder="Outos Descontos" />
              
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
              <Text style={styles.btnCancelar} onPress={() => {navigation.navigate('Splash')} }>Cancelar</Text>
            </Form>
          </Container>
            
          <FooterApp>
            <FooterAppText>Raul Brito - 2020</FooterAppText>
          </FooterApp>
        
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalDetalhes 
        show={modal}
        close={() => setModal(false)}
        calculo={calculo}
      />
    </>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  btnCancelar:{
    width: 310,
    textDecorationLine: 'underline',
    color: '#F5A836',
    marginTop: 20,
    textAlign: 'center',
  },

  formulario: {
    padding: 40
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});


export default DashBoard;