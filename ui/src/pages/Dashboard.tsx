import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useQuery } from "react-query";
import { query_keys } from "../utils";
import { conceptService } from "../services/conceptService";
import { Concept } from "../types";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {user} = useSelector((state: RootState) => state.auth)
  const {
    data: concepts = [],
    isLoading,
    isError,
    error
  } = useQuery<Concept[]>(query_keys.concepts, conceptService.getAll)

  useEffect(() => {
    if (isError) {
      console.log(error)
    }

    if (!user) {
      navigate('/login')
    }
  }, [user, navigate, isError, dispatch])

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
          navigate('/concept/new')
        }}>Add Concept
        </button>
      </section>
    </>
  )
}

export default Dashboard