import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

import { Entry } from '@/interfaces';

import { entriesApi } from '@/apis';
import { IEntry } from '@/models';


export interface EntriesState {
  entries: Entry[];

}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
  ]
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {


  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    try {

      const { data } = await entriesApi.post<Entry>("/entries", {
        description
      })
      dispatch({ type: "[Entry] Add=Entryj", payload: data })
    } catch (error) {
      console.error('error', error)
    }

  }

  const updateEntry = async ({ description, _id, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: "[Entry] Entry=Updated", payload: data })

    } catch (error) {
      console.log('error', error)

    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const response = await entriesApi.post(`/entries/${id}`) 
      dispatch({type: "[Entry] Delete=Entry", payload: id})
    } catch (error) {
      console.log('error', error)
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries")
    dispatch({ type: "[Entry] Refresh=data", payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])


  return (
    <EntriesContext.Provider value={{
      ...state,

      // Mehthods
      methods: {
        addNewEntry,
        deleteEntry, 
        updateEntry
      }
    }}>
      {children}
    </EntriesContext.Provider>
  )
}