import useModal from '@/hooks/useModal'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Alert from './Alert'
import Nav from './Nav'


const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { modal } = useModal()

    return (
        <>
            <Alert />
            <AnimatePresence>{modal}</AnimatePresence>
            <div
                className={clsx(
                    'fixed inset-0 flex flex-row bg-g94 overflow-y-scroll px-0',
                )}
            >
                <div className='fixed inset-0 right-auto z-10'>
                    <Nav />
                </div>
                <div className='grow h-screen overflow-x-clip'>
                    <motion.div
                        className='relative flex flex-col items-center w-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                    >
                        <div
                            className='flex flex-col gap-[50px] w-full max-w-[1240px] px-[120px] pt-[130px] pb-[33svh] max-tablet:px-[30px] max-mobile-h:px-[15px]'
                        >
                            {children}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Layout
