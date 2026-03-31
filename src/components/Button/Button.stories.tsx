import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"
import type { ButtonColorScheme, ButtonVariant, ButtonSize } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"] satisfies ButtonVariant[],
      description: "Visual style of the button",
    },
    colorScheme: {
      control: "select",
      options: ["brand", "subtle", "success", "critical", "neutral"] satisfies ButtonColorScheme[],
      description: "Semantic colour applied to the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] satisfies ButtonSize[],
      description: "Height and padding scale",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "solid",
    colorScheme: "brand",
    size: "md",
    children: "Button",
  },
}

// ── All variants × colour schemes ────────────────────────────────────────────

const variants: ButtonVariant[] = ["solid", "outline", "ghost"]
const colorSchemes: ButtonColorScheme[] = ["brand", "subtle", "success", "critical", "neutral"]

export const AllVariants: Story = {
  name: "All Variants × Colour Schemes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "100px repeat(3, 1fr)", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#7C8094", fontWeight: 600, textTransform: "uppercase" }} />
        {variants.map((v) => (
          <span key={v} style={{ fontSize: 11, color: "#7C8094", fontWeight: 600, textTransform: "uppercase" }}>
            {v}
          </span>
        ))}
      </div>
      {/* Rows */}
      {colorSchemes.map((cs) => (
        <div
          key={cs}
          style={{
            display: "grid",
            gridTemplateColumns: "100px repeat(3, 1fr)",
            gap: 12,
            alignItems: "center",
            padding: cs === "subtle" ? "16px" : undefined,
            background: cs === "subtle" ? "#026257" : undefined,
            borderRadius: cs === "subtle" ? 8 : undefined,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              color: cs === "subtle" ? "#DDFBC6" : "#7C8094",
            }}
          >
            {cs}
          </span>
          {variants.map((v) => (
            <Button key={v} variant={v} colorScheme={cs} size="md">
              {cs} / {v}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// ── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {colorSchemes.map((cs) => (
        <Button key={cs} colorScheme={cs} disabled>
          {cs}
        </Button>
      ))}
    </div>
  ),
}
