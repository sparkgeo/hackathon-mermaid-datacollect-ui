// store.js
import React, { createContext, useState } from 'react'

const initialState = {}
const store = createContext(initialState)

const { Provider } = store

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState('hi')

  return <Provider value={{ user, setUser }}>{children}</Provider>
}

export { store, UserContextProvider }
