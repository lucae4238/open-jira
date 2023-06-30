import { db } from '@/database'
import EntryModel, { IEntry } from '@/models/Entry'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "El id no es valido " + id })
  }


  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)

    case 'POST':
      return deleteEntry(req, res)

    case 'GET':
      return findEntry(req, res)

    default:
      res.status(200).json({ message: 'Metodo no existe' })
      break;
  }


  res.status(200).json({ message: 'Example' + id })
}

const findEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  try {
    await db.connect()

    const entry = await EntryModel.findById(id)

    await db.disconnect()

    res.status(200).json(entry!)

  } catch (error) {
    await db.disconnect()
    console.log('error', error)
    res.status(400).json({ message: JSON.stringify(error) })

  }
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query

  await db.connect()
  const entryToUpdate = await EntryModel.findById(id)

  if (!entryToUpdate) {
    await db.disconnect()
    res.status(400).json({ message: 'No hay entrada con ese id' + id })
  }

  const {
    description = entryToUpdate!.description,
    status = entryToUpdate!.status
  } = req.body

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })

    res.status(200).json(updatedEntry!)

    await db.disconnect()
  } catch (error: any) {
    res.status(400).json({ message: error.errors.status.message })
    await db.disconnect()

  }

}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
try {
  const { id } = req.query

  await db.connect()

  const entryToUpdate = await EntryModel.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    res.status(400).json({ message: 'No hay entrada con ese id' + id })
  }

  await EntryModel.findByIdAndDelete(id)

  await db.disconnect()
  res.status(200).json({message: "Documento borrado exitosamente"})
  
} catch (error:any) {
    res.status(400).json({ message: error.errors.status.message })
    await db.disconnect()
}

}