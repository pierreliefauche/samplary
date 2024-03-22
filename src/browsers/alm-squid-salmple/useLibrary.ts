import { createContext, useContext } from 'react'
import { Library } from './types'
import { MOCK_LIBRARY } from './utils'

type LibraryContextValue = [Readonly<Library>]

const LibraryContext = createContext<LibraryContextValue>([MOCK_LIBRARY])

export const Provider = LibraryContext.Provider

export const useLibrary = (): LibraryContextValue => useContext(LibraryContext)
