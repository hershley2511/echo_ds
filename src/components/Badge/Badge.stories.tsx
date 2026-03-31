import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["Strong", "Subtle", "Outline", "Mixed"] },
    colour: { control: "select", options: ["Brand", "Success", "Warning", "Critical", "Neutral", "Info"] },
    size: { control: "select", options: ["sm", "xs"] },
    border: { control: "select", options: ["Default", "Rounded"] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Playground: Story = {
  args: { children: "Badge", variant: "Subtle", colour: "Brand", size: "sm", background: true },
}

export const AllColours: Story = {
  name: "Variant × Colour",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      {(["Strong", "Subtle", "Outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.5px" }}>{variant}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["Brand", "Success", "Info", "Warning", "Critical", "Neutral"] as const).map((colour) => (
              <Badge key={colour} variant={variant} colour={colour} size="sm">{colour}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter, sans-serif" }}>
      {(["sm", "xs"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, fontSize: 11, color: "#7C8094" }}>{size}</span>
          {(["Brand", "Success", "Warning", "Critical", "Neutral", "Info"] as const).map((colour) => (
            <Badge key={colour} size={size} variant="Subtle" colour={colour}>{colour}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const BorderStyles: Story = {
  name: "Border: Default vs Rounded",
  render: () => (
    <div style={{ display: "flex", gap: 12, fontFamily: "Inter, sans-serif" }}>
      <Badge variant="Subtle" colour="Brand" border="Default">Default</Badge>
      <Badge variant="Subtle" colour="Brand" border="Rounded">Rounded</Badge>
      <Badge variant="Strong" colour="Success" border="Default">Default</Badge>
      <Badge variant="Strong" colour="Success" border="Rounded">Rounded</Badge>
    </div>
  ),
}

export const StatusIndicator: Story = {
  name: "No Background (Status Indicator)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "Inter, sans-serif" }}>
      {(["Brand", "Success", "Info", "Warning", "Critical", "Neutral"] as const).map((colour) => (
        <Badge key={colour} colour={colour} background={false}>{colour} status</Badge>
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  name: "With Leading / Trailing Icons",
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontFamily: "Inter, sans-serif" }}>
      <Badge
        variant="Subtle" colour="Success" size="sm"
        showLeadingIcon leadingIcon={<span>✓</span>}
      >
        Verified
      </Badge>
      <Badge
        variant="Strong" colour="Critical" size="sm"
        showTrailingIcon trailingIcon={<span>!</span>}
      >
        Error
      </Badge>
      <Badge
        variant="Outline" colour="Info" size="sm"
        showLeadingIcon leadingIcon={<span>ℹ</span>}
      >
        Info
      </Badge>
    </div>
  ),
}
