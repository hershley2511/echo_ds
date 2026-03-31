import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Playground: Story = {
  args: { label: "Description", placeholder: "Enter description…", rows: 4 },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <Textarea label="Default" placeholder="Enter text…" />
      <Textarea label="With helper" placeholder="Enter text…" helperText="Max 500 characters" />
      <Textarea label="Error" placeholder="Enter text…" errorMessage="This field is required" />
      <Textarea label="Disabled" placeholder="Cannot edit" isDisabled />
    </div>
  ),
}

export const WithCharacterCount: Story = {
  name: "With Character Count",
  render: () => {
    const [val, setVal] = useState("")
    return (
      <div style={{ width: 360 }}>
        <Textarea
          label="Message"
          placeholder="Type your message…"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          maxLength={200}
          showCount
          rows={4}
        />
      </div>
    )
  },
}
