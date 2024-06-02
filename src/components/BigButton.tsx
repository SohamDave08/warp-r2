import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, cloneElement } from 'react'
import { ButtonStyle } from './Block'

export interface BigButtonProps {
    label?: string
    icon?: JSX.Element
    style?: ButtonStyle
    link?: string
    newTab?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    shortcut?: string
    disabled?: boolean
    isLoading?: boolean
}

const BigButton: React.FC<BigButtonProps> = ({
    label,
    icon,
    style: style,
    link,
    newTab,
    onClick,
    type = 'button',
    shortcut,
    disabled,
    isLoading,
}) => {

    const handleClick: MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        !link && onClick && e.preventDefault()
        onClick && onClick()
    }

    if (isLoading)
        return (
            <div className='relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ ease: 'linear', duration: 0.4, repeat: Infinity }}
                    >
                        <Image src={'/spinner.webp'} alt='Loading spinner' width={20} height={20} />
                    </motion.div>
                </div>
                <div className={getButtonStyle(style, disabled, isLoading)}>
                    {icon && (
                        <div className='flex pr-[2px]'>
                            {cloneElement(icon, {
                                color: getIconColor(style, disabled, isLoading),
                                size: 18,
                                stroke: getIconStroke(style, disabled, isLoading),
                            })}
                        </div>
                    )}
                    {label && <div className='flex px-[3px]'>{label}</div>}
                </div>
            </div>
        )

    if (link)
        return (
            <Link
                className={getButtonStyle(style, disabled, isLoading)}
                href={link}
                target={newTab ? '_blank' : '_self'}
                type={type}
            >
                {icon && (
                    <div className='flex pr-[2px]'>
                        {cloneElement(icon, {
                            color: getIconColor(style, disabled, isLoading),
                            size: 18,
                            stroke: getIconStroke(style, disabled, isLoading),
                        })}
                    </div>
                )}
                {label && <div className='flex px-[3px]'>{label}</div>}
            </Link>
        )

    return (
        <button
            className={getButtonStyle(style, disabled, isLoading)}
            onClick={handleClick}
            disabled={disabled || isLoading}
            type={type}
        >
            {icon && (
                <div className='flex pr-[2px]'>
                    {cloneElement(icon, {
                        color: getIconColor(style, disabled, isLoading),
                        size: 18,
                        stroke: getIconStroke(style, disabled, isLoading),
                    })}
                </div>
            )}
            {label && <div className='flex px-[3px]'>{label}</div>}
        </button>
    )
}

export default BigButton

const getButtonStyle = (type?: ButtonStyle, disabled?: boolean, isLoading?: boolean) => {
    if (isLoading)
        return 'flex-initial flex items-center justify-center text-button-1 text-transparent px-[10px] h-[40px] bg-white border border-g94 box-border rounded-[10px] shadow-button'
    if (disabled)
        return 'flex-initial flex items-center justify-center text-button-1 text-g64 px-[10px] h-[40px] bg-white border border-g88 box-border rounded-[10px] shadow-button'

    switch (type) {
        case ButtonStyle.Main:
            return 'flex-initial flex items-center justify-center text-button-1 font-medium text-white px-[10px] h-[40px] bg-black bg-button-shine rounded-[10px] shadow-main-button transition-default hover:brightness-125'
        case ButtonStyle.Secondary:
            return 'flex-initial flex items-center justify-center text-button-1 px-[10px] h-[40px] bg-white border border-g88 box-border rounded-[10px] shadow-button transition-default hover:border-g48 active:bg-g92 active:border-g48'
        case ButtonStyle.Approve:
            return 'flex-initial flex items-center justify-center text-button-1 font-medium text-white px-[10px] h-[40px] bg-green-500 bg-button-shine-approve bg-blend-overlay rounded-[10px] shadow-main-button shadow-input transition-default hover:brightness-[1.1]'
        case ButtonStyle.Reject:
            return 'flex-initial flex items-center justify-center text-button-1 text-red-600 px-[10px] h-[40px] bg-white border border-g88 box-border rounded-[10px] shadow-button transition-default hover:border-red-500 active:bg-red-50 active:border-red-500'
        default:
            return 'flex-initial flex items-center justify-center text-button-1 font-medium text-white px-[10px] h-[40px] bg-black bg-button-shine rounded-[10px] shadow-main-button transition-default hover:brightness-125'
    }
}

const getIconColor = (type?: ButtonStyle, disabled?: boolean, isLoading?: boolean) => {
    if (isLoading) return 'transparent'
    if (disabled) return '#a3a3a3'

    switch (type) {
        case ButtonStyle.Secondary:
            return 'black'
        case ButtonStyle.Reject:
            return '#ef4444'
        default:
            return 'white'
    }
}

const getIconStroke = (type?: ButtonStyle, disabled?: boolean, isLoading?: boolean) => {
    if (isLoading) return 2
    if (disabled) return 1.75

    switch (type) {
        case ButtonStyle.Secondary:
        case ButtonStyle.Reject:
            return 1.75
        default:
            return 2
    }
}
