import { IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { isValidElement, useEffect } from 'react'
import useModal from '@/hooks/useModal'

export enum ModalSize {
    Small = 'w-[300px]',
    Medium = 'w-[500px]',
    Large = 'w-[700px]',
    ExtraLarge = 'w-[950px]',
}

export interface ModalProps {
    children?: React.ReactNode
    size?: ModalSize
    noClip?: boolean
    isLoading?: boolean
    overrideContent?: boolean
    dismissable?: boolean
}

interface Components {
    Header: typeof Header
    Body: typeof Body
    Loading: typeof Loading
    Footer: typeof Footer
}

const Modal: React.FC<ModalProps> & Components = ({
    children,
    size,
    noClip,
    isLoading,
    overrideContent,
    dismissable = true,
}) => {
    const { closeModal } = useModal()
    const clip = !noClip ? ' overflow-clip' : ''

    if (overrideContent)
        return (
            <>
                {children}
                <motion.div
                    key='modal-backdrop'
                    className='fixed inset-0 z-[200] bg-black/40 backdrop-blur-[5px]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                    onClick={dismissable ? closeModal : () => {}}
                />
            </>
        )

    return (
        <>
            <div className='fixed flex justify-center items-center inset-0 z-[210] pointer-events-none'>
                <motion.div
                    className={`flex flex-col ${size} max-h-[90vh] bg-g94 rounded-[20px] ${clip} pointer-events-auto`}
                    key='modal'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                >
                    {findByType(children, Header)}
                    {isLoading ? findByType(children, Loading) : excludeTypes(children, [Header, Loading])}
                </motion.div>
            </div>
            <motion.div
                key='modal-backdrop'
                className='fixed inset-0 z-[200] bg-black/40 backdrop-blur-[5px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
                onClick={dismissable ? closeModal : () => {}}
            />
        </>
    )
}

const Header: React.FC<{
    title: string
    onClose?: () => void
    compact?: boolean
}> = ({ title, onClose, compact }) => {

    if (compact)
        return (
            <div className='flex justify-between items-center min-h-[60px] pl-[15px] pr-[10px]'>
                <h3 className='flex-1'>{title}</h3>
                {onClose && (
                    <button
                        className='group flex items-center justify-center w-[40px] h-[40px] rounded-[10px] transition-default hover:bg-g88'
                        onClick={onClose}
                        type='button'
                    >
                        <IconX
                            className='transition-all duration-300 ease-out group-hover:stroke-black'
                            color='#a3a3a3'
                            size={24}
                            stroke={1.5}
                        />
                    </button>
                )}
            </div>
        )

    return (
        <div className='relative flex flex-col p-[50px]'>
            <h1 className='text-center whitespace-pre-line'>{title}</h1>
            {onClose && (
                <button
                    className='group absolute top-[5px] right-[5px] flex items-center justify-center w-[40px] h-[40px] rounded-[15px] transition-default hover:bg-g88'
                    onClick={onClose}
                    type='button'
                >
                    <IconX
                        className='transition-all duration-300 ease-out group-hover:stroke-black'
                        color='#a3a3a3'
                        size={24}
                        stroke={1.5}
                    />
                </button>
            )}
        </div>
    )
}
Header.displayName = 'Header'
Modal.Header = Header

const Body: React.FC<{ noClip?: boolean; children: React.ReactNode }> = ({ noClip, children }) => {
    const scroll = !noClip ? ' overflow-auto' : ''

    return <div className={'flex flex-col' + scroll}>{children}</div>
}
Body.displayName = 'Body'
Modal.Body = Body

const Loading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='flex flex-col overflow-auto'>{children}</div>
}
Loading.displayName = 'Loading'
Modal.Loading = Loading

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='flex flex-col p-[10px]'>{children}</div>
}
Footer.displayName = 'Footer'
Modal.Footer = Footer

export default Modal

export function findByType<T extends React.FC<any>>(
    children: React.ReactNode,
    componentType: T,
): Array<React.ReactElement<React.ComponentProps<T>>> {
    const filteredChildren: Array<React.ReactElement<React.ComponentProps<T>>> = []
    React.Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === componentType) {
            filteredChildren.push(child as React.ReactElement<React.ComponentProps<T>>)
        } else if (
            isValidElement(child) &&
            child.type === React.Fragment &&
            ((child.props as any).children as React.ReactNode)
        ) {
            filteredChildren.push(...findByType((child.props as any).children, componentType))
        }
    })
    return filteredChildren
}

export function excludeTypes<T extends React.FC<any>>(
    children: React.ReactNode,
    excludedTypes: T[],
): Array<React.ReactElement<React.ComponentProps<T>>> {
    const filteredChildren: Array<React.ReactElement<React.ComponentProps<T>>> = []
    React.Children.forEach(children, (child) => {
        if (isValidElement(child) && !excludedTypes.some((type) => child.type === type)) {
            filteredChildren.push(child as React.ReactElement<React.ComponentProps<T>>)
        }
    })
    return filteredChildren
}