import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Toast } from "./Toast"

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { variant: "success", title: "Changes saved", description: "Your changes have been saved successfully." },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Toast variant="info" title="Info" description="Here is some useful information." />
      <Toast variant="success" title="Success" description="Operation completed successfully." />
      <Toast variant="warning" title="Warning" description="Please review before continuing." />
      <Toast variant="critical" title="Error" description="Something went wrong. Please try again." />
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [toasts, setToasts] = useState([
      { id: 1, variant: "success" as const, title: "Saved", description: "Your file has been saved." },
      { id: 2, variant: "info" as const, title: "Update available", description: "A new version is ready." },
    ])
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          />
        ))}
        {toasts.length === 0 && (
          <span style={{ fontSize: 13, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>All toasts dismissed</span>
        )}
      </div>
    )
  },
}
