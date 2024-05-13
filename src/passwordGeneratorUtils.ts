export enum PasswordStrength {
  Weak = 'Weak',
  Good = 'Good',
  Strong = 'Strong',
}
export type PasswordStrengthType = keyof typeof PasswordStrength

export enum PasswordSelectOptions {
  Random = 'Random',
  Memorable = 'Memorable',
  Pin = 'Pin',
}
export type PasswordType = keyof typeof PasswordSelectOptions

const CHAR_SET: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUM_SET: string = '1234567890'
const SYMBOL_SET: string = '~!@#$%^&*()_-+=[]{};:,.<>?'
const WORD_BANK: string[] = [
  'cats',
  'dogs',
  'fish',
  'bird',
  'bear',
  'lion',
  'deer',
  'frog',
  'duck',
  'wolf',
  'lamp',
  'tree',
  'moon',
  'star',
  'book',
  'rain',
  'cake',
  'fire',
  'hair',
  'lamb',
  'frog',
  'song',
  'leaf',
  'lake',
  'love',
  'rose',
  'toys',
  'wind',
  'wine',
  'time',
]

export function generateRandomPassword(
  length: number,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  let charSet: string = CHAR_SET

  if (includeNumbers) charSet += NUM_SET
  if (includeSymbols) charSet += SYMBOL_SET

  let randomPassword: string = ''
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charSet.length)
    randomPassword += charSet.charAt(randomIndex)
  }

  return randomPassword
}

export function generateMemorablePassword(length: number): string {
  let wordSet: string[] = WORD_BANK
  let words: string[] = []
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * wordSet.length)
    words.push(wordSet[randomIndex])
  }
  const memorablePassword: string = words.join('-')
  return memorablePassword
}

export function generatePinPassword(length: number): string {
  let charSet: string = NUM_SET

  let randomPassword: string = ''
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charSet.length)
    randomPassword += charSet.charAt(randomIndex)
  }

  return randomPassword
}
