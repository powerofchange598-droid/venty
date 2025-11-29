import React, { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import BackButton from './BackButton';

interface PageLayoutProps {
    title: string;
    children: ReactNode;
    rightAccessory?: ReactNode;
}

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, rightAccessory }) => {
    return (
        <motion.div 
            className="h-full flex flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <header className="flex items-center justify-between p-4 lg:p-6 sticky top-0 bg-bg-primary/80 backdrop-blur-sm z-10 border-b border-border-primary">
                <div className="w-10">
                    <BackButton />
                </div>
                <h1 className="text-lg font-semibold text-center truncate">{title}</h1>
                <div className="w-auto min-w-[2.5rem] flex justify-end items-center space-x-2">
                    {rightAccessory}
                </div>
            </header>
            <div className="flex-grow">
                {children}
            </div>
        </motion.div>
    );
};

export default memo(PageLayout);
