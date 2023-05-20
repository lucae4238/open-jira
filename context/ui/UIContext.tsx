import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean

  methods: {
    openSideMenu: () => void
    closeSideMenu: () => void

    setIsAddingEntry: (value: boolean) => void

    startDragging: () => void
    endDragging: () => void
  }
}

export const UIContext = createContext<ContextProps>({} as ContextProps)

