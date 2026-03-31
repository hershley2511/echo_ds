import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InputMultiselect } from "./InputMultiselect"

const meta: Meta = {
  title: "Forms/InputMultiselect",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

const SKILLS = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "ts" },
  { label: "Figma", value: "figma" },
  { label: "Node.js", value: "node" },
  { label: "Python", value: "python" },
  { label: "GraphQL", value: "graphql" },
  { label: "Docker", value: "docker" },
]

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState<string[]>(["react"])
    return (
      <div style={{ width: 320 }}>
        <InputMultiselect
          label="Skills"
          options={SKILLS}
          value={val}
          onChange={setVal}
          placeholder="Select skills…"
        />
      </div>
    )
  },
}

export const WithMaxItems: Story = {
  name: "With Max Items",
  render: () => {
    const [val, setVal] = useState<string[]>([])
    return (
      <div style={{ width: 320 }}>
        <InputMultiselect
          label="Select up to 3 skills"
          options={SKILLS}
          value={val}
          onChange={setVal}
          maxItems={3}
          helperText="Maximum 3 selections"
        />
      </div>
    )
  },
}
