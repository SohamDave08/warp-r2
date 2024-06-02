import useAlerts from '@/hooks/useAlerts'
import { IconBan, IconCircleCheckFilled, IconInfoCircle } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export enum AlertType {
    Confirmation = 'confirmation',
    Error = 'error',
    Info = 'info',
}

const Alert: React.FC = () => {
    const { alerts } = useAlerts()

    return (
        <div className='fixed z-[1000] inset-0 top-auto flex flex-col items-center gap-[10px] px-[100px] pb-[30px] pointer-events-none'>
            <AnimatePresence>
                {alerts.map((alert) => (
                    <motion.div
                        key={`alert-${alert.id}`}
                        className='flex flex-row items-center h-[40px] bg-black/80 backdrop-blur-[10px] rounded-[10px] pointer-events-auto'
                        layout
                        style={{ originY: 1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                    >
                        <div className='flex items-center justify-center pl-[3px] h-[40px] w-[40px]'>
                            {getIcon(alert.type)}
                        </div>
                        <p className='text-button-1 font-semibold text-white whitespace-nowrap pr-[15px]'>
                            {alert.message}
                        </p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Alert

const getIcon = (type: AlertType) => {
    switch (type) {
        case AlertType.Confirmation:
            return <IconCircleCheckFilled style={{ color: '#22c55e' }} size={20} stroke={2} />
        case AlertType.Error:
            return <IconBan style={{ color: '#ef4444' }} size={20} stroke={2} />
        case AlertType.Info:
            return <IconInfoCircle style={{ color: '#0ea5e9' }} size={20} stroke={2} />
        default:
            return <IconInfoCircle style={{ color: '#0ea5e9' }} size={20} stroke={2} />
    }
}
