import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    colour: {
      control: "select",
      options: ["strong", "neutral", "subtle", "mix", "purple", "green", "mocha", "blue"],
    },
    size: { control: "select", options: ["md", "sm", "xs", "2xs"] },
    type: { control: "select", options: ["letter", "icon"] },
    state: { control: "select", options: ["default", "alert"] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  args: {
    initials: "JD",
    colour: "strong",
    size: "md",
    type: "letter",
    state: "default",
    dropdown: false,
  },
}

// All colour variants × default state
export const Colours: Story = {
  name: "Colour Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontFamily: "Inter, sans-serif", alignItems: "flex-end" }}>
      {(["strong", "neutral", "subtle", "mix", "purple", "green", "mocha", "blue"] as const).map((c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" colour={c} size="md" />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// All sizes (md, sm, xs, 2xs)
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end", fontFamily: "Inter, sans-serif" }}>
      {(["md", "sm", "xs", "2xs"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" size={s} colour="strong" />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

// All interaction states
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
        {(["default", "alert"] as const).map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Avatar initials="JD" state={s} colour="strong" size="md" />
            <span style={{ fontSize: 11, color: "#7C8094" }}>{s}</span>
          </div>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "#9A9FB8" }}>
        Hover and focus states are applied via CSS pseudo-classes — interact with the avatars above.
      </span>
    </div>
  ),
}

// Type: Letter vs Icon
export const Types: Story = {
  name: "Type: Letter vs Icon",
  render: () => (
    <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Avatar type="letter" initials="JD" colour="strong" size="md" />
        <span style={{ fontSize: 11, color: "#7C8094" }}>Letter</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Avatar type="icon" colour="strong" size="md" />
        <span style={{ fontSize: 11, color: "#7C8094" }}>Icon</span>
      </div>
    </div>
  ),
}

// With dropdown toggle
export const WithDropdown: Story = {
  name: "With Dropdown Arrow",
  render: () => (
    <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif" }}>
      {(["strong", "neutral", "green"] as const).map((c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Avatar initials="JD" colour={c} size="md" dropdown />
          <span style={{ fontSize: 11, color: "#7C8094" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
}

// All sizes × all states matrix
export const Matrix: Story = {
  name: "Size × State Matrix",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "Inter, sans-serif" }}>
      {(["default", "alert"] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 56, fontSize: 11, color: "#7C8094", textAlign: "right" }}>{s}</span>
          {(["md", "sm", "xs", "2xs"] as const).map((sz) => (
            <Avatar key={sz} initials="JD" colour="strong" size={sz} state={s} />
          ))}
        </div>
      ))}
    </div>
  ),
}

// Avatar group (stacked)
export const AvatarGroup: Story = {
  name: "Avatar Group",
  render: () => {
    const users = [
      { initials: "AT", colour: "strong" as const },
      { initials: "BL", colour: "green" as const },
      { initials: "CN", colour: "purple" as const },
      { initials: "DO", colour: "blue" as const },
      { initials: "EK", colour: "mocha" as const },
    ]
    return (
      <div style={{ display: "flex", fontFamily: "Inter, sans-serif" }}>
        {users.map((u, i) => (
          <div key={u.initials} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: users.length - i }}>
            <Avatar
              initials={u.initials}
              colour={u.colour}
              size="md"
              style={{ border: "2px solid white", borderRadius: "50%" }}
            />
          </div>
        ))}
        <div style={{ marginLeft: -10, zIndex: 0 }}>
          <Avatar
            type="letter"
            initials="+3"
            colour="neutral"
            size="md"
            style={{ border: "2px solid white", borderRadius: "50%" }}
          />
        </div>
      </div>
    )
  },
}
