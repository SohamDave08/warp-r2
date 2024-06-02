import { AlertType } from '@/components/Alert'
import { createContext, useContext, useState } from 'react'

type AlertProviderProps = {
    children: React.ReactNode
}

type Alert = {
    message: string
    type: AlertType
    id?: string
    duration?: number // in milliseconds
    noTimeout?: boolean
}

type AlertContextType = {
    pushAlert: (alert: Alert) => void
    pushStandardError: () => void
    popAlert: (alert: Alert) => void
    alerts: Alert[]
}

const AlertContext = createContext<AlertContextType>({
    pushAlert: () => {},
    pushStandardError: () => {},
    popAlert: () => {},
    alerts: [],
})

export const AlertProvider = ({ children = <></> }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<Alert[]>([])

    const pushAlert = (alert: Alert) => {
        alert.id = Math.random().toString()
        setAlerts((alerts) => [...alerts, alert])

        if (!alert.noTimeout) {
            setTimeout(() => {
                setAlerts((alerts) => alerts.filter((a) => a !== alert))
            }, alert.duration || 5000)
        }
    }

    const pushStandardError = () => {
        pushAlert({ message: 'Something went wrong', type: AlertType.Error })
    }

    const popAlert = (alert: Alert) => {
        setAlerts((alerts) => alerts.filter((a) => a !== alert))
    }

    return (
        <AlertContext.Provider value={{ alerts, pushAlert, popAlert, pushStandardError }}>
            {children}
        </AlertContext.Provider>
    )
}

const useAlerts = () => {
    const context = useContext(AlertContext)

    if (!context) {
        throw new Error('No AlertContext found')
    }

    return context
}

export default useAlerts
