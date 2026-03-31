import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputCheckbox } from "./InputCheckbox"

const meta: Meta = {
  title: "Forms/InputCheckbox",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const OPTIONS = [
  { label: "Email notifications", value: "email", description: "Receive updates via email" },
  { label: "SMS alerts", value: "sms" },
  { label: "Push notifications", value: "push" },
  { label: "Unavailable option", value: "other", isDisabled: true },
]

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState(["email"])
    return (
      <InputCheckbox
        label="Notification preferences"
        options={OPTIONS}
        value={val}
        onChange={setVal}
      />
    )
  },
}

export const SingleCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <InputCheckbox
        checked={checked}
        onCheckedChange={setChecked}
        checkboxLabel="I agree to the terms and conditions"
      />
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([])
    return (
      <InputCheckbox
        label="Select days"
        options={["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => ({ label: d, value: d.toLowerCase() }))}
        value={val}
        onChange={setVal}
        orientation="horizontal"
      />
    )
  },
}
