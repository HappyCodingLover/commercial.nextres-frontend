import React, { FC, memo, ReactNode, useMemo } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'

export interface SourceBoxProps {
  onToggleForbidDrag?: () => void
  children?: ReactNode
  type: string
  item: any
}

export const SourceBox: FC<SourceBoxProps> = memo(function SourceBox({ children, type, item }) {
  const childrenWithProps = React.Children.map(children, (child) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type,
        canDrag: true,
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging(),
        }),
        item,
      }),
      [],
    )

    const containerStyle = useMemo(
      () => ({
        opacity: isDragging ? 0.4 : 1,
        cursor: 'move',
      }),
      [isDragging],
    )
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ref: drag, style: containerStyle, role: 'SourceBox' })
    }
    return child
  })

  return <>{childrenWithProps}</>
})
