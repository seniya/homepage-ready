
import React, { useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';

import { singUpAction } from '../../atoms/atomsUser'
import SignUpForm from './component/SignUpForm'

interface ISignUpProps extends RouteComponentProps {

}

function SignUp({ history }: ISignUpProps) {
  console.log('props.history : ', history)
 
  const onSubmit = async (values :any) => {
    console.log('onSubmit values : ', values)
    const param = {
      id: values.id,
      name: values.name,
      pwd: values.password1
    }
    const responseData = await singUpAction(param)   
    const { success, msg } = responseData    
    if (success) {
      history.push('/sign-in')
    } else {
      alert(msg)
    }
  }

  return (
    <div>
      <SignUpForm onSubmit={onSubmit}/>
    </div>
  );
}


export default SignUp;