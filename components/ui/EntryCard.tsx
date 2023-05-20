import { UIContext } from "@/context/ui"
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from "react"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  
  const { methods: {startDragging, endDragging}} = useContext(UIContext)
  
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    //TODO modificar estado para indicar que estoy haciendo drag
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }

  const handleDragEnd = () => {
    //todo cancelar on drag
    endDragging()
  }
  
  return (
    <Card sx={{ marginBottom: 1 }}
    draggable
    onDragStart={(event: DragEvent<HTMLDivElement>) => handleDragStart(event)}
    onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
