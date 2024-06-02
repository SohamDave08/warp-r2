import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type ModalProviderProps = {
    children: React.ReactNode
}

type ModalContextType = {
    showModal: (modal: ReactNode, dismissable?: boolean) => void
    closeModal: () => void
    modal: ReactNode
}

const ModalContext = createContext<ModalContextType>({
    showModal: () => {},
    closeModal: () => {},
    modal: null,
})

export const ModalProvider = ({ children = <></> }: ModalProviderProps) => {
    const [modal, showModal] = useState<ReactNode>(null)
    const { pathname } = useRouter()

    const closeModal = () => {
        showModal(null)
    }

    // Close modal when route changes
    useEffect(() => {
        showModal(null)
    }, [pathname])

    return <ModalContext.Provider value={{ modal, showModal: showModal, closeModal }}>{children}</ModalContext.Provider>
}

const useModal = () => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('No ModalContext found')
    }

    return context
}

export default useModal
