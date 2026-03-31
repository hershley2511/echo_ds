import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip } from "./Tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  args: { label: "Helpful tooltip text", placement: "top" },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E2E7E9", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
        Hover me
      </button>
    </Tooltip>
  ),
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: 32, padding: 48, fontFamily: "Inter, sans-serif" }}>
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Tooltip key={p} label={`Placement: ${p}`} placement={p}>
          <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E2E7E9", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
}
