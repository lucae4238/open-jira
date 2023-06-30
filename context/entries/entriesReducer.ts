import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: '[Entry] Add=Entryj', payload: Entry }
  | { type: '[Entry] Entry=Updated', payload: Entry }
  | { type: '[Entry] Refresh=data', payload: Entry[] }
  | { type: '[Entry] Delete=Entry', payload: string }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {


  switch (action.type) {
    case "[Entry] Refresh=data":
      return {
        ...state,
        entries: [...action.payload]
      }
    case "[Entry] Add=Entryj":
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
    case "[Entry] Delete=Entry":
      return {
        ...state, 
        entries: [...state.entries].filter(item => item._id !== action.payload)
      }
    case "[Entry] Entry=Updated":
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            // entry.status = action.payload.status
            // entry.description = action.payload.description
            return action.payload
          }
          return entry
        })
      }
    default:
      return state
  }


}