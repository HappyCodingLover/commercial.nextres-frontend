interface InputProps {
  loan_number: any
  borrower_name: string
  property_address: string
}

export function LoanDetail({ loan_number, borrower_name, property_address }: InputProps) {
  return (
    <div className="text-[14px] text-left">
      <div className="flex mb-1">
        <div className="w-36">Loan Number:</div>
        <div className="font-bold ml-2">{loan_number}</div>
      </div>
      <div className="flex mb-1">
        <div className="w-36">Borrower Name:</div>
        <div className="font-bold ml-2">{borrower_name}</div>
      </div>
      <div className="flex mb-1">
        <div className="w-36">Property Address:</div>
        <div className="font-bold ml-2">{property_address}</div>
      </div>
    </div>
  )
}
