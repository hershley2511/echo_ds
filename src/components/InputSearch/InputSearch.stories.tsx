import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputSearch } from "./InputSearch"

const meta: Meta<typeof InputSearch> = {
  title: "Forms/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof InputSearch>

export const Playground: Story = {
  args: { placeholder: "Search…", size: "md" },
}

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState("")
    return (
      <div style={{ width: 320 }}>
        <InputSearch
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal("")}
          placeholder="Search records…"
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <InputSearch key={s} size={s} placeholder={`${s} search`} />
      ))}
    </div>
  ),
}
