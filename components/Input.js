import React from 'react';
import styled from 'styled-components/native';

const FormControl = styled.View`
    border:1px solid #000;
`;
const FormLabel = styled.Text`
    font-size:16px;
`;
const StyledInput = styled.TextInput`
    padding:8px ;
    border-radius:8px;
    border:1px solid #000;
`;

export default function Input(name ,label,  onChangeText) {
  return (
    <FormControl>
      <FormLabel> {label} </FormLabel>
      <StyledInput onChangeText={() => onChangeText} name={ name }></StyledInput>
    </FormControl>
  );
}
