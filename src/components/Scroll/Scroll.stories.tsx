import type { Meta, StoryObj } from "@storybook/react"
import { Scroll } from "./Scroll"

const meta: Meta<typeof Scroll> = {
  title: "Components/Scroll",
  component: Scroll,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Scroll>

const ITEMS = Array.from({ length: 20 }, (_, i) => `Item ${i + 1} — lorem ipsum dolor sit amet`)

export const Playground: Story = {
  render: () => (
    <Scroll maxH="240px" style={{ width: 320 }}>
      {ITEMS.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "10px 14px",
            borderBottom: "1px solid #E2E7E9",
            fontSize: 14,
            color: "#424559",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {item}
        </div>
      ))}
    </Scroll>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Scroll direction="horizontal" maxW="320px">
      <div style={{ display: "flex", gap: 8, padding: 8, width: "max-content" }}>
        {ITEMS.slice(0, 10).map((item, i) => (
          <div
            key={i}
            style={{
              minWidth: 160,
              padding: "10px 14px",
              background: "#F0F1F9",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </Scroll>
  ),
}

export const HiddenScrollbar: Story = {
  name: "Hidden Scrollbar",
  render: () => (
    <Scroll maxH="200px" showScrollbar={false} style={{ width: 300 }}>
      {ITEMS.map((item, i) => (
        <div
          key={i}
          style={{ padding: "8px 12px", fontSize: 13, color: "#424559", fontFamily: "Inter, sans-serif" }}
        >
          {item}
        </div>
      ))}
    </Scroll>
  ),
}
