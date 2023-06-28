import type { NextApiRequest, NextApiResponse } from 'next'

import { db, seedData } from '@/database'
import EntryModel from '@/models/Entry'

type Data = {
  message: string
}

// Este endpoint sirve para limpiar y llenar la base de datos con informacion por default, no deberia de subirse este endpoint a produccion

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('entara')


  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio" })
  }

  await db.connect();
  // hasta disconnnect podemos hhacer cualquier cosa a la db

  await EntryModel.deleteMany() //!sin condiciones se borra todo

  await EntryModel.insertMany(seedData.entries)

  await db.disconnect()

  res.status(200).json({ message: 'proceso realizado correctametn' })
}