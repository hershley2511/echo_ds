import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputCombobox } from "./InputCombobox"

const meta: Meta = {
  title: "Forms/InputCombobox",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const COUNTRIES = [
  { label: "Singapore", value: "sg" },
  { label: "Malaysia", value: "my" },
  { label: "Indonesia", value: "id" },
  { label: "Thailand", value: "th" },
  { label: "Philippines", value: "ph" },
  { label: "Vietnam", value: "vn" },
  { label: "Cambodia", value: "kh" },
  { label: "Myanmar", value: "mm" },
]

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState("")
    return (
      <div style={{ width: 300 }}>
        <InputCombobox
          label="Country"
          options={COUNTRIES}
          value={val}
          onChange={setVal}
          placeholder="Search or select a country…"
          isRequired
        />
      </div>
    )
  },
}

export const WithError: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <InputCombobox
        label="Country"
        options={COUNTRIES}
        value=""
        onChange={() => {}}
        errorMessage="Please select a country"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <InputCombobox
        label="Country"
        options={COUNTRIES}
        value="sg"
        onChange={() => {}}
        isDisabled
      />
    </div>
  ),
}
