type MagnumHPX = {
  role: string
  quest: MagnumHpxQuest[]
}

type MagnumHpxQuest = {
  question: string
  answer: string
}

type HpxMagnumPure = {
  CaseUuid: string
  CaseStatus: string
  CaseCompleteness: string
  LifeList: HpxLifeListMagnum[]
}

type HpxLifeListMagnum = {
  LifeIndex: string
  LifeStatus: string
  FullName: string
  Icon: string
  Forms: HPXFormMagnum[]
}

type HPXFormMagnum = {
  Type: string
  Title: string
  Preamble: string
  IsOptional: boolean
  Answer: string
  PostText: string
  ChildElements: HPXFormMagnum[]
}