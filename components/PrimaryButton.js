import React from 'react'
import styled from 'styled-components/native'

const ButtonCustom = styled.TouchableOpacity`
    padding:8px 24px;  
    align-items:center;
    background: #6200ee;
`
const ButtonText = styled.Text`
    font-weight:bold;
    font-size:16px;
    color:#fff;
`

export default function PrimaryButton( { children , onPress } ) {
   
    return (
        <ButtonCustom onPress={ onPress }>
            <ButtonText> { children } </ButtonText>
        </ButtonCustom>
    )
}
