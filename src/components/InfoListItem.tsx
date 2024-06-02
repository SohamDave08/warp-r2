import useAlerts from '@/hooks/useAlerts'
import { IconCopy, IconExternalLink, IconEyeOff, IconEye, IconEdit } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { AlertType } from './Alert'

interface InfoListItemNewProps {
    name?: string
    value?: string | string[] | (string | undefined)[]
    info?: string
    link?: boolean
    hidden?: boolean
    noCopy?: boolean
    disabled?: boolean
    editable?: boolean
    onEdit?: () => void
    isLoading?: boolean
}

const InfoListItem: React.FC<InfoListItemNewProps> = ({
    name,
    value,
    link,
    hidden,
    noCopy,
    disabled,
    onEdit,
    editable,
    isLoading,
}) => {
    if (!name || isLoading)
        return (
            <li className='group flex items-center gap-[15px] p-[5px] min-h-[50px] animate-pulse'>
                <div className='flex-1 px-[10px] py-[5px] text-list-2 text-g48'>
                    <div className='h-[20px] bg-g94 rounded-[5px] group-odd:w-2/3 group-even:w-1/2' />
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='w-full h-[40px] bg-g94 rounded-[10px]' />
                </div>
            </li>
        )

    if (disabled)
        return (
            <li className='flex items-center gap-[15px] p-[5px] min-h-[50px]'>
                <div className='flex-1 px-[10px] py-[5px] text-list-2 text-g48'>{name}</div>
                <div className='flex-1 flex flex-col'>
                    <InfoTextField
                        label={name}
                        text={value ?? ''}
                        link={link}
                        hidden={hidden}
                        noCopy={noCopy}
                        disabled={disabled}
                        onEdit={editable ? onEdit : undefined}
                    />
                </div>
            </li>
        )

    return (
        <li className='flex items-center gap-[15px] p-[5px] min-h-[50px]'>
            <div className='flex-1 px-[10px] py-[5px] text-list-2'>{name}</div>
            <div className='flex-1 flex flex-col'>
                <InfoTextField
                    label={name}
                    text={value ?? ''}
                    link={link}
                    hidden={hidden}
                    noCopy={noCopy}
                    onEdit={editable ? onEdit : undefined}
                />
            </div>
        </li>
    )
}

export default InfoListItem



export interface InfoTextFieldProps {
    label: string
    text?: string | string[] | (string | undefined)[]
    link?: boolean
    hidden?: boolean
    visibleCharacters?: number
    noCopy?: boolean
    disabled?: boolean
    onEdit?: () => void
}

