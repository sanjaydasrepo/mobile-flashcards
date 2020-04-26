import React from 'react'
import styled from 'styled-components/native'

const ButtonCustom = styled.TouchableOpacity`
    padding:8px 24px;  
    align-items:center;
    background: #fff;
    border: 2px solid #6200ee;
`
const ButtonText = styled.Text`
    font-weight:bold;
    font-size:16px;
    color:#6200ee;
`

export default function SecondaryButton( { children , onPress } ) {
   
    return (
        <ButtonCustom onPress={ onPress }>
            <ButtonText> { children } </ButtonText>
        </ButtonCustom>
    )
}
