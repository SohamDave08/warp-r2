/**
 * @fileoverview API route for setting the current app
 */

import createApiClient from '@/utils/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function employee_index(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = createApiClient(req, res)
        const employeeId = req.query.employeeId as string

        if (req.method === 'PATCH') {
            await client.from('employees').update({ salary: req.body.salary }).match({ id: employeeId })

            res.status(200).json({ message: 'success' })
        } else if (req.method == 'GET') {
            const { data, error } = await client
                .from('employees')
                .select('*')
                .eq('id', employeeId)
                .single()

            res.status(200).json({ salary: data.salary })
        } else if (req.method == 'DELETE') {

        } else {
            res.status(405).json({ error: 'Method not allowed' })
            return
        }
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ error: error.message })
    }
}
