import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { conceptActions } from "../slices/conceptSlice";

interface ConceptForm {
  name: string
  description: string
}

const AddConcept = () => {
  const {register, handleSubmit} = useForm<ConceptForm>()

  const {isLoading, isSuccess, message, isError} = useSelector((state: RootState) => state.concept)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(conceptActions.reset())
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(conceptActions.reset())
  }, [isError, isSuccess])

  const onSubmit = (data: ConceptForm) => {
    // @ts-ignore
    dispatch(conceptActions.add(data))
  }

  return isLoading ? <h1>LOADING</h1> : <>
    <section className="heading">
      <h1>
        New Concept
      </h1>
    </section>

    <section className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            className='form-group'
            type="text"
            placeholder='Concept name'
            id='name'
            {...register('name')}
          />
        </div>

        <div className="form-group">
          <input
            type='text'
            id='description'
            placeholder='Concept Description'
            {...register('description')}
          />
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>

  </>
}

export default AddConcept