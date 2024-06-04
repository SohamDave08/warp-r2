
export const updateEmployeeSalary = async (id: string, salary: number) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: 'POST',
        body: JSON.stringify({ salary }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to update employee salary')
    }
}

export const fetchEmployeeSalary = async (id: string): Promise<number> => {
    const response = await fetch(`/api/employees/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch employee salary')
    }

    const data = await response.json()

    return data.salary
}