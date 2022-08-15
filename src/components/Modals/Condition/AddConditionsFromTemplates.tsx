import { SearchIcon } from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { condConstant } from 'pages/ConditionsAndTemplates/constant'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Checkbox, Input2, Modal } from 'stories/components'

export const AddConditionsFromTemplates = ({
  conditions: allConditions = [],
  defaultConditions = [],
  onAfterSubmit = () => {},
}: any) => {
  const [conditions, setConditions] = useState<Array<any>>([])
  const [type, setType] = useState('ALL')
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now())

  const [selectedConditions, setSelectedConditions] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const data = allConditions.sort((a: any, b: any) => {
      if (a.type > b.type) return 1
      else if (a.type == b.type) return 0
      return -1
    })
    setConditions(data)
  }, [allConditions])

  const onChangeType = async (key: string) => {
    setType(key)
  }

  const onCloseUserModal = () => {}

  const onChangeCheck = (no: number, value: boolean) => {
    const newData = cloneDeep(selectedConditions)
    if (value) newData[no] = value
    else delete newData[no]
    setSelectedConditions(newData)
  }

  const onSubmit = async () => {
    const conditionNos = Object.keys(selectedConditions).map((v) => parseInt(v))
    const selectedConds = conditions.filter((condition) => conditionNos.includes(condition.no))
    onAfterSubmit(selectedConds)
    setIsOpen(false)
    setLastUpdatedAt(Date.now())
  }

  return (
    <Modal
      button={<Button outline>Add Condition</Button>}
      title={'Add Conditions from Templates'}
      titleOkay="Add"
      isOpen={isOpen}
      lastUpdatedAt={lastUpdatedAt}
      onClose={onCloseUserModal}
      onOk={onSubmit}
      disabled={!Object.keys(selectedConditions).length}
    >
      <div className="max-w-2xl">
        <div className="mb-3">
          <ButtonGroup title={['ALL', ...condConstant.types]} onChange={onChangeType} value={type} />
        </div>

        <Input2
          type="search"
          title="Search"
          hasIcon
          icon={<SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
          className="mb-3"
          value={query}
          onChange={(value) => setQuery(value)}
        />
        <div className="overflow-auto">
          <table className="text-left text-sm w-full">
            <thead>
              <tr>
                <th className="px-2 w-40">No</th>
                <th className="px-2">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {conditions.map((condition) => {
                let className = ''
                if (type != 'ALL' && type != condition.type) className = 'hidden'
                else if (
                  query &&
                  !`${condition.no} ${condition.type} ${condition.description}`
                    .toLowerCase()
                    .includes(query.toLowerCase())
                )
                  className = 'hidden'

                return (
                  <tr key={`tr-${condition.no}`} className={`border-b ${className}`}>
                    <td className="py-2 px-2 border-b h-fit">
                      <Checkbox
                        title={`${condition.type}-${condition.no}`}
                        id={condition.no}
                        disabled={defaultConditions.includes(condition.no)}
                        value={defaultConditions.includes(condition.no)}
                        onChange={(value) => onChangeCheck(condition.no, value)}
                      />
                    </td>
                    <td className="px-2 border-b">{condition.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}
