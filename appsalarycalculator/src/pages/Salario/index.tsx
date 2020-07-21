import React, { useCallback, useRef, Component, useState } from 'react';
import { Image, View, Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
}
from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { FormHandles } from '@unform/core';

import { Form } from '@unform/mobile';

import { Container} from './styles';


interface SignInFormData {
  email: string;
  password: string;
}
import logoImg from '../../assets/logo.png';

const Salario: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // return <Container>

  //   <Input
  //               autoCorrect={false}
  //               autoCapitalize="none"
  //               keyboardType="email-address"
  //               name="salariobruto"
  //               icon="dollar-sign"
  //               placeholder="Salário Bruto"
  //               returnKeyType="next"
  //             />
  //    <Input name="numDependentes" icon="users" placeholder="Numero de Dependentes"/>
  //    <Input name="outrasDescontos" icon="dollar-sign" placeholder="Outos Descontos"/>
    
  //    <Button>Entrar</Button>

  //   <FooterApp>
  //     <FooterAppText>Raul Brito - 2020</FooterAppText>
  //   </FooterApp>
  // </Container>;

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
              
            </View>

           
              <Input
                name="email"
                icon="mail"
                placeholder="E-Mail"
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Salario;
