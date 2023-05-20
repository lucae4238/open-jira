import { FC, useContext, useMemo, DragEvent } from "react"

import { EntryStatus } from "@/interfaces"
import { EntriesContext } from "@/context/entries"
import { UIContext } from "@/context/ui"

import { List, Paper } from "@mui/material"
import { EntryCard } from "."

import styles from "./EmtryList.module.css"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, methods: { updateEntry } } = useContext(EntriesContext)
  const { isDragging, methods: { endDragging } } = useContext(UIContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entriesByStatus = useMemo(() => entries.filter(item => item.status === status), [entries])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDropEntry = (event: DragEvent<HTMLDivElement>) => {
    console.log('event', event)
    const id = event.dataTransfer.getData("text")
    console.log('id', id)

    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status
    updateEntry(entry)
    endDragging()

  }

  return (
    <div onDragOver={allowDrop} className={isDragging ? styles.dragging : ""} onDrop={handleDropEntry}>
      <Paper sx={{ height: "calc(100vh - 250px)", overflowY: "auto", backgroundColor: "transparent", padding: "1px 5px" }}>
        {/* cambiar opacidad ondrag */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, padding: 0.5, paddingTop: 2, transition: "all .3s" }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
