import { useRef } from 'react'

type IDebaunceProps = {
  fn: (search: any) => void
  delay: number
}

export const useDebaunce = ({ fn, delay }: IDebaunceProps) => {
  const timeoutRef = useRef(null) as any

  function debounceFn(search: any) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(search)
    }, delay)
  }

  return debounceFn
}

type IDebaunceSelectProps = {
  fn: (search: any) => Promise<any>
  delay: number
}

export const useDebaunceSelect = ({ fn, delay }: IDebaunceSelectProps) => {
  const timeoutRef = useRef(null) as any

  async function debounceFn(search: any) {
    return await new Promise((resolve, reject) => {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(async () => {
        try {
          const response = await fn(search)
          resolve(response)
        } catch (err) {
          reject(err)
        }
      }, delay)
    })
  }

  return debounceFn
}
