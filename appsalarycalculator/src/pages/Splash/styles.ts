import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex:1;
  align-items:center;
  justify-content: center;
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