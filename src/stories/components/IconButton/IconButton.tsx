declare function IconType(props: React.ComponentProps<'svg'>): JSX.Element

interface IconButtonProps {
  /**
   * Icon
   */
  icon: typeof IconType
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * Custom class name
   */
  className?: string
}

/**
 * Primary UI component for user interaction
 */
export const IconButton = ({ icon, onClick = () => {} }: IconButtonProps) => {
  const Icon = icon
  return (
    <button className="bg-transparent p-1" onClick={onClick}>
      <Icon className="h-5 w-5 text-blue-500" />
    </button>
  )
}
