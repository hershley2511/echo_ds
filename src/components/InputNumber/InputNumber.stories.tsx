import type { Meta, StoryObj } from "@storybook/react"
import { InputNumber } from "./InputNumber"

const meta: Meta<typeof InputNumber> = {
  title: "Forms/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputNumber>

export const Playground: Story = {
  args: { label: "Quantity", placeholder: "0", min: 0, max: 999 },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputNumber label="Default" placeholder="0" />
      <InputNumber label="With min/max" placeholder="0" min={0} max={100} helperText="Value between 0–100" />
      <InputNumber label="Error" placeholder="0" errorMessage="Value must be positive" />
      <InputNumber label="Disabled" placeholder="0" isDisabled />
    </div>
  ),
}

export const WithUnits: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputNumber label="Price" placeholder="0.00" prefix="SGD" />
      <InputNumber label="Weight" placeholder="0" suffix="kg" />
      <InputNumber label="Percentage" placeholder="0" suffix="%" min={0} max={100} />
    </div>
  ),
}
