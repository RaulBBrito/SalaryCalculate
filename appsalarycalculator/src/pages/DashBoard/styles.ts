import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex:1;
  align-items:center;
  justify-content: center;
  width:100%;
`;

export const Title = styled.Text`

  padding-top: 10px;
  font-size: 40px;
  color: #FFF;
  font-family: 'RobotoSlab-Medium';

`;

export const EntrarButton = styled.TouchableOpacity`
  background: #F5A836;
  border-top-width: 1px;
  border-color: #232129;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 9px;
  margin-top:40px;
`;

export const EntrarButtonText = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  font-family: 'RobotoSlab-Medium';
  padding:10px 115px;
`;

export const FooterApp = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FooterAppText = styled.Text`
  color: #FFF;
  font-size: 14px;
  font-family: 'Roboto-Regular';
`;

////////////////////

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  font-family: 'Roboto-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: 'Roboto-Regular';

  margin-left: 16px;
`;