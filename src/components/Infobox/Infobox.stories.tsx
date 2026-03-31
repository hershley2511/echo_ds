import type { Meta, StoryObj } from "@storybook/react"
import { Infobox } from "./Infobox"

const meta: Meta<typeof Infobox> = {
  title: "Feedback/Infobox",
  component: Infobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Infobox>

export const Playground: Story = {
  args: {
    variant: "info",
    title: "Did you know?",
    children: "You can customise your notification preferences in the settings panel.",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
      {(["info", "success", "warning", "critical", "neutral"] as const).map((v) => (
        <Infobox key={v} variant={v} title={`${v.charAt(0).toUpperCase() + v.slice(1)} infobox`}>
          This infobox provides contextual information relevant to the current task or page.
        </Infobox>
      ))}
    </div>
  ),
}