const InfoTextField: React.FC<InfoTextFieldProps> = ({
    label,
    text,
    link,
    hidden,
    visibleCharacters,
    noCopy,
    disabled,
    onEdit,
}) => {
    const { pushAlert } = useAlerts()

    const [showTooltip, setShowTooltip] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    let characters = visibleCharacters ? visibleCharacters : 4
    const toggleVisible = () => {
        setIsVisible(!isVisible)
    }

    const copyToClipboard = () => {
        if (text instanceof Array) {
            const string = text.filter((value) => value).join(', ')
            navigator.clipboard.writeText(string)
        } else if (text) {
            navigator.clipboard.writeText(text)
        }

        pushAlert({
            message: `${label} copied to clipboard`,
            type: AlertType.Confirmation,
        })
    }

    if (!text || disabled)
        return (
            <div className='flex flex-row items-stretch gap-[5px]'>
                <div className='flex-1 flex flex-row items-center text-g48 px-[13px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default select-none cursor-not-allowed'>
                    <div className='flex-1 text-input-2 text-left'>{text ? text : '—'}</div>
                </div>
                {onEdit && <EditButton onClick={onEdit} />}
            </div>
        )

    if (text && text instanceof Array)
        return (
            <div className='flex flex-row items-stretch gap-[5px]'>
                <div className='flex-1 relative flex flex-col'>
                    <AnimatePresence>{text && !noCopy && showTooltip && <CopyTooltip />}</AnimatePresence>
                    <button
                        className='flex flex-row items-center gap-[5px] px-[13px] py-[10px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default hover:bg-g94'
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={!noCopy ? copyToClipboard : () => { }}
                        type='button'
                    >
                        <div className='flex-1 flex flex-col text-input-2 text-left'>
                            {text.map((value, index) => (
                                <div key={index}>{value}</div>
                            ))}
                        </div>
                    </button>
                </div>
                {onEdit && <EditButton onClick={onEdit} />}
            </div>
        )

    if (link)
        return (
            <div className='flex flex-row items-stretch gap-[5px]'>
                <div className='flex-1 relative flex flex-col'>
                    <AnimatePresence>{text && !noCopy && showTooltip && <LinkTooltip />}</AnimatePresence>
                    <Link
                        className='flex flex-row items-center gap-[5px] px-[13px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default hover:bg-g94'
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        href={formatLink(text)}
                        target='_blank'
                    >
                        <div className='flex-1 text-input-2 text-left'>{text ? text : '—'}</div>
                    </Link>
                </div>
                {onEdit && <EditButton onClick={onEdit} />}
            </div>
        )

    return (
        <div className='flex flex-row items-stretch gap-[5px]'>
            <div className='flex-1 relative flex flex-col'>
                <AnimatePresence>{text && !noCopy && showTooltip && <CopyTooltip />}</AnimatePresence>
                <button
                    className='flex flex-row items-center gap-[5px] px-[13px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default hover:bg-g96'
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={text && !noCopy ? copyToClipboard : () => { }}
                    type='button'
                >
                    <div className='flex-1 text-input-2 text-left'>
                        {hidden
                            ? isVisible
                                ? text
                                : text.slice(0, -characters).replace(/\d/g, '*') + text.slice(-characters)
                            : text}
                    </div>
                </button>
            </div>
            {hidden && <RevealButton isVisible={isVisible} onClick={toggleVisible} />}
            {onEdit && <EditButton onClick={onEdit} />}
        </div>
    )
}


const formatLink = (link: string) => {
    if (!link) return ''
    if (!link.startsWith('http://') && !link.startsWith('https://')) return 'https://' + link
    return link
}

const CopyTooltip: React.FC = () => {
    return (
        <motion.div
            className='absolute z-10 flex flex-row items-center gap-[5px] px-[7px] py-[3px] bg-white rounded-[10px] shadow-tooltip pointer-events-none'
            style={{
                right: 7,
                top: '50%',
                originX: 1,
                originY: 0.5,
                translateY: '-50%',
            }}
            initial={{ opacity: 0, x: 5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 5, scale: 0.9 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
        >
            <IconCopy color='#A3A3A3' size={16} stroke={1.5} />
            <div className='text-caption'>Copy</div>
        </motion.div>
    )
}

const LinkTooltip: React.FC = () => {
    return (
        <motion.div
            className='absolute z-10 flex flex-row items-center gap-[5px] px-[7px] py-[3px] bg-white rounded-[10px] shadow-tooltip pointer-events-none'
            style={{
                right: 7,
                top: '50%',
                originX: 1,
                originY: 0.5,
                translateY: '-50%',
            }}
            initial={{ opacity: 0, x: 5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 5, scale: 0.9 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
        >
            <IconExternalLink color='#A3A3A3' size={16} stroke={1.5} />
            <div className='text-caption'>Open</div>
        </motion.div>
    )
}

const RevealButton: React.FC<{ isVisible: boolean; onClick: () => void }> = ({ isVisible, onClick }) => {
    return (
        <button
            className='group flex items-center justify-center w-[40px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default hover:border-g48 active:bg-g92 active:border-g48'
            onClick={onClick}
            type='button'
        >
            {isVisible ? (
                <IconEyeOff
                    className='transition-all duration-300 ease-out group-hover:stroke-black'
                    color='black'
                    size={16}
                    stroke={1.5}
                />
            ) : (
                <IconEye
                    className='transition-all duration-300 ease-out group-hover:stroke-black'
                    color='black'
                    size={16}
                    stroke={1.5}
                />
            )}
        </button>
    )
}

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button
            className='group flex items-center justify-center w-[40px] min-h-[40px] bg-white border border-g88 box-border rounded-[10px] transition-default hover:border-g48 active:bg-g92 active:border-g48'
            onClick={onClick}
            type='button'
        >
            <IconEdit
                className='transition-all duration-300 ease-out group-hover:stroke-black'
                color='black'
                size={16}
                stroke={1.5}
            />
        </button>
    )
}
