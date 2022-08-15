export interface ILLPA {
  name: string
  isEnabled: boolean
  from: number
  to: number
}

export interface IPrice_Program_Price {
  LockTermPrices: {
    LockDay: string
    BasePrice: number
    LockTermLLPA: number
    Price: string
    Escrow: any
  }[]
  Rate: number
}

export interface IPrice_Program {
  CalcHistory: string[]
  LLPA: { [key: string]: ILLPA }
  LTV: { from: number; to: number }
  Margin: number
  ProgramID: number
  ProgramName: string
  Prices: IPrice_Program_Price[]
}

export interface IPrice {
  ProductID: number
  ProductName: string
  Programs: IPrice_Program[]
}

export interface IInElibileProduct {
  [key: string]: {
    name: string
    value: string
    description: string
    ltvMaxCalcHistory?: string[]
  }[]
}

export interface IProduct {
  Id: number
  Description: string
  IsInterestOnly: boolean
  Power: boolean
  Term: boolean
  Type: string
}

export interface IProgram {
  ID: number
  Name: string
}

export interface ILoanProcess {
  type: string
  program: string
  rate: number
  price: number
  sheetDate: string
  lockDays: number
  lockedDate: string
  rateLocked: boolean
}

export interface IPriceLimit {
  Rate: number
  aiv_ltv?: number
  arv_ltv?: number
  ltc?: number
  ltp?: number
  max_aiv_ltv?: number
  max_arv_ltv?: number
  max_ltc?: number
  max_ltp?: number
}
