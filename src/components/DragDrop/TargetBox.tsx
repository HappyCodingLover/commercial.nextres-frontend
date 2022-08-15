import { FC, memo } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'

export interface TargetBoxProps {
  onDrop: (item: any) => void
  type: string
}

export const TargetBox: FC<TargetBoxProps> = memo(function TargetBox({ onDrop, children, type }) {
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: [type],
      drop(_item: any, monitor) {
        console.log(monitor)
        onDrop(_item)
        return undefined
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  )

  return (
    <div ref={drop} className={canDrop ? 'bg-gray-100' : ''} role="TargetBox">
      {children}
    </div>
  )
})
