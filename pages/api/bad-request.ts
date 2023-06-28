import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean,
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const message = req.query.message as string|| 'Bad request' 

  res.status(400).json({
    ok: false, 
    message
  })
}