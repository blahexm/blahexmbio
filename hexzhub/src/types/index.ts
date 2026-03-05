export interface BloxAccount {
  id?: number
  username: string
  level: number
  bounty: number
  money: number
  fragments: number
  online: boolean
  updated_at: string
  pc?: string
}

export interface AccessKey {
  key_value: string
  label: string
  active: boolean
}

export type GameId = 'bloxfruits'

export interface Game {
  id: GameId
  name: string
  description: string
  image: string
  available: boolean
  route: string
}
