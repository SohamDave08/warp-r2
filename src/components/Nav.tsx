import {
    IconBuilding,
    IconBuildingEstate,
    IconCrown,
    IconCurrencyDollar,
    IconEye,
    IconFileCheck,
    IconGift,
    IconHeart,
    IconHome,
    IconSettings,
    IconUsers
} from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export enum NavRoute {
    Dashboard = '/dashboard',
    People = '/people',
    Payroll = '/payroll',
    Compliance = '/compliance',
    Benefits = '/benefits',
    Company = '/company',
    Documents = '/documents',
    Profile = '/profile',
    Payouts = '/payouts',
    Home = '/home',
    Settings = '/settings',
}

export function getNavRouteFromPath(path: string): NavRoute {
    // Get the first part of the path
    const firstPart = path.split('/')[1]
    switch (firstPart) {
        case 'dashboard':
            return NavRoute.Dashboard
        case 'people':
            return NavRoute.People
        case 'compliance':
            return NavRoute.Compliance
        case 'hire':
            return NavRoute.People
        case 'payroll':
            return NavRoute.Payroll
        case 'benefits':
            return NavRoute.Benefits
        case 'contracts':
            return NavRoute.People
        case 'company':
            return NavRoute.Company
        case 'documents':
            return NavRoute.Documents
        case 'profile':
            return NavRoute.Profile
        case 'payouts':
            return NavRoute.Payouts
        case 'home':
            return NavRoute.Home
        default:
            return NavRoute.Dashboard
    }
}



const Nav: React.FC = ({ }) => {


        return (
            <nav className='relative flex flex-col w-[70px] h-full bg-white'>
                <Link
                    href={NavRoute.Dashboard}
                    className='flex-initial flex justify-center items-center w-full h-[70px] transition-default hover:opacity-[.76]'
                >
                    <Image src='/warp-symbol@512w.webp' alt={'warp logo'} width={40} height={40} />
                </Link>
                <div className='flex-1 flex flex-col justify-between items-center pt-[20px] pb-[10px]'>
                    <div className='flex-1 flex flex-col gap-[5px]'>
                        <NavbarItem
                            href={NavRoute.Dashboard}
                            tooltip='Home'
                        >
                            <IconHome />
                        </NavbarItem>
                        <NavbarItem
                            href={NavRoute.People}
                            tooltip='People'
                            isActive
                        >
                            <IconUsers />
                        </NavbarItem>

                        <NavbarItem
                            href={NavRoute.Payroll}
                            tooltip='Payroll'
                        >
                            <IconCurrencyDollar />
                        </NavbarItem>

                        <NavbarItem
                            href={NavRoute.Compliance}
                            tooltip='Compliance'
                        >
                            <IconFileCheck />
                        </NavbarItem>

                        <NavbarItem
                            href={NavRoute.Benefits}
                            tooltip='Benefits'
                        >
                            <IconHeart />
                        </NavbarItem>

                        <NavbarItem
                            href={NavRoute.Company}
                            tooltip='Company'
                        >
                            <IconBuildingEstate />
                        </NavbarItem>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <NavbarItem href='/settings#referrals' tooltip='Referrals'>
                            <div className='relative'>
                                <div className='absolute -top-[3px] -right-[3px] w-[7px] h-[7px] bg-red-500 rounded-full' />
                                <IconGift color='black' size={24} stroke={1.5} />
                            </div>
                        </NavbarItem>
                        {/* <AccountItem app={app} orgDisplayData={orgDisplayData} /> */}
                    </div>
                </div>
            </nav>
        )
}

export default Nav

export interface NavbarItemProps {
    isActive?: boolean
    tooltip?: string
    onClick?: () => void
    children?: React.ReactNode
    href: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ isActive, tooltip, onClick, children, href }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!onClick || e.metaKey) return
        onClick()
    }

    return (
        <div className='relative'>
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        className='absolute z-10 left-[55px] inset-y-0 my-auto max-h-max bg-white px-[7px] py-[3px] rounded-[7px] shadow-tooltip'
                        style={{ originX: 0, originY: 0.5 }}
                        initial={{ opacity: 0, x: -5, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -5, scale: 0.9 }}
                        transition={{ ease: 'easeOut', duration: 0.3 }}
                    >
                        <div className='text-caption font-medium whitespace-nowrap'>{tooltip}</div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Link
                className='flex w-[50px] h-[50px]'
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={(e) => onClickHandler(e)}
                href={href}
            >
                <div className={buttonStyle(isActive)}>
                    {children && cloneElement(children as JSX.Element, iconStyle(isActive))}
                </div>
            </Link>
        </div>
    )
}

const buttonStyle = (isActive?: boolean) => {
    return isActive
        ? 'relative w-full h-full flex items-center justify-center bg-black bg-button-shine rounded-[15px] shadow-main-button overflow-clip transition-default hover:brightness-125'
        : 'relative w-full h-full flex items-center justify-center rounded-[15px] overflow-clip transition-default hover:bg-g96'
}

const iconStyle = (isActive?: boolean) => {
    return isActive ? { color: 'white', size: 24, stroke: 1.75 } : { color: 'black', size: 24, stroke: 1.5 }
}
