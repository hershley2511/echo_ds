import type { Meta, StoryObj } from "@storybook/react"
import { Table } from "./Table"

const meta: Meta<typeof Table> = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Table>

const COLUMNS = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status", width: "120px", render: (val: unknown) => {
    const colors: Record<string, { bg: string; color: string }> = {
      Active: { bg: "#F1FFE5", color: "#009D7B" },
      Inactive: { bg: "#F0F1F9", color: "#838894" },
      Pending: { bg: "#FFFAE2", color: "#8B6005" },
    }
    const s = colors[val as string] ?? { bg: "#F0F1F9", color: "#838894" }
    return (
      <span style={{
        display: "inline-flex",
        padding: "2px 8px",
        borderRadius: 999,
        background: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 600,
      }}>
        {String(val)}
      </span>
    )
  }},
  { key: "role", header: "Role", sortable: true },
  { key: "joined", header: "Joined", sortable: true, width: "120px" },
]

const DATA = [
  { name: "Alice Tan", status: "Active", role: "Admin", joined: "2023-01-15" },
  { name: "Bob Lim", status: "Pending", role: "Editor", joined: "2023-03-22" },
  { name: "Carol Ng", status: "Active", role: "Viewer", joined: "2023-05-10" },
  { name: "David Ong", status: "Inactive", role: "Editor", joined: "2022-11-08" },
  { name: "Eve Koh", status: "Active", role: "Admin", joined: "2024-02-01" },
]

export const Playground: Story = {
  args: { columns: COLUMNS, data: DATA },
}

export const Striped: Story = {
  args: { columns: COLUMNS, data: DATA, isStriped: true },
}

export const Bordered: Story = {
  args: { columns: COLUMNS, data: DATA, isBordered: true },
}

export const Empty: Story = {
  args: { columns: COLUMNS, data: [], emptyMessage: "No records found" },
}

export const Loading: Story = {
  args: { columns: COLUMNS, data: [], isLoading: true },
}
