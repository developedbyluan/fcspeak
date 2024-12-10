import { motion } from "framer-motion";

type ProgressBarProps = {
    audioProgress: number;
}

export default function ProgressBar({audioProgress}: ProgressBarProps) {
    return (
        <div>
          <motion.div
           initial={{width: 0}}
           animate={{width: `${audioProgress}%`}}
           className="h-1 fixed z-50 top-0 bg-neutral-800"
           />
        </div>
    )
}