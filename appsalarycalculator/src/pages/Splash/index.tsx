import React, { useCallback } from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, EntrarButton, EntrarButtonText, FooterApp, FooterAppText} from './styles';

import logoImg from '../../assets/logo.png';

const Splash: React.FC = () => {

  const navigation = useNavigation();

  return <Container>
    <Image source={logoImg} />
    <Title>Salary</Title>
    <Title>Calculator</Title>

    <EntrarButton onPress={() => navigation.navigate('DashBoard')}>
      <EntrarButtonText>Entrar</EntrarButtonText>
    </EntrarButton>

    <FooterApp>
      <FooterAppText>Raul Brito - 2020</FooterAppText>
    </FooterApp>
    

  </Container>;
};

export default Splash;