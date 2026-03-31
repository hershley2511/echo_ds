import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputRadio } from "./InputRadio"

const meta: Meta = {
  title: "Forms/InputRadio",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const OPTIONS = [
  { label: "Option A", value: "a", description: "First choice" },
  { label: "Option B", value: "b", description: "Second choice" },
  { label: "Option C", value: "c" },
  { label: "Disabled", value: "d", isDisabled: true },
]

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState("a")
    return (
      <InputRadio
        label="Choose an option"
        options={OPTIONS}
        value={val}
        onChange={setVal}
        isRequired
      />
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    const [val, setVal] = useState("yes")
    return (
      <InputRadio
        label="Do you agree?"
        options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
        value={val}
        onChange={setVal}
        orientation="horizontal"
      />
    )
  },
}

export const WithError: Story = {
  render: () => (
    <InputRadio
      label="Required selection"
      options={OPTIONS.slice(0, 3)}
      value=""
      onChange={() => {}}
      errorMessage="Please select an option"
    />
  ),
}
