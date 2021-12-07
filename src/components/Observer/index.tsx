import { FC, useEffect, useRef } from 'react'

interface Props {
  callback(): void
}

export const Observer: FC<Props> = ({ callback }) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([div]) => {
      if (div.isIntersecting) {
        observer.disconnect()
        callback()
      }
    })

    observer.observe(observerRef.current as Element)

    return () => observer.disconnect()
  }, [])

  return <div ref={observerRef} style={{ width: '100%', height: 40 }}></div>
}
