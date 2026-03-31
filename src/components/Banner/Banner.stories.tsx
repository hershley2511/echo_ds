import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Banner } from "./Banner"

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Playground: Story = {
  args: {
    variant: "info",
    title: "Heads up!",
    description: "This is an informational banner with a helpful message.",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["info", "success", "warning", "critical"] as const).map((v) => (
        <Banner
          key={v}
          variant={v}
          title={`${v.charAt(0).toUpperCase() + v.slice(1)} banner`}
          description="This is a description that explains the status in more detail."
        />
      ))}
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Banner
        variant="warning"
        title="Action required"
        description="Please review the pending items before proceeding."
        onDismiss={() => setVisible(false)}
      />
    ) : (
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#7C8094" }}>Banner dismissed</div>
    )
  },
}
