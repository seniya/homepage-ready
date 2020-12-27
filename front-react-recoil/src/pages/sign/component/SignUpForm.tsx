import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type TSignUpFormProps = {
  onSubmit: (values :any) => Promise<void>; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

function SignUpForm ({ onSubmit }: TSignUpFormProps) {

  const { handleSubmit, register, watch, errors } = useForm()
  const [ alreadyExist, setAlreadyExist ] = useState(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>회원가입</legend>
        {alreadyExist && '이미 존재하는 아이디입니다.'}
        <div className="col">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            ref={register({
              required: '필수 입력사항 입니다.',
              maxLength: {
                value: 20,
                message: '글이 넘침',
              },
            })}
            placeholder="아이디를 입력해주세요"
          />
          <p className="notice">{errors.id && errors.id.message}</p>
        </div>        
        <div className="col">
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            id="password1"
            name="password1"
            ref={register({
              required: '필수 입력사항 입니다.',
            })}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="col">
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            name="password2"
            id="password2"
            ref={register({
              required: '필수입력사항 입니다.',
              validate: value => {
                return value === watch('password1');
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <p className="notice">
            {errors.password2 && '비밀번호가 일치하지 않습니다.'}
          </p>
        </div>
        <div className="col">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={register({
              required: '필수 입력사항 입니다.',
              maxLength: {
                value: 10,
                message: '글이 넘침',
              },
            })}
            placeholder="이메일을 입력해주세요"
          />
          <p className="notice">{errors.name && errors.name.message}</p>
        </div>
      </fieldset>
      <button type="submit" className="submit-btn">
        확인
      </button>
      </form>
  );
}
export default SignUpForm;

/* <form onSubmit={handleSubmit(onSubmit)}>
<fieldset>
  <legend>회원가입</legend>
  {alreadyExist && '이미 존재하는 아이디입니다.'}
  <div className="col">
    <label htmlFor="id">아이디</label>
    <input
      type="text"
      id="id"
      name="id"
      ref={register({
        required: '필수 입력사항 입니다.',
        maxLength: {
          value: 20,
          message: '글이 넘침',
        },
      })}
      placeholder="아이디를 입력해주세요"
    />
    <p className="notice">{errors.id && errors.id.message}</p>
  </div>        
  <div className="col">
    <label htmlFor="password1">비밀번호</label>
    <input
      type="password"
      id="password1"
      name="password1"
      ref={register({
        required: '필수 입력사항 입니다.',
      })}
      placeholder="비밀번호를 입력해주세요"
    />
  </div>
  <div className="col">
    <label htmlFor="password2">비밀번호 확인</label>
    <input
      type="password"
      name="password2"
      id="password2"
      ref={register({
        required: '필수입력사항 입니다.',
        validate: value => {
          return value === watch('password1');
        },
      })}
      placeholder="비밀번호를 입력해주세요"
    />
    <p className="notice">
      {errors.password2 && '비밀번호가 일치하지 않습니다.'}
    </p>
  </div>
  <div className="col">
    <label htmlFor="name">이름</label>
    <input
      type="text"
      id="name"
      name="name"
      ref={register({
        required: '필수 입력사항 입니다.',
        maxLength: {
          value: 10,
          message: '글이 넘침',
        },
      })}
      placeholder="이메일을 입력해주세요"
    />
    <p className="notice">{errors.name && errors.name.message}</p>
  </div>
</fieldset>
<button type="submit" className="submit-btn">
  확인
</button>
</form> */