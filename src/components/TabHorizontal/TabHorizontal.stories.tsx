import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TabHorizontal } from "./TabHorizontal"

const meta: Meta = {
  title: "Navigation/TabHorizontal",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Details", value: "details", badge: 3 },
  { label: "History", value: "history" },
  { label: "Settings", value: "settings", isDisabled: true },
]

export const Underline: Story = {
  render: () => {
    const [active, setActive] = useState("overview")
    return (
      <div>
        <TabHorizontal tabs={TABS} value={active} onChange={setActive} />
        <div style={{ padding: "20px 0", fontSize: 14, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
          Active tab: <strong>{active}</strong>
        </div>
      </div>
    )
  },
}

export const Pill: Story = {
  render: () => {
    const [active, setActive] = useState("overview")
    return (
      <div>
        <TabHorizontal tabs={TABS} value={active} onChange={setActive} variant="pill" />
        <div style={{ padding: "16px 0", fontSize: 14, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
          Active tab: <strong>{active}</strong>
        </div>
      </div>
    )
  },
}
