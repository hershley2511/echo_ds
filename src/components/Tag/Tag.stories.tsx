import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Tag } from "./Tag"

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["Subtle", "Outline", "Strong"] },
    colour: { control: "select", options: ["Brand", "Teal", "Lime", "Cyan", "Orange", "Purple", "Red", "Pink", "Gray", "White"] },
    size: { control: "select", options: ["md", "sm", "xs"] },
    border: { control: "select", options: ["Default", "Rounded"] },
    state: { control: "select", options: ["Default", "Disabled"] },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { children: "Label", variant: "Subtle", colour: "Brand", size: "md", border: "Default" },
}

export const AllColours: Story = {
  name: "All Colours × Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      {(["Subtle", "Outline", "Strong"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.5px" }}>{variant}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(["Brand", "Teal", "Lime", "Cyan", "Orange", "Purple", "Red", "Pink", "Gray"] as const).map((colour) => (
              <Tag key={colour} variant={variant} colour={colour} size="md">{colour}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "Inter, sans-serif" }}>
      {(["md", "sm", "xs"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, fontSize: 11, color: "#7C8094" }}>{size}</span>
          <Tag colour="Brand" variant="Subtle" size={size}>Design</Tag>
          <Tag colour="Teal" variant="Subtle" size={size}>Research</Tag>
          <Tag colour="Purple" variant="Subtle" size={size}>Strategy</Tag>
        </div>
      ))}
    </div>
  ),
}

export const BorderStyles: Story = {
  name: "Border: Default vs Rounded",
  render: () => (
    <div style={{ display: "flex", gap: 10, fontFamily: "Inter, sans-serif" }}>
      <Tag colour="Brand" border="Default">Default</Tag>
      <Tag colour="Brand" border="Rounded">Rounded</Tag>
      <Tag colour="Purple" variant="Strong" border="Default">Default</Tag>
      <Tag colour="Purple" variant="Strong" border="Rounded">Rounded</Tag>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "Inter, sans-serif" }}>
      {(["Default", "Disabled"] as const).map((state) => (
        <div key={state} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 56, fontSize: 11, color: "#7C8094" }}>{state}</span>
          <Tag colour="Brand" state={state}>Label</Tag>
          <Tag colour="Teal" variant="Outline" state={state}>Label</Tag>
          <Tag colour="Red" variant="Strong" state={state}>Label</Tag>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "#9A9FB8", marginTop: 4 }}>
        Hover and focus states are applied via CSS pseudo-classes — interact with the tags above.
      </div>
    </div>
  ),
}

export const WithRemove: Story = {
  name: "With Remove Button",
  render: () => {
    const [tags, setTags] = useState([
      { id: "design", label: "Design", colour: "Brand" as const },
      { id: "research", label: "Research", colour: "Teal" as const },
      { id: "strategy", label: "Strategy", colour: "Purple" as const },
      { id: "ux", label: "UX Writing", colour: "Cyan" as const },
    ])
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontFamily: "Inter, sans-serif" }}>
        {tags.map((t) => (
          <Tag
            key={t.id}
            colour={t.colour}
            variant="Subtle"
            border="Rounded"
            onRemove={() => setTags((prev) => prev.filter((x) => x.id !== t.id))}
          >
            {t.label}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 13, color: "#7C8094" }}>All tags removed</span>
        )}
      </div>
    )
  },
}
