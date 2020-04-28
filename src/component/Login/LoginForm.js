import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as actions from '../store/actions/auth';

import { connect } from 'react-redux';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ errors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(errors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 0,
      password: 0,
      errors: {
        email:'Invalid email address',
        password:'Minimum 6 characaters required'
      }
    }
  }

  // componentDidMount() {
  //   this.props.onTryAutoSignUp();
  // }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = { ...this.state.errors };

    switch (name) {
      case "email":
        errors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
          errors.password =
          value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      this.props.onAuth(this.state.email, this.state.password);
      console.log(this.props.token);
      if (this.props.token !== null) {
        window.location.href = '/Main';
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }

  render() {
    const errors = this.state;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <FormContainer>
          <div className="form-container">
              {errorMessage}
              <form onSubmit={this.handleSubmit} noValidate>
                <div className='header'>
                  <h1>LogIn</h1>
                  {
                    this.props.loading ? 
                    <CircularProgress className='progress' color="primary" />
                    :
                    <div />
                  }
                </div>
                <br />
                <div className="input-container">
                  <TextField
                  className="input-empty"
                  type="email"
                  placeholder="Email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                  required
                  />
                  {errors.email.length >= 0 && (
                    <span className="errorMessage">{errors.errors.email}</span>
                  )}
                </div>
                <div className="input-container">
                  <TextField
                  className="input-empty"
                  type="password"
                  placeholder="Password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                  required
                  />
                  {errors.password.length >= 0 && (
                    <span className="errorMessage">{errors.errors.password}</span>
                  )}
                </div>
                <br />
                <div className="input-container">
                  <Button
                  className="submit"
                  type="submit"
                  onClick = {this.handleSubmit}
                  >Submit</Button>
                </div>
                <br />
                <label className="checkbox-container">
                  Remember Me
                  <input type="checkbox" checked />
                  <span className="checkmark"></span>
                </label>
                <Link to="/" className="info">Info</Link>
                <div className="bottom-form">
                  <Link to="/signUp" className="signup-text">Sign Up</Link>
                </div>
              </form>
            </div>
      </FormContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignUp: () => dispatch(actions.authCheckState())
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

//Form Container #FF8C00

const FormContainer = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  border-radius: 0.1875rem;

  .header {
    display: grid;
    grid-template-columns: repeat(12, 2fr);
  }

  .h1 {
    grid-column-start: 1;
    grid-column-end: 11;
    grid-row-start: 1;
    grid-row-start: 1;
  }

  .progress {
    grid-column-start: 11;
    grid-column-end: 12;
    grid-row-start: 1;
    grid-row-start: 1;
  }

  .form-container {
    background: #fff;
    position: relative;
    width: 28.125rem;
    height: 41.25rem;
    padding: 4rem;
    margin-top: 10rem;
    ${'' /* box-shadow: 0px 10px 50px #555; */}
    border: 3px solid black;
    border-radius: 1.25rem
  }

  input.error {
    background: #fff;
    height: 1.8rem;
    border: 1px solid red;
    border-radius: 0.25rem;
  }

  .input-container {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 1.2rem;
  }

  .submit {
    background: #fff;
  }

  .errorMessage {
    color: red;
    font-size: 1em;
    display: relative;
  }

  form div label {
    position: absolute;
    top: 0.025rem;
    left: 0.25rem;
    pointer-events: none;
    color: #8a8a8a;
    font-size: 1rem;
    transition: transform 150ms ease-out, font-size 150ms ease-out;
  }

  form div {
    position: relative;
  }

  input:focus ~ label {
    top: 0.4375rem;
    font-size: 0.7rem;
  }

  input:focus {
    outline: none;
  }

//checkbox

  .checkbox-container {
    margin-left: 0.75rem;
    padding-left: 1.875rem;
    position: relative;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .checkbox-container input {
    display: none;
  }

  .checkbox-container .checkmark {
    display: inline-block;
    background: #fff;
    width: 1.1rem;
    height: 1.1rem;
    left: 0;
    top: 0;
    border-radius: 0.1rem;
    position: absolute;
  }

  .checkbox-container input:checked + .checkmark:after {
    content: '';
    position: absolute;
    height: 0.25rem;
    width: 0.625rem;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    top: 25%;
    left: 21%;
    transform: rotate(-45deg);
  }

  .info {
    text-decoration: underline;
    color: #000;
    margin-left: 9.6rem;
    font-size: 0.9rem;
  }

  .bottom-form {
    text-decoration: underline;
    position: absolute;
    bottom: 0;
    margin-left: 17rem;
    margin-bottom: 4rem;
  }
`;

