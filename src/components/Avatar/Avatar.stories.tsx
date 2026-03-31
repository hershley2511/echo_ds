import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: { name: "Alice Tan", size: "md" },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Inter, sans-serif" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Avatar name="Alice Tan" size={s} />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  args: {
    name: "Bob Lee",
    src: "https://i.pravatar.cc/150?img=3",
    size: "md",
  },
}

export const AvatarGroup: Story = {
  name: "Avatar Group",
  render: () => (
    <div style={{ display: "flex", fontFamily: "Inter, sans-serif" }}>
      {["Alice", "Bob", "Carol", "Dave", "Eve"].map((name, i) => (
        <div key={name} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i }}>
          <Avatar name={name} size="md" showBorder />
        </div>
      ))}
    </div>
  ),
}
