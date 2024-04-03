import { createContext, useContext } from 'react'
import { MOCK_LIBRARY } from './utils'
import { Library } from '../types'

type LibraryContextValue = [Readonly<Library>]

const LibraryContext = createContext<LibraryContextValue>([MOCK_LIBRARY])

export const Provider = LibraryContext.Provider

export const useLibrary = (): LibraryContextValue => useContext(LibraryContext)
