import { UIContext } from "@/context/ui"
import { Entry } from "@/interfaces"
import { dateFunctions } from "@/utils"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { DragEvent, FC, useContext } from "react"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  
  const { methods: {startDragging, endDragging}} = useContext(UIContext)
  
  const router = useRouter()
  
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    //TODO modificar estado para indicar que estoy haciendo drag
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }


  const handleDragEnd = () => {
    //todo cancelar on drag
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }
  
  return (
    <Card sx={{ marginBottom: 1 }}
    draggable
    onClick={onClick}
    onDragStart={(event: DragEvent<HTMLDivElement>) => handleDragStart(event)}
    onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}>
          <Typography variant="body2">Hace {dateFunctions.getFormatDistanceFromNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
