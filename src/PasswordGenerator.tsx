import { ChangeEvent, useEffect, useState } from 'react'
import './PasswordGenerator.css'
import {
  PasswordSelectOptions,
  PasswordStrength,
  PasswordStrengthType,
  PasswordType,
  generateRandomPassword,
  generateMemorablePassword,
  generatePinPassword,
} from './passwordGeneratorUtils'

function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState<number>(16)
  const [isNumbersSelected, setIsNumbersSelected] = useState<boolean>(true)
  const [isSymbolsSelected, setIsSymbolsSelected] = useState<boolean>(true)
  const [generateNewPassword, setGenerateNewPassword] = useState<boolean>(false)
  const [isPasswordCopied, setIsPasswordCopied] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthType>(PasswordStrength.Weak)
  const [passwordType, setPasswordType] = useState<PasswordType>(
    PasswordSelectOptions.Random
  )
  const [password, setPassword] = useState<string>('')

  // generates a new password when a password option has changed
  useEffect(() => {
    if (generateNewPassword) {
      setGenerateNewPassword(false)
    }

    setIsPasswordCopied(false)

    let newPassword: string = ''
    if (passwordType === PasswordSelectOptions.Random) {
      newPassword = generateRandomPassword(
        passwordLength,
        isNumbersSelected,
        isSymbolsSelected
      )
    } else if (passwordType === PasswordSelectOptions.Memorable) {
      newPassword = generateMemorablePassword(passwordLength)
    } else if (passwordType === PasswordSelectOptions.Pin) {
      newPassword = generatePinPassword(passwordLength)
    }
    setPassword(newPassword)
  }, [
    isNumbersSelected,
    isSymbolsSelected,
    passwordLength,
    generateNewPassword,
    passwordType,
  ])

  // update the password strength based off the password character length
  useEffect(() => {
    if (password.length < 8) {
      setPasswordStrength(PasswordStrength.Weak)
    } else if (password.length >= 8 && password.length < 12) {
      setPasswordStrength(PasswordStrength.Good)
    } else if (password.length >= 12) {
      setPasswordStrength(PasswordStrength.Strong)
    }
  }, [password])

  function copyPassword() {
    navigator.clipboard.writeText(password)
    setIsPasswordCopied(true)
  }

  return (
    <div className="password-generator" data-testid="password-generator">
      <div className="password-generator-container">
        <h1>Password Generator</h1>
        <div className="password-box">
          <span className="password-field">{password}</span>
        </div>
        <div className="inline-container">
          <label>Password Strength:</label>
          <span>{passwordStrength}</span>
        </div>
        <div className="password-buttons">
          <button onClick={() => setGenerateNewPassword(true)}>
            Generate New Password
          </button>
          <button onClick={copyPassword}>
            {isPasswordCopied ? 'Password Copied!' : 'Copy Password'}
          </button>
        </div>
        <div className="inline-container">
          <label>Password Type:</label>
          <select
            value={passwordType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPasswordType(e.target.value as PasswordSelectOptions)
            }
          >
            <option value={PasswordSelectOptions.Random}>Random</option>
            <option value={PasswordSelectOptions.Memorable}>Memorable</option>
            <option value={PasswordSelectOptions.Pin}>Pin</option>
          </select>
        </div>
        <div className="inline-container">
          <label>Length:</label>
          <input
            type="range"
            min={4}
            max={20}
            value={passwordLength}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordLength(Number(e.target.value))
            }
          />
          <span>{passwordLength}</span>
        </div>
        {passwordType === PasswordSelectOptions.Random && (
          <>
            <div className="inline-container">
              <label>Numbers:</label>
              <input
                type="checkbox"
                checked={isNumbersSelected}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIsNumbersSelected(e.target.checked)
                }
              />
            </div>
            <div className="inline-container">
              <label>Symbols:</label>
              <input
                type="checkbox"
                checked={isSymbolsSelected}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIsSymbolsSelected(e.target.checked)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PasswordGenerator
