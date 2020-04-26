import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addDeckHandler} from '../store/actions/deck';
import styled from 'styled-components/native';
import PrimaryButton from '../components/PrimaryButton';

const Container = styled.KeyboardAvoidingView`
  flex:1 ;
  padding:16px;
`;

const Card = styled.View`
    flex:1;
    padding:16px;
  background:#fff;
  justify-content:space-around;
  min-height:200px;
  align-items:center;
`;
const HeaderText = styled.Text`
  font-size:24px;
  
  font-weight:bold;
`;
const StyledInput = styled.TextInput`
    border:1px solid #000;
    padding:8px;
    width:100%;
    color:#000;
`;
const FormControl = styled.View`
    width:100%;
`;
const FormLabel = styled.Text`
    font-size:16px;
    margin-bottom:16px;
`;

class AddDeckScreen extends Component {
  state = {
    title: '',
  };

  handleChange = (name, value) => {
    this.setState (() => ({
      [name]: value || '',
    }));
  };

  handleSave = async () => {
    const {title} = this.state;
    this.setState({
      title:''
    })
    const {addDeckHandler} = this.props;
    if( title ){
      await addDeckHandler (title);

      this.props.navigation.navigate ('Details');
    }
   
  };

  render () {
    return (
      <Container>
        <Card>
          <HeaderText> Add deck </HeaderText>
          <FormControl>
            <FormLabel> Enter deck title </FormLabel>
            <StyledInput
            value={ this.state.title }
              onChangeText={text => this.handleChange ('title', text)}
            />
          </FormControl>
          <PrimaryButton onPress={this.handleSave}> Save </PrimaryButton>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({addDeckHandler}, dispatch);
};

export default connect (null, mapDispatchToProps) (AddDeckScreen);
