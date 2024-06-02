import { fetchEmployeeSalary } from '@/api/employee'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export interface UseEmployeeSalaryProps {
    employeeId?: string
    initialData?: number
}

export const employeeQueryKey = (employeeId?: string) => ['employee', employeeId]

/**
 * A custom hook that handles form state and validation
 * @param initialFormData
 * @param validate
 * @returns
 */
// maybe change this to useFormData
const useEmployeeSalary = ({ employeeId = '', initialData }: UseEmployeeSalaryProps): UseQueryResult<number, Error> => {
    return useQuery<number, Error>({
        queryKey: employeeQueryKey(employeeId),
        queryFn: async () => {
            return fetchEmployeeSalary(employeeId)
        },
        staleTime: 1000 * 60 * 10, // 5 minutes,
        initialData,
        enabled: !!employeeId,
    })
}

export default useEmployeeSalary
