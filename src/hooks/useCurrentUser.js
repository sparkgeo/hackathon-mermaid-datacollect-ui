import { useContext } from 'react'
import { store } from '../context/UserContext'

function useCurrentUser() {
  const { user, setUser } = useContext(store)

  return { user, setUser }
}

export default useCurrentUser
