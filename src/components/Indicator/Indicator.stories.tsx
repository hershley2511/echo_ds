import type { Meta, StoryObj } from "@storybook/react"
import { Indicator } from "./Indicator"

const meta: Meta<typeof Indicator> = {
  title: "Components/Indicator",
  component: Indicator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Indicator>

export const Playground: Story = {
  args: { status: "active", size: "sm" },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "Inter, sans-serif" }}>
      {(["active", "inactive", "warning", "error", "info"] as const).map((s) => (
        <Indicator key={s} status={s} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Indicator key={s} status="active" size={s} label={`Size ${s}`} />
      ))}
    </div>
  ),
}
