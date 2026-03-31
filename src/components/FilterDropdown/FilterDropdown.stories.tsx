import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FilterDropdown } from "./FilterDropdown"

const meta: Meta = {
  title: "Overlay/FilterDropdown",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const STATUS_OPTIONS = [
  { label: "Active", value: "active", count: 12 },
  { label: "Pending", value: "pending", count: 5 },
  { label: "Inactive", value: "inactive", count: 3 },
  { label: "Archived", value: "archived", count: 8 },
]

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>([])
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
        <FilterDropdown label="Status" options={STATUS_OPTIONS} value={val} onChange={setVal} />
        {val.length > 0 && (
          <span style={{ fontSize: 12, color: "#7C8094", fontFamily: "Inter, sans-serif" }}>
            Active filters: {val.join(", ")}
          </span>
        )}
      </div>
    )
  },
}

export const MultipleFilters: Story = {
  name: "Multiple Filter Dropdowns",
  render: () => {
    const [status, setStatus] = useState<string[]>([])
    const [type, setType] = useState<string[]>([])
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: "Inter, sans-serif" }}>
        <FilterDropdown
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
        />
        <FilterDropdown
          label="Type"
          options={[
            { label: "Individual", value: "individual" },
            { label: "Business", value: "business" },
            { label: "Government", value: "govt" },
          ]}
          value={type}
          onChange={setType}
        />
      </div>
    )
  },
}
