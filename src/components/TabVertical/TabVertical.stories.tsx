import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TabVertical } from "./TabVertical"

const meta: Meta = {
  title: "Navigation/TabVertical",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

const TABS = [
  { label: "Dashboard", value: "dashboard", icon: "📊" },
  { label: "Reports", value: "reports", icon: "📄", badge: 2 },
  { label: "Users", value: "users", icon: "👥", badge: 14 },
  { label: "Settings", value: "settings", icon: "⚙️" },
  { label: "Disabled", value: "disabled", icon: "🔒", isDisabled: true },
]

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState("dashboard")
    return (
      <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif" }}>
        <TabVertical tabs={TABS} value={active} onChange={setActive} />
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            background: "#F8F9F9",
            borderRadius: 8,
            fontSize: 14,
            color: "#7C8094",
          }}
        >
          Active: <strong style={{ color: "#424559" }}>{active}</strong>
        </div>
      </div>
    )
  },
}
