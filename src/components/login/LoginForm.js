import React from 'react'
import { useForm, useUser } from '../../hooks'
import { Button, FormContainer, Input } from '../atoms'
import { generateLoginFormValues } from './generateLoginFormValues'

export const LoginForm = () => { 
  const {formValues:loginFormValues, onFormChange:onLoginFormChange} = useForm({defaultFormValue:generateLoginFormValues()}) 
  const {authenticateUser} = useUser();
  const onLogin =()=>{
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    authenticateUser({ formValues: {email, password}, isLogin:true});
  };      
  return (
    <FormContainer>
        
        <Input name="email" label="email" value={loginFormValues.email.value} onChange={onLoginFormChange} error={loginFormValues.email.error}   />
        <Input name="password" label="password"  value={loginFormValues.password.value} onChange={onLoginFormChange} error={loginFormValues.password.error} type="password"/>
        <Button onClick={()=> onLogin()}>login</Button>
    </FormContainer>
  )
}

