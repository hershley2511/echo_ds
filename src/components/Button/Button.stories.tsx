import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"
import type { ButtonColorScheme, ButtonVariant, ButtonSize, ButtonState } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "clear"] satisfies ButtonVariant[],
      description: "Visual style of the button",
    },
    colorScheme: {
      control: "select",
      options: ["brand", "subtle", "success", "critical", "neutral", "inverse", "warning", "white"] satisfies ButtonColorScheme[],
      description: "Semantic colour applied to the button",
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "md", "lg"] satisfies ButtonSize[],
      description: "Height and padding scale",
    },
    state: {
      control: "select",
      options: ["default", "disabled", "loading"] satisfies ButtonState[],
      description: "Semantic component state. Hover / active are driven by mouse — interact with the button in the canvas to trigger them.",
    },
    children: { control: "text" },
    // Hide native HTML prop from controls — use `state` instead
    disabled: { table: { disable: true } },
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
    state: "default",
    children: "Button",
  },
}

// ── All variants × colour schemes ────────────────────────────────────────────
const variants: ButtonVariant[] = ["solid", "outline", "clear"]

const groups: { label: string; schemes: ButtonColorScheme[]; bg?: string }[] = [
  { label: "Standard",        schemes: ["brand", "success", "critical", "neutral"] },
  { label: "On dark surface", schemes: ["subtle", "inverse", "white"], bg: "interaction.main.default" },
  { label: "Warning",         schemes: ["warning"] },
]

export const AllVariants: Story = {
  name: "All Variants × Colour Schemes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {groups.map(({ label, schemes, bg }) => (
        <div key={label}>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: 1 }}>
            {label}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `120px repeat(${variants.length}, 1fr)`,
              gap: 12,
              alignItems: "center",
              padding: bg ? 16 : 0,
              background: bg ? "#026257" : undefined,
              borderRadius: bg ? 8 : undefined,
            }}
          >
            <span style={{ fontSize: 11, color: bg ? "#DDFBC6" : "#7C8094", fontWeight: 600, textTransform: "uppercase" }} />
            {variants.map((v) => (
              <span key={v} style={{ fontSize: 11, color: bg ? "#DDFBC6" : "#7C8094", fontWeight: 600, textTransform: "uppercase" }}>{v}</span>
            ))}
            {schemes.map((cs) => (
              <>
                <span key={`${cs}-label`} style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: bg ? "#DDFBC6" : "#7C8094" }}>{cs}</span>
                {variants.map((v) => (
                  <Button key={v} variant={v} colorScheme={cs} size="md">Button</Button>
                ))}
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Sizes ────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      {(["xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
        <Button key={size} size={size}>{size}</Button>
      ))}
    </div>
  ),
}

// ── Interaction states ────────────────────────────────────────────────────────
const interactionColorSchemes: { label: string; scheme: ButtonColorScheme }[] = [
  { label: "Brand",    scheme: "brand"    },
  { label: "Critical", scheme: "critical" },
]

export const InteractionStates: Story = {
  name: "Interaction States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {interactionColorSchemes.map(({ label, scheme }) => (
        <div key={scheme}>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: 1 }}>
            {label}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(["default", "hover", "active"] as const).map((iState) => (
              <div key={iState} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ width: 64, fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{iState}</span>
                {(["solid", "outline", "clear"] as const).map((variant) => (
                  <Button
                    key={variant}
                    variant={variant}
                    colorScheme={scheme}
                    forceInteractionState={iState === "default" ? undefined : iState}
                  >
                    {label} / {variant}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["solid", "outline", "clear"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ width: 64, fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{variant}</span>
          {(["brand", "subtle", "success", "critical", "neutral"] as const).map((cs) => (
            <Button key={cs} variant={variant} colorScheme={cs} state="disabled">{cs}</Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

// ── Loading ──────────────────────────────────────────────────────────────────
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["solid", "outline", "clear"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ width: 64, fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{variant}</span>
          {(["brand", "subtle", "success", "critical", "neutral"] as const).map((cs) => (
            <Button key={cs} variant={variant} colorScheme={cs} state="loading">{cs}</Button>
          ))}
        </div>
      ))}
    </div>
  ),
}
