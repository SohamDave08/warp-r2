import { IconInfoCircle } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { cloneElement, useState } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    tooltip?: string
    label?: string
    error?: string
    icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const { label, tooltip, error, icon, name, disabled } = props

    return (
        <div className='flex flex-col'>
            <div className='relative flex flex-col'>
                {icon && (
                    <div className='absolute flex justify-center items-center w-[60px] h-[60px] ml-[2px] z-10 pointer-events-none'>
                        {cloneElement(icon as JSX.Element, {
                            color: ref && !disabled ? 'black' : '#a3a3a3',
                            size: 24,
                            stroke: 1.5,
                        })}
                    </div>
                )}
                <input className={inputStyle(!!icon, !!error)} ref={ref} placeholder={label} {...props} />
                <label className={labelStyle(!!icon)} htmlFor={name}>
                    {label}
                </label>
                {tooltip && (
                    <div className='absolute top-0 bottom-0 right-0 flex px-[15px]'>
                        <button onClick={() => setIsTooltipOpen(!isTooltipOpen)} type='button'>
                            <IconInfoCircle color='#a3a3a3' size={20} stroke={1.5} />
                        </button>
                    </div>
                )}
                <AnimatePresence>
                    {isTooltipOpen && tooltip && (
                        <motion.div
                            className='absolute flex flex-col bg-white border border-sky-300 rounded-[15px] shadow-tooltip'
                            style={{
                                width: 250,
                                left: '100%',
                                top: 0,
                                originX: 0,
                                originY: 0,
                                translateX: 10,
                            }}
                            initial={{ opacity: 0, x: -5, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -5, scale: 0.9 }}
                            transition={{ ease: 'easeOut', duration: 0.3 }}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: tooltip }}
                                className='text-caption text-left break-words px-[15px] py-[13px]'
                            />
                            <div className='flex flex-col p-[5px] pt-0'>
                                <button
                                    className='text-caption text-center text-sky-500 px-[10px] py-[5px] border border-sky-300 rounded-[10px]'
                                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                                    type='button'
                                >
                                    Dismiss
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {error && <p className='text-caption text-red-500 px-[5px] pt-[10px] pb-[5px]'>{error}</p>}
        </div>
    )
})
Input.displayName = 'Input'

export default Input

const inputStyle = (hasIcon: boolean, hasError: boolean) => {
    return hasIcon
        ? 'peer text-input-1 placeholder-transparent w-full min-h-[60px] pl-[60px] pr-[20px] pt-[28px] bg-white border-0 border-transparent outline-none outline-[1px] outline-offset-0 rounded-[15px] shadow-input transition-default hover:outline-g48 focus:bg-white focus:outline-[1px] focus:outline-offset-0 focus:outline-g48 focus:ring-0 disabled:text-g48 disabled:hover:bg-white disabled:hover:outline-transparent disabled:cursor-not-allowed'
        : 'peer text-input-1 placeholder-transparent w-full min-h-[60px] px-[15px] pt-[28px] bg-white border-0 border-transparent outline-none outline-[1px] outline-offset-0 rounded-[15px] shadow-input transition-default hover:outline-g48 focus:bg-white focus:outline-[1px] focus:outline-offset-0 focus:outline-g48 focus:ring-0 disabled:text-g48 disabled:hover:bg-white disabled:hover:outline-transparent disabled:cursor-not-allowed'
}

const labelStyle = (hasIcon: boolean) => {
    return hasIcon
        ? 'absolute top-[10px] pl-[60px] pr-[20px] text-caption text-g48 peer-focus:top-[9px] peer-focus:text-caption peer-placeholder-shown:top-[20px] peer-placeholder-shown:text-input-1 transition-default pointer-events-none'
        : 'absolute top-[10px] px-[15px] text-caption text-g48 peer-focus:top-[10px] peer-focus:text-caption peer-placeholder-shown:top-[20px] peer-placeholder-shown:text-input-1 transition-default pointer-events-none'
}
