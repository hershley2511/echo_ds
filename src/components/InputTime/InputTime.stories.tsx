import type { Meta, StoryObj } from "@storybook/react"
import { InputTime } from "./InputTime"

const meta: Meta<typeof InputTime> = {
  title: "Forms/InputTime",
  component: InputTime,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputTime>

export const Playground: Story = {
  args: { label: "Start time" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <InputTime label="Default" />
      <InputTime label="With helper" helperText="24-hour format" />
      <InputTime label="Error" errorMessage="Please select a valid time" />
      <InputTime label="Disabled" isDisabled />
    </div>
  ),
}
