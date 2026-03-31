import type { Meta, StoryObj } from "@storybook/react"
import tokensRaw from "../../tokens.json"

const tokens = tokensRaw.ScamShield

// ── Helpers ──────────────────────────────────────────────────────────────────

interface SwatchProps {
  label: string
  value: string
  token?: string
  dark?: boolean
}

function Swatch({ label, value, token, dark }: SwatchProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 72 }}>
      <div
        style={{
          width: 72,
          height: 48,
          background: value,
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      />
      <span style={{ fontSize: 11, fontWeight: 600, color: "#424559" }}>{label}</span>
      {token && <span style={{ fontSize: 10, color: "#7C8094" }}>{token}</span>}
      <span style={{ fontSize: 10, color: "#9A9FB8" }}>{value}</span>
    </div>
  )
}

interface PaletteProps {
  name: string
  shades: Record<string, { value: string }>
}

function Palette({ name, shades }: PaletteProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, textTransform: "capitalize", color: "#424559" }}>
        {name}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {Object.entries(shades).map(([shade, { value }]) => (
          <Swatch key={shade} label={shade} value={value} />
        ))}
      </div>
    </div>
  )
}

interface SemanticGroupProps {
  title: string
  items: { label: string; value: string; token: string }[]
  dark?: boolean
}

function SemanticGroup({ title, items, dark }: SemanticGroupProps) {
  return (
    <div
      style={{
        padding: 16,
        background: dark ? "#1F2233" : "#F8F9F9",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: dark ? "#F0F1F9" : "#424559" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {items.map(({ label, value, token }) => (
          <Swatch key={token} label={label} value={value} token={token} />
        ))}
      </div>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj

// ── Stories ───────────────────────────────────────────────────────────────────

type PrimitiveKey = keyof typeof tokens.color.primitives
const EXCLUDED_PRIMITIVES = ["standard"]

export const Primitives: Story = {
  name: "Primitive Palette",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif" }}>
      {(Object.entries(tokens.color.primitives) as [PrimitiveKey, Record<string, { value: string }>][])
        .filter(([key]) => !EXCLUDED_PRIMITIVES.includes(key))
        .map(([name, shades]) => (
          <Palette key={name} name={name} shades={shades} />
        ))}
    </div>
  ),
}

export const Interaction: Story = {
  name: "Semantic — Interaction",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      <SemanticGroup
        title="Main (Brand)"
        items={[
          { label: "Default",  value: "#026257", token: "interaction.main.default" },
          { label: "Hover",    value: "#017B68", token: "interaction.main.hover" },
          { label: "Active",   value: "#014039", token: "interaction.main.active" },
        ]}
      />
      <SemanticGroup
        title="Muted"
        items={[
          { label: "Default",  value: "#DDFBC6", token: "interaction.muted.default" },
          { label: "Hover",    value: "#BBF0BB", token: "interaction.muted.hover" },
        ]}
      />
      <SemanticGroup
        title="Success"
        items={[
          { label: "Default",  value: "#009D7B", token: "interaction.success.default" },
          { label: "Hover",    value: "#5AC792", token: "interaction.success.hover" },
          { label: "Active",   value: "#017B68", token: "interaction.success.active" },
        ]}
      />
      <SemanticGroup
        title="Critical"
        items={[
          { label: "Default",  value: "#C84F25", token: "interaction.critical.default" },
          { label: "Hover",    value: "#E67E59", token: "interaction.critical.hover" },
          { label: "Active",   value: "#A64929", token: "interaction.critical.active" },
        ]}
      />
      <SemanticGroup
        title="Neutral"
        items={[
          { label: "Default",  value: "#F0F1F9", token: "interaction.neutral.default" },
          { label: "Hover",    value: "#D8D9E5", token: "interaction.neutral.hover" },
          { label: "Active",   value: "#BCC0D1", token: "interaction.neutral.active" },
        ]}
      />
    </div>
  ),
}

export const Feedback: Story = {
  name: "Semantic — Feedback",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      <SemanticGroup
        title="Info"
        items={[
          { label: "Default", value: "#3182CE", token: "feedback.info.default" },
          { label: "Subtle",  value: "#EBF8FF", token: "feedback.info.subtle" },
          { label: "Strong",  value: "#2B6CB0", token: "feedback.info.strong" },
        ]}
      />
      <SemanticGroup
        title="Warning"
        items={[
          { label: "Default", value: "#FFDA68", token: "feedback.warning.default" },
          { label: "Subtle",  value: "#FFFAE2", token: "feedback.warning.subtle" },
          { label: "Strong",  value: "#8B6005", token: "feedback.warning.strong" },
        ]}
      />
      <SemanticGroup
        title="Success"
        items={[
          { label: "Default", value: "#009D7B", token: "feedback.success.default" },
          { label: "Subtle",  value: "#F1FFE5", token: "feedback.success.subtle" },
          { label: "Strong",  value: "#016F60", token: "feedback.success.strong" },
        ]}
      />
      <SemanticGroup
        title="Critical"
        items={[
          { label: "Default", value: "#C84F25", token: "feedback.critical.default" },
          { label: "Subtle",  value: "#FFE8E0", token: "feedback.critical.subtle" },
          { label: "Strong",  value: "#A64929", token: "feedback.critical.strong" },
        ]}
      />
      <SemanticGroup
        title="Disabled"
        items={[
          { label: "Background", value: "#E2E7E9", token: "feedback.disabled.bg" },
          { label: "Text Medium", value: "#BFC2C8", token: "feedback.disabled.medium" },
          { label: "Text Strong", value: "#838894", token: "feedback.disabled.strong" },
        ]}
      />
    </div>
  ),
}

export const Canvas: Story = {
  name: "Semantic — Canvas & Content",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      <SemanticGroup
        title="Canvas"
        items={[
          { label: "Default",      value: "#F8F9F9", token: "canvas.default" },
          { label: "Alt",          value: "#F5F9FA", token: "canvas.alt" },
          { label: "Backdrop",     value: "#E2E7E9", token: "canvas.backdrop" },
          { label: "Brand Subtle", value: "#F1FFE5", token: "canvas.brand-subtle" },
          { label: "Modal",        value: "#ffffff", token: "canvas.modal" },
        ]}
      />
      <SemanticGroup
        title="Content — Light"
        items={[
          { label: "Default",       value: "#424559", token: "content.light.default" },
          { label: "Strong",        value: "#000000", token: "content.light.strong" },
          { label: "Medium",        value: "#6B6F8C", token: "content.light.medium" },
          { label: "Subtle",        value: "#7C8094", token: "content.light.subtle" },
          { label: "Brand Strong",  value: "#026257", token: "content.light.brand-strong" },
          { label: "Brand Subtle",  value: "#017B68", token: "content.light.brand-subtle" },
        ]}
      />
      <SemanticGroup
        dark
        title="Content — Dark"
        items={[
          { label: "Default",       value: "#F6F7FF", token: "content.dark.default" },
          { label: "Strong",        value: "#ffffff", token: "content.dark.strong" },
          { label: "Medium",        value: "#7C8094", token: "content.dark.medium" },
          { label: "Subtle",        value: "#BCC0D1", token: "content.dark.subtle" },
          { label: "Brand Strong",  value: "#5AC792", token: "content.dark.brand-strong" },
          { label: "Brand Subtle",  value: "#DDFBC6", token: "content.dark.brand-subtle" },
        ]}
      />
    </div>
  ),
}
