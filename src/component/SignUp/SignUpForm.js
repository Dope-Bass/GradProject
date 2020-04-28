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



class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 0,
      surname: 0,
      workplace: 0,
      position: 0,
      email: 0,
      password: 0,
      passCheck: 0,
      errors: {
        firstName: 'Minimum 2 characters required',
        surname: 'Minimum 2 characters required',
        workplace: 'Minimum 2 characters required',
        position: 'Minimum 2 characters required',
        passCheck:'Passwords dont match each other',
        email:'Invalid email address',
        password:'Minimum 6 characters required'
      }
    }
  };


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
      case "firstName":
          errors.firstName =
          value.length < 2 ? "Minimum 2 characaters required" : "";
        break;
      case "surname":
          errors.surname =
          value.length < 2 ? "Minimum 2 characaters required" : "";
        break;
      case "workplace":
          errors.workplace =
          value.length < 2 ? "Minimum 2 characaters required" : "";
        break;
      case "position":
          errors.position =
          value.length < 2 ? "Minimum 2 characaters required" : "";
        break;
      case "passCheck":
          errors.passCheck =
          this.state.password === value ? "" : "Passwords dont match each other";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
        firstName: ${this.state.firstName}
        surname: ${this.state.surname}
        workplace: ${this.state.workplace}
        position: ${this.state.position}
      `);
      this.props.onAuth(
        this.state.email, this.state.password,
        this.state.firstName, this.state.surname, 
        this.state.workplace, this.state.position
      );
      window.location.href = '/logIn';
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };


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
            <h1>Registration</h1>
            {
                this.props.loading ? 
                <CircularProgress className='progress' color="primary" />
                :
                <div />
            }
            <br />
            <div className='input-container'>
              <TextField
              className='input-empty'
              type="firstName"
              placeholder="First Name"
              name="firstName"
              noValidate
              onChange={this.handleChange}
              required
              />
              {errors.firstName.length >= 0 && (
                <span className="errorMessage">{errors.errors.firstName}</span>
              )}
            </div>
            <div className="input-container">
              <TextField
              className="input-empty"
              type="surname"
              placeholder="Surname"
              name="surname"
              noValidate
              onChange={this.handleChange}
              required
              />
              {errors.surname.length >= 0 && (
                <span className="errorMessage">{errors.errors.surname}</span>
              )}
            </div>
            <div className="input-container">
              <TextField
              className="input-empty"
              type="workplace"
              placeholder="Workplace"
              name="workplace"
              noValidate
              onChange={this.handleChange}
              required
              />
              {errors.workplace.length >= 0 && (
                <span className="errorMessage">{errors.errors.workplace}</span>
              )}
            </div>
            <div className="input-container">
              <TextField
              className="input-empty"
              type="position"
              placeholder="Position"
              name="position"
              noValidate
              onChange={this.handleChange}
              required
              />
              {errors.position.length >= 0 && (
                <span className="errorMessage">{errors.errors.position}</span>
              )}
            </div>
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
            <div className="input-container">
              <TextField
              className="input-empty"
              type="password"
              placeholder="Password"
              name="passCheck"
              noValidate
              onChange={this.handleChange}
              required
              />
              {errors.passCheck.length >= 0 && (
                <span className="errorMessage">{errors.errors.passCheck}</span>
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
            <br />
            <Link to="/" className="info">Info</Link>
            <div className="bottom-form">
              <Link to="/logIn" className="login-text">Log In</Link>
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
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (firstName, surname, workplace, position, 
      email, password, passCheck) => dispatch(actions.authSignUp(email, password, passCheck, firstName, surname, workplace, position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

//Form Container #FF8C00

const FormContainer = styled.div`
  display: grid;
  justify-content: center;
  position: realtive;
  border-radius: 0.1875rem;

  .form-container {
    background: #fff;
    position: relative;
    width: 28.125rem;
    height: 45.25rem;
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
    margin-bottom: 38rem;
  }
`;

