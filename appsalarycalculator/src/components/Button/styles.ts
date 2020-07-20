import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #F5A836;
  border-top-width: 1px;
  border-color: #232129;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 9px;
  margin-top:10px;
  padding: 15px 0;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  color: #fff;
  font-size: 18px;
`;
