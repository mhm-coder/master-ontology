import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { authActions } from "../slices/authSlice";
import { useEffect } from "react";
import { toast } from 'react-toastify'

interface RegisterForm {
  name: string
  email: string
  password: string
  passwordAgain: string
}

const Register = () => {
  const {register, handleSubmit} = useForm<RegisterForm>()

  const {isLoading, isSuccess, message, user, isError} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(authActions.reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (data: RegisterForm) => {
    // @ts-ignore
    dispatch(authActions.register(data))
  }

  return isLoading ? <h1>LOADING</h1> : <>
    <section className="heading">
      <h1>
        <FaUser/> Register
        <p>Please create an account</p>
      </h1>
    </section>

    <section className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            className='form-group'
            type="text"
            {...register('name')}
            placeholder='Enter your name'
            id='name'
          />
        </div>

        <div className="form-group">
          <input
            type='email'
            {...register('email')}
            id='email'
            placeholder='Enter an email'
          />
        </div>

        <div className="form-group">
          <input
            type='password'
            {...register('password')}
            id='password'
            placeholder='Enter the password'
          />
        </div>

        <div className="form-group">
          <input
            type='password'
            {...register('passwordAgain')}
            id='passwordAgain'
            placeholder='Re enter the password'
          />
        </div>

        <div className="form-group">
          <button type='submit' className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>

  </>
}

export default Register