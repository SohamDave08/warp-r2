import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { cloneElement } from 'react'
import { findByType } from './Modal'

interface BlockProps {
    children?: React.ReactNode
    isEmpty?: boolean
    isLoading?: boolean
}

interface Components {
    Header: typeof Header
    Status: typeof Status
    Help: typeof Help
    Actions: typeof Actions
    Button: typeof Button
    TextButton: typeof TextButton
    Body: typeof Body
    Loading: typeof Loading
    Empty: typeof Empty
}

const Block: React.FC<BlockProps> & Components = ({ children, isEmpty, isLoading }) => {
    return (
        <div className='flex-1 flex flex-col bg-white rounded-[15px]'>
            {findByType(children, Header)}
            {isLoading
                ? findByType(children, Loading)
                : isEmpty
                    ? findByType(children, Empty)
                    : findByType(children, Body)}
        </div>
    )
}

const Header: React.FC<{
    title: string
    icon?: JSX.Element
    children?: React.ReactNode
}> = ({ title, icon, children }) => {
    return (
        <>
            <div className='flex flex-row items-center min-h-[50px]'>
                {icon ? (
                    <div className='flex items-center justify-center pl-[3px] w-[50px] h-[50px]'>
                        {icon && cloneElement(icon, { size: 24, stroke: 1.75 })}
                    </div>
                ) : (
                    <div className='w-[15px]' />
                )}
                <div className='flex-1 flex items-center gap-[10px]'>
                    <h4>{title}</h4>
                    {findByType(children, Status)}
                </div>
                <div className='flex items-center gap-[5px] px-[7px]'>
                    {findByType(children, Help)}
                    {findByType(children, Button).length > 0 && (
                        <div className='flex items-center gap-[5px]'>{findByType(children, Button)}</div>
                    )}
                    {findByType(children, TextButton).length > 0 && (
                        <div className='flex items-center gap-[5px]'>{findByType(children, TextButton)}</div>
                    )}
                </div>
            </div >
        </>
    )
}
Header.displayName = 'Header'
Block.Header = Header

const Status: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <>{children}</>
}
Status.displayName = 'Status'
Block.Status = Status

const Help: React.FC<{
    text?: string
    compact?: boolean
    isLoading?: boolean
}> = ({ text, isLoading }) => {
    if (isLoading)
        return (
            <div className='flex items-center justify-center px-[10px] h-[36px] rounded-[10px] animate-pulse'>
                <div className='w-[100px] h-[15px] bg-g94 rounded-[5px]' />
            </div>
        )

    return (
        <div className='flex items-center justify-center px-[10px] h-[36px] rounded-[10px] text-caption text-g48'>
            {text}
        </div>
    )
}
Help.displayName = 'Help'
Block.Help = Help

const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className='h-[1px] bg-g94' />
            <div className='flex items-center justify-end p-[7px]'>
                {findByType(children, Button).length > 0 && (
                    <div className='flex items-center gap-[5px]'>{findByType(children, Button)}</div>
                )}
                {findByType(children, TextButton).length > 0 && (
                    <div className='flex items-center gap-[5px]'>{findByType(children, TextButton)}</div>
                )}
            </div>
            <div className='h-[1px] bg-g94' />
        </>
    )
}
Actions.displayName = 'Actions'
Block.Actions = Actions

const Button: React.FC<{ icon: JSX.Element, link?: string, onClick?: Function }> = ({ icon, link, onClick }) => {
    if (link || !onClick) {
        return (
            <Link
                className='flex items-center justify-center size-[36px] bg-white border border-g88 box-border rounded-[10px] shadow-button transition-default hover:border-g48 active:bg-g92 active:border-g48'
                href={link ?? ''}
            >
                {icon && cloneElement(icon, { color: 'black', size: 18, stroke: 1.5 })}
            </Link>
        )
    }
    return (
        <button
            className='flex items-center justify-center size-[36px] bg-white border border-g88 box-border rounded-[10px] shadow-button transition-default hover:border-g48 active:bg-g92 active:border-g48'
            onClick={() => onClick()}
            type='button'
        >
            {icon && cloneElement(icon, { color: 'black', size: 18, stroke: 1.5 })}
        </button>
    )
}
Button.displayName = 'Button'
Block.Button = Button

const TextButton: React.FC<{
    label: string
    style?: ButtonStyle
    onClick?: Function
    shortcut?: string
    disabled?: boolean
    isLoading?: boolean
}> = ({ label, style, onClick, shortcut, disabled, isLoading }) => {


    if (isLoading)
        return (
            <div className='relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Image src={'/warp-symbol@512w.webp'} alt='Loading spinner' width={15} height={15} />
                    </motion.div>
                </div>
                <div className={getButtonStyle(style, disabled, isLoading)}>
                    <div className='flex px-[3px]'>{label}</div>
                </div>
            </div>
        )

    return (
        <button className={getButtonStyle(style, disabled, isLoading)} onClick={() => onClick && onClick()}>
            <div className='flex px-[3px]'>{label}</div>
        </button>
    )
}
TextButton.displayName = 'TextButton'
Block.TextButton = TextButton

const getButtonStyle = (type?: ButtonStyle, disabled?: boolean, isLoading?: boolean) => {
    if (disabled)
        return 'flex-initial flex items-center justify-center text-button-2 text-g64 px-[10px] h-[36px] bg-white border border-g94 box-border rounded-[10px] shadow-button'
    if (isLoading)
        return 'flex-initial flex items-center justify-center text-button-2 text-transparent px-[10px] h-[36px] bg-white border border-g94 box-border rounded-[10px] shadow-button'

    switch (type) {
        case ButtonStyle.Main:
            return 'flex-initial flex items-center justify-center text-button-2 font-medium text-white px-[10px] h-[36px] bg-black bg-button-shine rounded-[10px] shadow-main-button transition-default hover:brightness-125'
        default:
            return 'flex-initial flex items-center justify-center text-button-2 px-[10px] h-[36px] bg-white border border-g88 box-border rounded-[10px] shadow-button transition-default hover:border-g48 active:bg-g92 active:border-g48'
    }
}


const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='flex-1 flex flex-col'>{children}</div>
}
Body.displayName = 'Body'
Block.Body = Body

const Loading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='flex-1 flex flex-col'>{children}</div>
}
Loading.displayName = 'Loading'
Block.Loading = Loading

const Empty: React.FC<{ icon: JSX.Element; title: string; text: string }> = ({ icon, title, text }) => {
    return (
        <div className='flex-1 flex flex-col items-center justify-center gap-[15px] p-[20px] min-h-[200px]'>
            {icon && cloneElement(icon, { color: '#a3a3a3', size: 40, stroke: 1.5 })}
            <div className='flex flex-col gap-[3px]'>
                <h4 className='text-center'>{title}</h4>
                <div className='text-caption text-center whitespace-pre-line text-g48'>{text}</div>
            </div>
        </div>
    )
}
Empty.displayName = 'Empty'
Block.Empty = Empty

export default Block

export enum ButtonStyle {
    Main = 'main',
    Secondary = 'secondary',
    Approve = 'approve',
    Reject = 'reject',
}