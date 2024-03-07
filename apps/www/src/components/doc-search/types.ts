type Highlight = {
  value: string
  matchLevel: string
  matchedWords: string[]
}

type Fields<T> = {
  objectID: T
  name: T
  summary: T
}

export type Hit = Fields<string> & {
  __position: number
  _highlightResult: Fields<Highlight>
}
