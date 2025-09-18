import { NextApiRequest, NextApiResponse } from 'next';
import { generateFrag } from '@/lib/generateFragFromAI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Invalid prompt' });
      return;
    }

    const fragCode = await generateFragFromAI(prompt);
    res.status(200).json({ fragCode });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate fragment code' });
  }
}
