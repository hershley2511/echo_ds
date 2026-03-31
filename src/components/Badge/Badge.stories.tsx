import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Playground: Story = {
  args: { children: "Badge", colorScheme: "brand", variant: "subtle", size: "md" },
}

export const AllVariants: Story = {
  name: "All Variants × Color Schemes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "Inter, sans-serif" }}>
      {(["brand", "success", "critical", "warning", "info", "neutral"] as const).map((cs) => (
        <div key={cs} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 70, fontSize: 12, color: "#7C8094" }}>{cs}</span>
          {(["solid", "subtle", "outline"] as const).map((v) => (
            <Badge key={v} colorScheme={cs} variant={v}>{cs}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Inter, sans-serif" }}>
      <Badge size="sm" colorScheme="brand">Small</Badge>
      <Badge size="md" colorScheme="brand">Medium</Badge>
    </div>
  ),
}
