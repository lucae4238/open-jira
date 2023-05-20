import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

import { Entry } from '@/interfaces';

import { v4 as uuidv4 } from 'uuid';


export interface EntriesState {
  entries: Entry[];

}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "P lorem ipsum",
      status: "pending",
      createdAt: Date.now()
    }, {
      _id: uuidv4(),
      description: "IP: lorem ipsum",
      status: "in-progress",
      createdAt: Date.now() - 100000
    }, {
      _id: uuidv4(),
      description: "F lorem ipsum",
      status: "finished",
      createdAt: Date.now() - 1000000
    },
  ]
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {


  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {

    const newEntry: Entry = {
      description,
      _id: uuidv4(),
      createdAt: Date.now(),
      status: 'pending'
    }

    dispatch({ type: "[Entry] Add=Entryj", payload: newEntry })

  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] Entry=Updated", payload: entry })
  }

  return (
    <EntriesContext.Provider value={{
      ...state,

      // Mehthods
      methods: {
        addNewEntry,
        updateEntry
      }
    }}>
      {children}
    </EntriesContext.Provider>
  )
}