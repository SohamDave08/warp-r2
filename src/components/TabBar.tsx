import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import { LayoutGroup, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export interface TabBarProps {
    tabs: string[]
    children?: React.ReactNode
}

const TabBar: React.FC<TabBarProps> = ({ tabs, children }) => {
    const router = useRouter()

    const defaultTab = router.pathname.split('#')[1]
        ? tabs.findIndex((tab) => {
              return tab.toLowerCase().replaceAll(' ', '-') === router.pathname.split('#')[1]
          })
        : 0
    const [selectedIndex, setSelectedIndex] = useState(defaultTab)

    const handleTabChange = (index: number) => {
        router.push(`#${tabs[index]?.toLowerCase().replaceAll(' ', '-')}`, undefined, { shallow: true })
    }

    useEffect(() => {
        const index = tabs.findIndex((tab) => {
            return tab.toLowerCase().replaceAll(' ', '-') === window.location.hash.slice(1)
        })
        if (index !== -1) {
            setSelectedIndex(index)
        }
    }, [tabs, router])

    const nonNullChildren = React.Children.toArray(children).filter(Boolean)

    return (
        <TabGroup defaultIndex={defaultTab} selectedIndex={selectedIndex} onChange={handleTabChange}>
            <div className='relative flex mx-[2px]'>
                <TabList className='flex flex-row gap-[30px] -mt-[10px]'>
                    <LayoutGroup id={tabs.join()}>
                        {tabs.map((tab, index) => {
                            return <TabButton key={`tab-${index}`} title={tab} underlineID={tabs.join()} />
                        })}
                    </LayoutGroup>
                </TabList>
                <div className='absolute bottom-0 inset-x-0 h-[1px] bg-g88' />
            </div>
            <TabPanels>
                {React.Children.map(nonNullChildren, (child, index) => {
                    return <TabPanel key={`panel-${index}`} child={child} />
                })}
            </TabPanels>
        </TabGroup>
    )
}

export default TabBar

const TabButton: React.FC<{ title: string; underlineID: string }> = ({ title, underlineID }) => {
    return (
        <Tab className='flex-none focus:outline-none'>
            {({ selected }) => (
                <motion.div className='group relative px-[15px] -mx-[15px]' layout layoutRoot>
                    <div
                        className={
                            selected
                                ? 'text-tab py-[7px] transition-default group-hover:text-g8'
                                : 'text-tab text-g48 py-[7px] transition-default group-hover:text-g8'
                        }
                    >
                        {title}
                    </div>
                    {selected && (
                        <motion.div
                            className='absolute z-10 inset-x-[15px] bottom-0 h-[2px] bg-black rounded-full'
                            layoutId={underlineID}
                            transition={{ ease: 'easeOut', duration: 0.2 }}
                        />
                    )}
                </motion.div>
            )}
        </Tab>
    )
}

const TabPanel: React.FC<{ child: React.ReactNode }> = ({ child }) => {
    return (
        <Tab.Panel>
            <motion.div
                style={{ originY: 0 }}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
            >
                {child}
            </motion.div>
        </Tab.Panel>
    )
}

export interface TabBarTab {
    name: string
    component: React.ReactNode
}
