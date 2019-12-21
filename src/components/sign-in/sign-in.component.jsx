import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { googleSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '',password: ''});
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and pasword</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required  
          />
          <FormInput 
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required 
          />
          <div className='buttons'>
            <CustomButton type='submit'> SIGN IN </CustomButton>
            <CustomButton 
              type='button'
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              SIGN IN WITH GOOGLE
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn);