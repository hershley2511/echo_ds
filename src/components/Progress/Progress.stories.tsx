import { useState, useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./Progress"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Playground: Story = {
  args: { value: 60, colorScheme: "brand", size: "md", label: "Progress", showValue: true },
}

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 400, fontFamily: "Inter, sans-serif" }}>
      {(["brand", "success", "critical", "warning", "info"] as const).map((cs) => (
        <Progress key={cs} value={65} colorScheme={cs} label={cs} showValue size="md" />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 400 }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Progress key={s} value={70} size={s} label={`Size ${s}`} />
      ))}
    </div>
  ),
}

export const Animated: Story = {
  render: () => {
    const [val, setVal] = useState(0)
    useEffect(() => {
      const t = setInterval(() => setVal((v) => (v >= 100 ? 0 : v + 5)), 200)
      return () => clearInterval(t)
    }, [])
    return (
      <div style={{ width: 400 }}>
        <Progress value={val} showValue label="Loading…" colorScheme="brand" size="md" />
      </div>
    )
  },
}
