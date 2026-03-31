import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputText } from "./InputText"

const meta: Meta<typeof InputText> = {
  title: "Forms/InputText",
  component: InputText,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputText>

export const Playground: Story = {
  args: { label: "Full name", placeholder: "Enter your name", size: "md" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputText label="Default" placeholder="Placeholder text" />
      <InputText label="With helper" placeholder="Enter value" helperText="This is helper text" />
      <InputText label="Error state" placeholder="Enter value" errorMessage="This field is required" />
      <InputText label="Disabled" placeholder="Cannot edit" isDisabled />
      <InputText label="Required" placeholder="Required field" isRequired />
    </div>
  ),
}

export const WithAddons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputText label="Website" placeholder="example.com" leftAddon="https://" />
      <InputText label="Username" placeholder="johndoe" rightAddon="@agency.gov.sg" />
      <InputText label="Price" placeholder="0.00" leftAddon="SGD" rightAddon=".00" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <InputText label="Small" placeholder="Small input" size="sm" />
      <InputText label="Medium" placeholder="Medium input" size="md" />
      <InputText label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
}
