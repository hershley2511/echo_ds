import type { Meta, StoryObj } from "@storybook/react"
import { Link } from "./Link"

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    colour: { control: "select", options: ["Link", "Neutral"] },
    size: { control: "select", options: ["md", "sm", "xs"] },
    state: { control: "select", options: ["Default", "Hover", "Disabled", "Focus"] },
    iconPosition: { control: "select", options: ["None", "Left", "Right"] },
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Playground: Story = {
  args: { children: "Click here", colour: "Link", size: "md", state: "Default", iconPosition: "None", href: "#" },
}

export const Colours: Story = {
  name: "Colour × State",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "Inter, sans-serif" }}>
      {(["Link", "Neutral"] as const).map((colour) => (
        <div key={colour} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.5px" }}>{colour}</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {(["Default", "Hover", "Focus", "Disabled"] as const).map((state) => (
              <div key={state} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
                <Link href="#" colour={colour} size="md" state={state}>{state}</Link>
                <span style={{ fontSize: 10, color: "#9A9FB8" }}>{state}</span>
              </div>
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
      {(["md", "sm", "xs"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 24, fontSize: 11, color: "#7C8094" }}>{size}</span>
          <Link href="#" colour="Link" size={size}>Read more</Link>
          <Link href="#" colour="Neutral" size={size}>Learn more</Link>
        </div>
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  name: "Icon Positions",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter, sans-serif" }}>
      {(["None", "Left", "Right"] as const).map((pos) => (
        <div key={pos} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 40, fontSize: 11, color: "#7C8094" }}>{pos}</span>
          <Link href="#" colour="Link" size="md" iconPosition={pos}>Go to page</Link>
        </div>
      ))}
    </div>
  ),
}
