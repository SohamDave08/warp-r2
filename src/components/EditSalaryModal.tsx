import useAlerts from "@/hooks/useAlerts"
import useModal from "@/hooks/useModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormState } from "react-dom"
import { AlertType } from "./Alert"
import Modal, { ModalSize } from "./Modal"
import Input from "./Input"
import { useState, useEffect } from "react"
import BigButton from "./BigButton"
import { updateEmployeeSalary } from "@/api/employee"
import {employeeQueryKey} from "@/hooks/useEmployeeSalary"

interface EditSalaryModalProps {
    salary: number;
}

export const EditSalaryModal: React.FC<EditSalaryModalProps> = ({salary}) => {
    const { closeModal } = useModal()
    const { pushAlert } = useAlerts()
    const [newSalary, setNewSalary] = useState<number>(salary)
    const queryClient = useQueryClient()
    const salaryMutation = useMutation({
        mutationFn: () => updateEmployeeSalary('1', newSalary),
        onSuccess: () => {
            queryClient.invalidateQueries(employeeQueryKey('1'));
            pushAlert({
                type: AlertType.Confirmation,
                message: `Pay settings updated`,
            })
            closeModal()
        },
        onError: () => {
            pushAlert({
                type: AlertType.Error,
                message: 'Error updating Salary',
            })
            closeModal()
        }
    })


    const handleHtmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSalary(Number(e.target.value))
    }

    return (
        <Modal size={ModalSize.Medium} noClip>
            <Modal.Header
                title={`Edit Khal's Pay`}
                onClose={closeModal}
            />
            <Modal.Body noClip>
                <div className='flex flex-col gap-[10px] px-[15px] pb-[20px]'>
                    <Input
                        value={newSalary}
                        name='amount'
                        label='Pay Rate'
                        type='number'
                        onChange={handleHtmlChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <BigButton label='Update' onClick={salaryMutation.mutate} disabled={!newSalary} isLoading={salaryMutation.isLoading} />
            </Modal.Footer>
        </Modal>
    )
}