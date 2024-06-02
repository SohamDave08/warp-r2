import useAlerts from "@/hooks/useAlerts"
import useModal from "@/hooks/useModal"
import { useMutation } from "@tanstack/react-query"
import { useFormState } from "react-dom"
import { AlertType } from "./Alert"
import Modal, { ModalSize } from "./Modal"
import Input from "./Input"
import { useState } from "react"
import BigButton from "./BigButton"
import { updateEmployeeSalary } from "@/api/employee"




export const EditSalaryModal: React.FC<{
}> = () => {
    const { closeModal } = useModal()
    const { pushAlert } = useAlerts()
    const [newSalary, setNewSalary] = useState<number>(0)

    const salaryMutation = useMutation({
        mutationFn: () => updateEmployeeSalary('1', newSalary),
        onSuccess: () => {
            pushAlert({
                type: AlertType.Confirmation,
                message: `Pay settings updated`,
            })
            closeModal()
        },
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