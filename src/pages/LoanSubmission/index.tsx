import {
  ArrowRightIcon,
  EyeIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
  ViewListIcon,
} from '@heroicons/react/outline'
import cloneDeep from 'clone-deep'
import { TargetBox } from 'components/DragDrop'
import { LayoutLoading } from 'components/LayoutLoading'
import {
  AddConditionsFromTemplates,
  AddHoc,
  ChooseDocumentsForCondition,
  ConditionOrderChange,
  DeleteConditions,
} from 'components/Modals'
import { PlainInput } from 'components/PlainInput'
import { categories, condConstant } from 'pages/ConditionsAndTemplates/constant'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { partiesMap } from 'reducers/loanDetail.reducer'
import { getLoanSubmission, uploadFiles } from 'services'
import {
  downloadS3Documents,
  generateNewConditionNo,
  getConditions,
  getConditionsByTemplate,
  updateLoanSubmission,
} from 'services/apis'
import svgLoading from 'stories/assets/loading.svg'
import { Checkbox, MultiSelect, Select, Select2, TextArea } from 'stories/components'
import { confirm, formatDate, formatTime } from 'utils'

import { docCategory, docStatus, exceptionStatus } from './constants'
import { DocumentsSlide } from './documents'

export function LoanSubmission() {
  const { loanDetail } = useSelector((state: any) => {
    return {
      loanDetail: state.loanDetail,
    }
  })
  const profile = useSelector((state: any) => state.auth.profile)

  const { parties } = loanDetail

  const [loading, setLoading] = useState(false)
  const [loanNumber, setLoanNumber] = useState(0)
  const [templates, setTemplates] = useState<Record<number, string>>({})
  const [currentTemplate, setCurrentTemplate] = useState(0)
  const [categoryOpenStatus, setCategoryOpenStatus] = useState<Record<string, boolean>>({})
  const [conditions, setConditions] = useState<Array<any>>([])
  const [totalConditions, setTotalConditions] = useState<Array<any>>([])
  const [editingCondition, setEditingCondition] = useState<Record<string, any> | null>(null)
  const [documents, setDocuments] = useState<Array<any>>([])
  const [conditionOrder, setConditionOrder] = useState<Array<number>>([])

  const [filterCategory, setFilterCategory] = useState('0')
  const [filterCleared, setFiltercleared] = useState(false)
  const [conditionSortBy, setConditionSortBy] = useState('')

  const [editingConditionNo, setEditingConditionNo] = useState(0)
  const [respFilter, setRespFilter] = useState<Record<string, boolean>>({})

  useEffect(() => {
    getConditions().then(({ data, templates }) => {
      const newData: Record<number, string> = {}
      templates.forEach((item: any) => {
        newData[item.no] = item.name
      })
      setTemplates(newData)
      setTotalConditions(data)
    })
  }, [])

  useEffect(() => {
    const params = location.pathname.split('/')
    const loanNumber = params[3]
    if (!loanNumber || isNaN(parseInt(loanNumber))) return

    setLoanNumber(parseInt(loanNumber))
    setLoading(true)
    getLoanSubmission().then(({ templateNumber, conditions, documents, conditionOrder }) => {
      if (templateNumber) {
        setConditions(conditions)
        setDocuments(documents)
        setConditionOrder(conditionOrder)
        setCurrentTemplate(templateNumber)
      }
      setLoading(false)
    })
  }, [location.pathname])

  const getCountPerCategory = (category: string) => {
    return conditions.filter((condition) => condition.category === category).length
  }

  const onChangeConditionTemplate = async (value: number) => {
    if (!value) return
    const result = await confirm(
      <div className="text-gray-600 mb-4 text-md">
        Are you sure to change condition template?
        <div className="text-gray-900 flex text-left text-md flex items-center justify-center mt-4">
          {templates[currentTemplate]}{' '}
          <span className="mx-4">
            <ArrowRightIcon className="w-4 h-4"></ArrowRightIcon>
          </span>{' '}
          {templates[value]}
        </div>
      </div>,
    )
    if (!result) return
    value = parseInt(String(value))
    setCurrentTemplate(value)
    setLoading(true)
    getConditionsByTemplate(value).then((conditions: Array<any>) => {
      setConditions(conditions)
      setLoading(false)
      const newDocs = cloneDeep(documents)
      newDocs.forEach((document) => {
        document.conditionNo = ''
      })
      setDocuments(newDocs)

      updateLoanSubmission(
        value,
        {
          set: conditions,
        },
        {
          set: newDocs,
        },
      )
    })
  }

  const onAddCondition = async (data: Record<string, any>) => {
    setLoading(true)
    const { conditionNo } = await generateNewConditionNo()
    const newData = cloneDeep(conditions)
    const newCondition = {
      no: conditionNo,
      ...data,
    }
    newData.push(newCondition)
    setConditions(newData)
    await updateLoanSubmission(currentTemplate, { update: [newCondition] })
    setLoading(false)
  }

  const onAddConditionsFromTemplates = async (conds: Array<any>) => {
    const newData = cloneDeep(conditions)
    newData.push(...conds)
    setConditions(newData)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, { update: conds })
    setLoading(false)
  }

  const onChangeFilterCategory = (value: string) => {
    setFilterCategory(value)

    if (value != '0') setCategoryOpenStatus({ [value]: true })
    else setCategoryOpenStatus({})
  }

  const onSetConditionOrder = async (newConditionOrder: Array<number>) => {
    setConditionOrder(newConditionOrder)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, {}, {}, { set: newConditionOrder })
    setLoading(false)
  }

  const onRemoveMultiConditions = async (conditionNos: Array<number>) => {
    const newData = cloneDeep(conditions)
    const newOrderData = cloneDeep(conditionOrder)
    const removedConds: Array<any> = []
    conditionNos.forEach((conditionNo) => {
      const index = newData.findIndex((cond: any) => cond.no == conditionNo)

      if (index === -1) return
      removedConds.push(newData[index])
      newData.splice(index, 1)

      const orderIndex = newOrderData.indexOf(conditionNo)
      newOrderData.splice(orderIndex, 1)
    })

    setConditions(newData)
    setConditionOrder(newOrderData)
    setLoading(true)

    await updateLoanSubmission(currentTemplate, { delete: removedConds }, {}, { set: newOrderData })
    setLoading(false)
  }

  const onClickCategory = (value: string) => {
    const newStatus = cloneDeep(categoryOpenStatus)
    newStatus[value] = !newStatus[value]
    setCategoryOpenStatus(newStatus)
  }

  const onEditCondition = (condition: any) => {
    setEditingCondition(condition)
  }

  const onRemoveCondition = async (condition: any) => {
    const result = await confirm(
      <div className="text-gray-600 mb-4 text-md">
        Are you sure want to delete this condition?
        <div className="text-gray-900 flex flex-col text-left text-sm">
          <span>No: {condition.no}</span>
          <span>Type: {condition.type}</span>
          <span>Class: {condition.class}</span>
          <span>Int/Ext: {condition.intext ? 'Yes' : 'No'}</span>
          <span>Responsibility: {condition.responsibility}</span>
          <span>Category: {condition.category}</span>
        </div>
      </div>,
    )
    if (!result) return
    const index = conditions.findIndex((item) => item.no === condition.no)
    const newData = cloneDeep(conditions)
    const removedConds = newData.splice(index, 1)
    setConditions(newData)

    const newDocs = cloneDeep(documents)
    const updatedDocs: Array<any> = []
    newDocs.forEach((document) => {
      if (document.conditionNo != condition.no) return
      document.conditionNo = ''
      updatedDocs.push(document)
    })
    setDocuments(newDocs)
    setLoading(true)

    const orderIndex = conditionOrder.indexOf(condition.no)
    conditionOrder.splice(orderIndex, 1)
    await updateLoanSubmission(
      currentTemplate,
      { delete: removedConds },
      { update: updatedDocs },
      { set: conditionOrder },
    )
    setLoading(false)
  }

  const setEditingConditionValue = (key: string, value: string) => {
    if (!editingCondition) return
    const newData = cloneDeep(editingCondition)
    newData[key] = value
    setEditingCondition(newData)
  }

  const onCancelEditingCondition = () => {
    setEditingCondition(null)
  }

  const onUpdateEditingCondition = async () => {
    if (!editingCondition) return
    const newData = cloneDeep(conditions)
    const index = conditions.findIndex((item) => item.no === editingCondition.no)
    newData[index] = {
      ...newData[index],
      type: editingCondition.type,
      class: editingCondition.class,
      responsibility: editingCondition.responsibility,
      category: editingCondition.category,
      note: editingCondition.note,
    }
    setConditions(newData)
    setEditingCondition(null)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, { update: [newData[index]] })
    setLoading(false)
  }

  const onUpdateConditionValue = async (key: string, value: boolean, no: number) => {
    const newData = cloneDeep(conditions)
    const item = newData.find((condition) => condition.no == no)
    if (!item) return
    item[key] = value
    setConditions(newData)

    if (key.startsWith('show')) return
    if (key === 'exceptionStatus') return
    setLoading(true)
    await updateLoanSubmission(currentTemplate, { update: [item] })
    setLoading(false)
  }

  const onSetCleared = async (value: boolean, no: number) => {
    const newData = cloneDeep(conditions)
    const item = newData.find((condition) => condition.no == no)
    if (!item) return
    item.cleared = value
    item.showCleared = false
    item.clearedText = `By - ${profile.name} ${formatDate('now')}`
    setConditions(newData)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, { update: [item] })
    setLoading(false)
  }

  const onSetException = async (value: boolean, no: number) => {
    const newData = cloneDeep(conditions)
    const item = newData.find((condition) => condition.no == no)
    if (!item) return
    item.exception = value
    if (value) item.exceptionText = `By - ${profile.name} ${formatDate('now')}`
    else delete item.exceptionStatus
    item.showException = false

    setConditions(newData)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, { update: [item] })
    setLoading(false)
  }

  const onUploadNewfile = (event: React.ChangeEvent<HTMLInputElement>, condition: any) => {
    const { files } = event.target
    if (!files || files.length == 0) return
    const arrFile: Array<File> = []
    for (let i = 0; i < files.length; i++) arrFile.push(files[i])

    const data = {
      path: `loanSubmission/${loanNumber}`,
    }

    const newConditions = cloneDeep(conditions)
    const item = newConditions.find(({ no }) => condition.no == no)
    item.loadingDoc = true
    setConditions(newConditions)

    uploadFiles(data, arrFile).then(async (keys: Array<string>) => {
      item.loadingDoc = false
      setConditions(newConditions)

      const newData = cloneDeep(documents)
      const newDocs: Array<any> = []
      keys.forEach((key, index) => {
        newDocs.push({
          conditionNo: condition.no,
          name: files[index].name,
          key,
          status: 'Not Reviewed',
          category: ' ',
          createdAt: Date.now(),
        })
      })
      newData.push(...newDocs)
      setDocuments(newData)
      setLoading(true)
      await updateLoanSubmission(currentTemplate, {}, { update: newDocs })
      setLoading(false)
    })
  }

  const onChooseDocumentForCondition = (conditionNo: number) => {
    setEditingConditionNo(conditionNo)
  }
  const onUpdateConditionDocuments = async (keys: Array<string>) => {
    const updatedDocs: Array<any> = []
    documents.forEach((doc) => {
      const isChecked = keys.includes(doc.key)
      if (isChecked && doc.conditionNo == editingConditionNo) return
      if (!isChecked && doc.conditionNo != editingConditionNo) return

      doc.conditionNo = isChecked ? editingConditionNo : ''
      updatedDocs.push(doc)
    })
    setEditingConditionNo(0)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, {}, { update: updatedDocs })
    setLoading(false)
  }

  const onCloseChoosingDocuments = () => {
    setEditingConditionNo(0)
  }

  const onUpdateDocumentProp = async (key: string, value: string, conditionNo: number, documentKey: string) => {
    const newData = cloneDeep(documents)
    const item = newData.find((doc) => doc.conditionNo == conditionNo && doc.key == documentKey)
    if (!item) return
    if (key == 'name') value = value + item.name.substr(-4)

    item[key] = value
    setDocuments(newData)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, {}, { update: [item] })
    setLoading(false)
  }

  const onRemoveDocument = async (document: any, isRemoveCompletely: boolean = false) => {
    const result = await confirm(
      <div className="text-gray-600 mb-4 text-md">
        Are you sure want to delete this document?
        <div className="text-gray-800 flex flex-col text-left text-sm">
          <span>Condition No: {document.conditionNo}</span>
          <span>Document Name: {document.name}</span>
          <span>Uploaded Date: {formatTime(new Date(document.createdAt))}</span>
        </div>
      </div>,
    )
    if (!result) return

    const newData = cloneDeep(documents)
    const index = newData.findIndex((doc) => doc.conditionNo == document.conditionNo && doc.key == document.key)
    if (index == -1) return
    if (isRemoveCompletely) {
      const removedDocs = newData.splice(index, 1)
      setDocuments(newData)
      setLoading(true)
      await updateLoanSubmission(currentTemplate, {}, { delete: removedDocs })
      setLoading(false)
    } else {
      newData[index].conditionNo = ''
      setDocuments(newData)
      setLoading(true)
      await updateLoanSubmission(currentTemplate, {}, { update: [newData[index]] })
      setLoading(false)
    }
  }

  const onOpenDocument = async (document: any) => {
    downloadS3Documents(document.key).then((res) => {
      var windowReference: any = window.open()
      windowReference.location = res.url
    })
  }

  const onUpdateDocuments = async (newDocs: Array<any>, updatedDoc: any) => {
    setDocuments(newDocs)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, {}, { update: [updatedDoc] })
    setLoading(false)
  }

  const onDropDocument = async (document: any, conditionNo: number) => {
    const newData = cloneDeep(documents)
    const index = newData.findIndex((doc) => doc.key == document.key)
    if (index == -1) return
    if (conditionNo == newData[index].conditionNo) return

    newData[index].conditionNo = conditionNo
    setDocuments(newData)
    setLoading(true)
    await updateLoanSubmission(currentTemplate, {}, { update: [newData[index]] })
    setLoading(false)
  }

  const renderDescription = (condition: any) => {
    const { name, description, note } = condition
    return (
      <div>
        <div className="flex flex-wrap items-center">
          <b className="mr-3">Description: </b>
          <p>{name}</p>
        </div>
        <pre className="mb-3">{description}</pre>

        {note && (
          <>
            <div className="flex flex-wrap items-center">
              <b className="mr-3">Note: </b>
            </div>
            <pre className="w-full border-t bg-gray-100 p-1">{note}</pre>
          </>
        )}
      </div>
    )
  }

  const renderCondition = (category: string) => {
    let renderConditions = conditions
      .filter((condition) => condition.category === category)
      .sort((a, b) => conditionOrder.indexOf(a.no) - conditionOrder.indexOf(b.no))

    if (conditionSortBy) {
      const sortBy = conditionSortBy.toLowerCase()
      renderConditions = renderConditions.sort((a: any, b: any) => {
        const aV = a[sortBy]
        const bV = b[sortBy]
        if (aV > bV) return 1
        if (aV == bV) return 0
        return -1
      })
    }
    return (
      <div className={categoryOpenStatus[category] ? 'border p-1' : 'hidden p-1'}>
        {renderConditions.map((condition: any) => {
          const isEditing = editingCondition && condition.no == editingCondition.no
          const properDocs = documents.filter(({ conditionNo }) => conditionNo == condition.no)
          if (filterCleared && condition.cleared) return null
          if (respFilter[condition.responsibility] === false) return null

          return (
            <div
              className={`relative group p-3 py-5 border-b ${
                condition.cleared
                  ? 'bg-green-100 shadow1'
                  : condition.intext
                  ? 'bg-blue-100 shadow1'
                  : 'hover:bg-slate-100 hover-shadow1 shadow'
              }`}
              key={condition.no}
            >
              <div className="grid grid-cols-12 gap-x-2 mb-3 text-[13px] overflow-visible gap-y-4">
                <div className="md:col-span-3 sm:col-span-6 col-span-12 grid grid-cols-2 h-fit">
                  <p>No:</p>
                  <p className="font-bold">{condition.no}</p>

                  <p>Type:</p>
                  {isEditing ? (
                    <Select
                      id="type"
                      className="-mb-4"
                      size={3}
                      options={condConstant.types}
                      value={editingCondition.type}
                      onChange={(value) => setEditingConditionValue('type', value)}
                    />
                  ) : (
                    <p className="font-bold text-[12px]">{condition.type}</p>
                  )}

                  <p>Class:</p>
                  {isEditing ? (
                    <Select
                      id="class"
                      className="-mb-4"
                      size={3}
                      options={condConstant.classes}
                      value={editingCondition.class}
                      onChange={(value) => setEditingConditionValue('class', value)}
                    />
                  ) : (
                    <p className="font-bold text-[12px]">{condition.class}</p>
                  )}

                  <p>Responsibility:</p>
                  {isEditing ? (
                    <Select
                      id="responsibility"
                      className="-mb-4"
                      size={3}
                      options={condConstant.respon}
                      value={editingCondition.responsibility}
                      onChange={(value) => setEditingConditionValue('responsibility', value)}
                    />
                  ) : (
                    <p className="font-bold text-[12px]">{condition.responsibility}</p>
                  )}

                  {isEditing && (
                    <>
                      <p>Category:</p>

                      <Select
                        id="category"
                        className="-mb-4"
                        size={3}
                        options={categories}
                        value={editingCondition.category}
                        onChange={(value) => setEditingConditionValue('category', value)}
                      />
                    </>
                  )}
                </div>

                <div className="md:col-span-6 sm:col-span-6 col-span-12">
                  {isEditing ? (
                    <TextArea
                      title="Note"
                      value={editingCondition.note}
                      onChange={(value) => setEditingConditionValue('note', value)}
                    />
                  ) : (
                    renderDescription(condition)
                  )}
                </div>

                <div className="md:col-span-3 sm:col-span-6 col-span-12 text-[13px]">
                  <Checkbox
                    color="gray"
                    size={3}
                    title="Int/Ext"
                    id={`intext-${condition.no}`}
                    value={condition.intext}
                    onChange={(value) => onUpdateConditionValue('intext', value, condition.no)}
                  />
                  <div className="relative overflow-visible">
                    <div className="flex flex-wrap">
                      <div className="flex-[1]">
                        <Checkbox
                          color="gray"
                          size={3}
                          title="Cleared:"
                          id={`cleared-${condition.no}`}
                          value={condition.cleared}
                          checked={condition.cleared || false}
                          onClick={() => onUpdateConditionValue('showCleared', true, condition.no)}
                        />
                      </div>
                      {condition.cleared && (
                        <div className="flex-[2]">
                          <p className="font-bold">{condition.clearedText}</p>
                        </div>
                      )}
                    </div>
                    {condition.showCleared && (
                      <div className="absolute shadow1 bg-gray-50 rounded z-10 p-3 pb-1 border">
                        <p>
                          Are you sure want to Mark as <b>{condition.cleared ? 'Not' : ''} Cleared</b>?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="hover:underline p-1 cursor-pointer text-shade-blue font-bold"
                            onClick={() => onSetCleared(!condition.cleared, condition.no)}
                          >
                            Confirm
                          </button>
                          <button
                            className="hover:underline p-1 cursor-pointer text-red-800 font-bold"
                            onClick={() => onUpdateConditionValue('showCleared', false, condition.no)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative overflow-visible">
                    <div className="flex flex-wrap">
                      <div className="flex-[1]">
                        <Checkbox
                          color="gray"
                          size={3}
                          title="Exception:"
                          id={`exception-${condition.no}`}
                          value={condition.exception}
                          checked={condition.exception || false}
                          onClick={() => onUpdateConditionValue('showException', true, condition.no)}
                        />
                      </div>
                      {condition.exception && (
                        <div className="flex-[2]">
                          <p className="font-bold">{condition.exceptionText}</p>
                        </div>
                      )}
                    </div>
                    {condition.showException && (
                      <div className="absolute bg-gray-50 rounded z-10 p-3 pb-1 shadow1 border">
                        <p className="mb-2">
                          Are you sure want to Mark as <b>{condition.exception ? 'Not' : ''} Exception Requested</b>?
                        </p>

                        <Select
                          id="category"
                          size={3}
                          options={exceptionStatus}
                          value={condition.exceptionStatus}
                          disabled={condition.exception}
                          onChange={(value) => onUpdateConditionValue('exceptionStatus', value, condition.no)}
                        />

                        <div className="flex justify-end">
                          <button
                            className="hover:underline p-1 cursor-pointer text-shade-blue font-bold"
                            onClick={() => onSetException(!condition.exception, condition.no)}
                          >
                            Confirm
                          </button>
                          <button
                            className="hover:underline p-1 cursor-pointer text-red-800 font-bold"
                            onClick={() => onUpdateConditionValue('showException', false, condition.no)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="absolute top-1 right-1 hidden group-hover:flex">
                    <button
                      className="hover-shadow1 p-1 cursor-pointer text-shade-blue"
                      onClick={() => onEditCondition(condition)}
                    >
                      <PencilIcon className="w-4 h-4"></PencilIcon>
                    </button>
                    <button
                      className="hover-shadow1 p-1 cursor-pointer text-shade-blue"
                      onClick={() => onRemoveCondition(condition)}
                    >
                      <TrashIcon className="w-4 h-4"></TrashIcon>
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full bg-gray-50 rounded p-2 text-sm text-left pb-5">
                <TargetBox type="document" onDrop={(document: any) => onDropDocument(document, condition.no)}>
                  <div className="flex border-b pb-1">
                    <p className="flex-auto">Documents ({properDocs.length})</p>
                    {condition.loadingDoc && (
                      <img src={svgLoading} className="inline w-5 h-5 text-white animate-spin" />
                    )}
                    <button
                      className="text-gray-700 p-1 hover-shadow1 cursor-pointer"
                      onClick={() => onChooseDocumentForCondition(condition.no)}
                    >
                      <ViewListIcon className="w-4 h-4"></ViewListIcon>
                    </button>
                    <label className="text-gray-700 p-1 hover-shadow1 cursor-pointer" htmlFor={`file-${condition.no}`}>
                      <UploadIcon className="w-4 h-4"></UploadIcon>
                    </label>

                    <input
                      className="hidden"
                      id={`file-${condition.no}`}
                      type="file"
                      accept=".pdf,.xml"
                      multiple
                      required
                      onChange={(event) => onUploadNewfile(event, condition)}
                    />
                  </div>
                  <div className="overflow-auto">
                    <table className="w-full text-[13px]">
                      <thead className="font-medium text-gray-600">
                        <tr>
                          <th className="px-2 py-1">Document Name</th>
                          <th className="px-2">Status</th>
                          <th className="px-2">Category</th>
                          <th className="px-2">Uploaded Date</th>
                          <th className="px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-900 text-[14px]">
                        {properDocs.map((document: any, index: number) => (
                          <tr className="hover:bg-slate-100" key={index}>
                            <td className="px-2">
                              <PlainInput
                                value={document.name.substr(0, document.name.length - 4)}
                                content={document.name}
                                onChange={(newName: string) =>
                                  onUpdateDocumentProp('name', newName, condition.no, document.key)
                                }
                              />
                            </td>
                            <td className="px-2 w-32">
                              <Select
                                id={`document-status-${condition.no}`}
                                size={3}
                                className="-mb-4"
                                options={docStatus}
                                value={document.status}
                                onChange={(value) => onUpdateDocumentProp('status', value, condition.no, document.key)}
                              />
                            </td>
                            <td className="px-2 w-52">
                              <Select
                                id={`document-category-${condition.no}`}
                                size={3}
                                className="-mb-4"
                                options={docCategory}
                                value={document.category}
                                onChange={(value) =>
                                  onUpdateDocumentProp('category', value, condition.no, document.key)
                                }
                              />
                            </td>
                            <td className="px-2 w-36">{formatTime(new Date(document.createdAt))}</td>
                            <td className="px-2 w-20">
                              <button
                                className="text-gray-700 p-1 hover-shadow1 cursor-pointer"
                                onClick={() => onOpenDocument(document)}
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button
                                className="text-gray-700 p-1 hover-shadow1 cursor-pointer"
                                onClick={() => onRemoveDocument(document, false)}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TargetBox>
              </div>
              {isEditing && (
                <div className="flex w-full justify-end mt-4 gap-4">
                  <button className="text-[14px] hover:underline font-bold" onClick={onCancelEditingCondition}>
                    Cancel
                  </button>
                  <button
                    className="text-[14px] px-2 py-1 bg-shade-blue text-white border hover:bg-white border-shade-blue hover:text-shade-blue rounded"
                    onClick={onUpdateEditingCondition}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="LoanSubmission-container px-2">
        <div className="max-w-screen-2xl m-auto">
          <div className="relative bg-white shadow1 rounded mb-4 p-4">
            <LayoutLoading show={loading} />
            <div className="parties-container overflow-auto mb-4">
              <table className="table-auto w-full">
                <thead className="text-[15px] bg-gray-100">
                  <tr>
                    <th className="border p-1"></th>
                    <th className="border p-1">Name</th>
                    <th className="border p-1">Email</th>
                    <th className="border p-1">Phone</th>
                    <th className="border p-1">Phone Ext.</th>
                  </tr>
                </thead>
                <tbody className="text-[15px] text-gray-900">
                  {Object.keys(parties).map((key, index) => {
                    const { name, email, phone, phoneExt } = parties[key]
                    return (
                      <tr key={index}>
                        <td className="border p-1 pl-2">{partiesMap[key]}</td>
                        <td className="border p-1 pl-2">{name}</td>
                        <td className="border p-1 pl-2">{email}</td>
                        <td className="border p-1 pl-2">{phone}</td>
                        <td className="border p-1 pl-2">{phoneExt}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="conditions-container overflow-show mt-4">
              <div className="flex flex-wrap border-b justify-between items-center mb-4">
                <p className="text-lg font-bold text-gray-800 flex items-center">
                  Open Conditions
                  {loading && <img src={svgLoading} className="inline w-6 h-6 text-white animate-spin ml-2" />}
                </p>
                <div className="flex mb-2 flex-wrap items-center">
                  <AddHoc onAfterSubmit={onAddCondition} />
                  <AddConditionsFromTemplates
                    conditions={totalConditions}
                    defaultConditions={conditions.map(({ no }) => no)}
                    onAfterSubmit={onAddConditionsFromTemplates}
                  />
                  <span className="w-80 mb-2">
                    <Select2
                      id="chooseTemplate"
                      value={String(currentTemplate)}
                      options={templates}
                      title="Choose Template"
                      hasDefaultOption
                      onChange={onChangeConditionTemplate}
                    />
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center mx-auto space-x-4 items-center mb-3">
                <div className="w-72 mb-4">
                  <Select2
                    id="filterByCategory"
                    value={String(filterCategory)}
                    options={categories}
                    title="Filter by Category"
                    hasDefaultOption
                    defaultOptionText="All"
                    onChange={onChangeFilterCategory}
                  />
                </div>
                <div className="w-72 mb-4">
                  <MultiSelect
                    value={respFilter}
                    title="Filter by Responsibility"
                    id="filterByResponsibility"
                    options={condConstant.respon}
                    onChange={(value) => setRespFilter(value)}
                  />
                </div>
                <div className="w-72 mb-4 flex items-center">
                  <Checkbox
                    color="gray"
                    title="Cleared"
                    id={`cleared-filter`}
                    checked={filterCleared}
                    onChange={(value) => setFiltercleared(value)}
                  />
                  <span className="mx-2">
                    <ConditionOrderChange
                      conditions={conditions}
                      conditionOrder={conditionOrder}
                      onAfterSubmit={onSetConditionOrder}
                    />
                  </span>
                  <span className="mx-2">
                    <DeleteConditions
                      conditions={conditions}
                      conditionOrder={conditionOrder}
                      onAfterSubmit={onRemoveMultiConditions}
                    />
                  </span>
                </div>
                <div className="w-72 mb-4">
                  <Select2
                    id="conditionSortBy"
                    value={String(conditionSortBy)}
                    options={['Type', 'Class', 'Responsibility']}
                    title="Sort By"
                    hasDefaultOption
                    defaultOptionText=""
                    onChange={(value) => setConditionSortBy(value)}
                  />
                </div>
              </div>

              {categories.map((category) => {
                const selected = categoryOpenStatus[category]
                if (filterCategory != category && filterCategory != '0') return null
                return (
                  <div className="mb-3" key={category}>
                    <h2>
                      <button
                        type="button"
                        className={`${
                          selected ? 'bg-shade-blue text-white hover:text-gray-900' : ''
                        } flex justify-between items-center p-5 w-full font-medium text-left hover:text-gray-900 text-gray-900 rounded-t-xl border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:ring-4 hover:ring-gray-200`}
                        onClick={() => onClickCategory(category)}
                      >
                        <span>
                          {category} ({getCountPerCategory(category)})
                        </span>
                        <span className="">
                          {selected ? (
                            <span className="">
                              <MinusIcon className="w-5 h-5 shrink-0" />
                            </span>
                          ) : (
                            <PlusIcon className="w-5 h-5 shrink-0 hover:text-gray-900" />
                          )}
                        </span>
                      </button>
                    </h2>
                    <div>{renderCondition(category)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <DocumentsSlide
          documents={documents}
          onUpdate={onUpdateDocuments}
          onRemove={(document: any) => onRemoveDocument(document, true)}
          onOpen={(document: any) => onOpenDocument(document)}
        />
        <ChooseDocumentsForCondition
          documents={documents}
          conditionNo={editingConditionNo}
          isOpen={editingConditionNo != 0}
          onAfterSubmit={onUpdateConditionDocuments}
          onClose={onCloseChoosingDocuments}
          onOpenDocument={onOpenDocument}
        />
      </div>
    </DndProvider>
  )
}
