import type { Meta, StoryObj } from "@storybook/react"
import { InputPhone } from "./InputPhone"

const meta: Meta<typeof InputPhone> = {
  title: "Forms/InputPhone",
  component: InputPhone,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputPhone>

export const Playground: Story = {
  args: { label: "Mobile number", placeholder: "9123 4567", countryCode: "+65" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputPhone label="Default" />
      <InputPhone label="With helper" helperText="Singapore mobile numbers only" />
      <InputPhone label="Error" errorMessage="Please enter a valid phone number" />
      <InputPhone label="Disabled" isDisabled />
    </div>
  ),
}
