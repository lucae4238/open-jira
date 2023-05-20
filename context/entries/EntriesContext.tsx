import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
     entries: Entry[];
     methods: {
          addNewEntry: (description: string) => void
          updateEntry: (value: Entry) => void
     }
}

export const EntriesContext = createContext<ContextProps>({} as ContextProps) 