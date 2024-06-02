import useAlerts from "@/hooks/useAlerts"
import useModal from "@/hooks/useModal"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormState } from "react-dom"
import { AlertType } from "./Alert"
import Modal, { ModalSize } from "./Modal"
import Input from "./Input"
import { useState } from "react"
import BigButton from "./BigButton"
import { updateEmployeeSalary } from "@/api/employee"
import Block from "./Block"
import { EditSalaryModal } from "./EditSalaryModal"
import InfoListItem from "./InfoListItem"
import useEmployeeSalary from "@/hooks/useEmployeeSalary"




export const EmployeeSettingsTab: React.FC<{ employeeId: string }> = ({ employeeId }) => {
    const { showModal } = useModal()
    const { data: salary, isLoading } = useEmployeeSalary({ employeeId })

    return (
        <Block>
            <Block.Header title="Base Pay" />
            <Block.Body>
                <div className='flex-1 flex flex-col p-[5px]'>
                    <InfoListItem
                        name="Amount"
                        value={salary?.toFixed(2)}
                        isLoading={!salary || isLoading}
                        editable={true}
                        onEdit={() => showModal(<EditSalaryModal />)}
                    />
                </div>
            </Block.Body>
        </Block>
    )
}