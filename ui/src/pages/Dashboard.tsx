import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { conceptActions } from "../slices/conceptSlice";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {user} = useSelector((state: RootState) => state.auth)
  const {concepts, isLoading, isError, message} = useSelector((state: RootState) => {
    return state.concept
  })

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(conceptActions.getAll())

    return () => {
      debugger
      dispatch(conceptActions.reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <section className='heading'>
        <p>Clinical Concepts</p>
      </section>

      <section className='content'>
        {concepts.length ? <ul>
          {concepts.map(concept => <li>{concept.description}</li>)}
        </ul> : <h3>There are no concepts</h3>
        }

        <button type='submit' className='btn btn-block' onClick={() => {
          dispatch(conceptActions.reset())
          navigate('/concept/new')
        }}>Add Concept
        </button>
      </section>
    </>
  )
}

export default Dashboard