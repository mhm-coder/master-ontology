import {  useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import { RootState } from "../store";
import { authActions } from "../slices/authSlice";

interface LoginForm {
  email: string
  password: string
}


const Login = () => {
  const {register, handleSubmit} = useForm<LoginForm>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(authActions.reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (data: LoginForm) => {
    // @ts-ignore
    dispatch(authActions.login(data))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login and start setting concepts</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              {...register('email')}
              placeholder='Enter your email'
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              {...register('password')}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login