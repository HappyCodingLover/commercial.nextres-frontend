import { useEffect, useState } from 'react'

export const PlainInput = (props: any) => {
  const { value, content, onChange } = props

  const [isEditing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState('')

  useEffect(() => {
    setEditingValue(value)
  }, [value])

  useEffect(() => setEditing(props.isEditing), [props.isEditing])

  const onUpdate = () => {
    setEditing(false)
    onChange(editingValue)
  }

  return isEditing ? (
    <input
      autoFocus
      value={editingValue}
      onChange={(e) => setEditingValue(e.target.value)}
      className="w-full p-1"
      onBlur={onUpdate}
    />
  ) : (
    <p className="cursor-pointer p-1 text-black font-variation-settings-600" onClick={() => setEditing(true)}>
      {content}
    </p>
  )
}
