import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu } from "./DropdownMenu"

const meta: Meta = {
  title: "Overlay/DropdownMenu",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const ITEMS = [
  { label: "Edit", value: "edit", icon: "✏️" },
  { label: "Duplicate", value: "duplicate", icon: "📋" },
  { label: "Share", value: "share", icon: "↗" },
  { label: "Delete", value: "delete", icon: "🗑️", isDanger: true, dividerBefore: true },
]

const Trigger = () => (
  <button
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 14px",
      background: "white",
      border: "1px solid #E2E7E9",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      color: "#424559",
    }}
  >
    Actions <span style={{ fontSize: 10 }}>▼</span>
  </button>
)

export const Playground: Story = {
  render: () => {
    const [last, setLast] = useState("")
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <DropdownMenu items={ITEMS} trigger={<Trigger />} onSelect={setLast} />
        {last && <span style={{ fontSize: 13, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>Selected: {last}</span>}
      </div>
    )
  },
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: 24 }}>
      {(["bottom-start", "bottom-end", "top-start", "top-end"] as const).map((p) => (
        <div key={p} style={{ display: "flex", justifyContent: "center" }}>
          <DropdownMenu
            items={ITEMS.slice(0, 3)}
            trigger={<button style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #E2E7E9", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 12 }}>{p}</button>}
            placement={p}
          />
        </div>
      ))}
    </div>
  ),
}
