import { FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'

import { Layout } from "@/components/layouts"
import { Entry, EntryStatus } from "@/interfaces";

import { dbEntries } from "@/database";

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, Snackbar, Alert } from "@mui/material"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { dateFunctions } from "@/utils";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()


  const { methods: { updateEntry, deleteEntry } } = useContext(EntriesContext)

  const isValid = useMemo(() => {
    return inputValue && touched
  }, [touched, inputValue])


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e?.target?.value)

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value as EntryStatus)

  const onSave = () => {
    if (!inputValue.trim().length) return;
    updateEntry({
      ...entry,
      status,
      description: inputValue
    })
    setIsOpen(true)
  }

  const onDelete = async () => {
    await deleteEntry(entry._id)
    router.replace("/")
    
  }


  return (
    <Layout title={inputValue.substr(0, 20) + "..."}>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      // message="Nota Actualizada correctamente"
      // action={action}
      >
        <Alert severity="success">Nota Actualizada correctamente</Alert>
      </Snackbar>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} m={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada hace: ${dateFunctions.getFormatDistanceFromNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                placeholder="Nueva entrada"
                label="Actualizar entrada"

                autoFocus
                fullWidth
                multiline
                sx={{ marginTop: 2, marginBottom: 1 }}
                helperText={!isValid ? "Ingrese un valor" : ""}
                error={!isValid}

                value={inputValue}

                onChange={onInputChange}
                onBlur={() => setTouched(true)}
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChange}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>


            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAsIcon />}
                variant="contained"
                fullWidth
                disabled={!inputValue}
                onClick={onSave}
              >

              </Button>

            </CardActions>


          </Card>
        </Grid>

      </Grid>

      <IconButton onClick={onDelete} sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}>
        <DeleteIcon />
      </IconButton>

    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }



  return {
    props: {
      entry
    }
  }
}

export default EntryPage