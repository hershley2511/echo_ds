import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "./Sidebar"

const meta: Meta = {
  title: "Navigation/Sidebar",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const NAV_ITEMS = [
  { label: "Dashboard", value: "dashboard", icon: "📊" },
  { label: "Cases", value: "cases", icon: "📁", badge: 5 },
  { label: "Reports", value: "reports", icon: "📄" },
  {
    label: "Users",
    value: "users",
    icon: "👥",
    children: [
      { label: "All Users", value: "users-all" },
      { label: "Admins", value: "users-admins" },
    ],
  },
  { label: "Settings", value: "settings", icon: "⚙️" },
]

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState("dashboard")
    return (
      <div style={{ display: "flex", height: "500px" }}>
        <Sidebar
          items={NAV_ITEMS}
          activeValue={active}
          onSelect={setActive}
          logo={
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16, color: "#026257" }}>
              Echo DS
            </span>
          }
          footer={
            <span style={{ fontSize: 12, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
              v1.0.0
            </span>
          }
        />
        <div style={{ flex: 1, padding: 24, background: "#F8F9F9", fontSize: 14, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
          Active: <strong style={{ color: "#424559" }}>{active}</strong>
        </div>
      </div>
    )
  },
}

export const Collapsed: Story = {
  render: () => {
    const [active, setActive] = useState("dashboard")
    return (
      <div style={{ display: "flex", height: "500px" }}>
        <Sidebar
          items={NAV_ITEMS}
          activeValue={active}
          onSelect={setActive}
          isCollapsed
          logo={<span style={{ fontSize: 20 }}>🌿</span>}
        />
        <div style={{ flex: 1, padding: 24, background: "#F8F9F9", fontSize: 14, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
          Active: <strong style={{ color: "#424559" }}>{active}</strong>
        </div>
      </div>
    )
  },
}
