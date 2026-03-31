import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Tag } from "./Tag"

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { children: "Tag label", colorScheme: "brand" },
}

export const AllColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontFamily: "Inter, sans-serif" }}>
      {(["brand", "success", "critical", "warning", "info", "neutral"] as const).map((cs) => (
        <Tag key={cs} colorScheme={cs}>{cs}</Tag>
      ))}
    </div>
  ),
}

export const WithRemove: Story = {
  name: "With Remove Button",
  render: () => {
    const [tags, setTags] = useState(["Design", "Research", "Prototype"])
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontFamily: "Inter, sans-serif" }}>
        {tags.map((t) => (
          <Tag key={t} colorScheme="brand" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    )
  },
}
