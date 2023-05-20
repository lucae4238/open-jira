import { useContext, useState } from "react";

import { Box, Button, TextField } from "@mui/material"
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
export const NewEntry = () => {
  const { methods: { addNewEntry } } = useContext(EntriesContext)
  const { methods: { setIsAddingEntry }, isAddingEntry } = useContext(UIContext)


  const [inputValue, setInputValue] = useState("")
  const [isTouched, setIsTouched] = useState(false)

  const handleOpen = () => setIsAddingEntry(true)
  const handleClose = () => {
    setIsAddingEntry(false)
    setIsTouched(false)
    setInputValue("")
  }

  const handleSave = () => {
    if (!inputValue.length) return;

    addNewEntry(inputValue)
    handleClose()
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e?.target?.value)

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ?
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="nueva entrada"
            autoFocus
            multiline
            label="nueva entrada"
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onBlur={() => setIsTouched(true)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
            helperText={inputValue.length <= 0 && isTouched && "ingrese un valor"} />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button onClick={handleClose} variant="text" >Cancelar</Button>
            <Button disabled={inputValue.length <= 0 && isTouched} onClick={handleSave} variant="outlined" color="secondary" endIcon={<SaveAsOutlinedIcon />}>Guardar</Button>
          </Box>
        </>
        :
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={handleOpen}
        >
          Agregar tarea
        </Button>
      }
    </Box>
  )
}
