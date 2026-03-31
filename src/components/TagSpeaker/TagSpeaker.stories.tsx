import type { Meta, StoryObj } from "@storybook/react"
import { TagSpeaker } from "./TagSpeaker"

const meta: Meta<typeof TagSpeaker> = {
  title: "Components/TagSpeaker",
  component: TagSpeaker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof TagSpeaker>

export const Playground: Story = {
  args: { label: "John Doe", isMuted: false, isActive: false },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontFamily: "Inter, sans-serif" }}>
      <TagSpeaker label="Default" />
      <TagSpeaker label="Active Speaker" isActive />
      <TagSpeaker label="Muted" isMuted />
    </div>
  ),
}
