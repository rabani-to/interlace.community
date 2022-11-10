import { FiArrowUpRight } from "react-icons/fi"

function AnimatedLinkArrow({ className }: { className?: string }) {
  return <FiArrowUpRight className={`group-hover:translate-x-px duration-75 ${className}`} />
}

export default AnimatedLinkArrow
