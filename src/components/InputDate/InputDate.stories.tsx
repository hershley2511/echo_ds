import type { Meta, StoryObj } from "@storybook/react"
import { InputDate } from "./InputDate"

const meta: Meta<typeof InputDate> = {
  title: "Forms/InputDate",
  component: InputDate,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputDate>

export const Playground: Story = {
  args: { label: "Date of birth", isRequired: false },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <InputDate label="Default" />
      <InputDate label="With range" min="2024-01-01" max="2025-12-31" helperText="Must be in 2024–2025" />
      <InputDate label="Error" errorMessage="Please select a valid date" />
      <InputDate label="Disabled" isDisabled />
      <InputDate label="Required" isRequired />
    </div>
  ),
}
