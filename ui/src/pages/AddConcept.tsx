import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { useMutation } from "react-query";
import { conceptService } from "../services/conceptService";

interface ConceptForm {
  name: string
  description: string
}

const AddConcept = () => {
  const {register, handleSubmit} = useForm<ConceptForm>()

  const {error, isLoading, isSuccess, mutate, isError} = useMutation(conceptService.add)
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(error as string)
    }

    if (isSuccess) {
      navigate('/')
    }

  }, [isError, isSuccess])

  const onSubmit = (data: ConceptForm) => {
    mutate(data)
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