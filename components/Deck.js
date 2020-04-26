import React, {Fragment} from 'react';
import styled from 'styled-components/native';

const DeckSingle = styled.TouchableOpacity`
    align-items:center;
    padding:16px;
    width:100%;
    min-height:120px;
    margin-top:8px;
    justify-content:space-between;
    border:1px solid #eee;
    elevation:1;
    border-radius:2px;

`;
const DeckTitle = styled.Text`
font-size:24px;
    color:#000;
`;
const CustomText = styled.Text`
    color:#000;
    font-size:18px;
`;

const DeckBody = styled.View`
    color:#000;
`;

export default function Deck (props) {
  const {item: {id, cards, title, score}, handleDispatch } = props;
  return (
    <DeckSingle onPress={()=>handleDispatch( id )}
    >
      <Fragment>
        <DeckTitle>
          {title}
        </DeckTitle>
        {cards && cards.length > 0
            ? <CustomText> {cards.length === 1 ? `${ cards.length } Card`: `${ cards.length } Cards` }  </CustomText>
            : <CustomText> No cards </CustomText>
            }
      </Fragment>
    </DeckSingle>
  );
}
