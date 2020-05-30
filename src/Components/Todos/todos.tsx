import * as React from "react"
import { useState } from "react"

const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    resetValue: () => setValue("")
  }
}

export default ({ onSubmit }: { onSubmit: any }) => {
  const { resetValue, ...text } = useInputValue("")

  return (
    <form onSubmit={
      (e) => {
        e.preventDefault()
        onSubmit(text.value)
        resetValue()
      }
    }>
      <input type="text" placeholder="Add a TODO" className="text-center" {...text} />
    </form>
  )
}