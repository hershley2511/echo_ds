import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"
import type { ButtonColorScheme, ButtonVariant, ButtonSize, ButtonState } from "./Button"
import { IconButton } from "./IconButton"
import type { IconButtonSize } from "./IconButton"
import { ButtonSet } from "./ButtonSet"
import type { ButtonSetFill, ButtonSetLayout, ButtonSetPosition } from "./ButtonSet"

// ── Default icon (RemixIcon star, inline SVG) ─────────────────────────────────
const DefaultIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// ── Storybook-only story args extending Button props ─────────────────────────
interface PlaygroundArgs {
  showLeadingIcon:   boolean
  showTrailingIcon:  boolean
  leadingIconSrc:    string
  trailingIconSrc:   string
}

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
    // Hide ReactNode props — controlled via story-level toggles in Playground
    leadingIcon:  { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground: StoryObj<typeof Button & PlaygroundArgs> = {
  args: {
    variant: "solid",
    colorScheme: "brand",
    size: "md",
    state: "default",
    children: "Button",
    showLeadingIcon:  false,
    showTrailingIcon: false,
    leadingIconSrc:  "",
    trailingIconSrc: "",
  },
  argTypes: {
    showLeadingIcon: {
      control: "boolean",
      description: "Show a leading (left) icon",
    },
    showTrailingIcon: {
      control: "boolean",
      description: "Show a trailing (right) icon",
    },
    leadingIconSrc: {
      control: { type: "file", accept: ".svg,.png,.jpg,.jpeg,.webp" },
      description: "Upload a custom icon for the leading slot. Falls back to a default icon if empty.",
    },
    trailingIconSrc: {
      control: { type: "file", accept: ".svg,.png,.jpg,.jpeg,.webp" },
      description: "Upload a custom icon for the trailing slot. Falls back to a default icon if empty.",
    },
  },
  render: ({ showLeadingIcon, showTrailingIcon, leadingIconSrc, trailingIconSrc, ...args }) => {
    const leading = leadingIconSrc
      ? <img src={leadingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
      : <DefaultIcon size={16} />
    const trailing = trailingIconSrc
      ? <img src={trailingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
      : <DefaultIcon size={16} />

    return (
      <Button
        {...args}
        leadingIcon={showLeadingIcon ? leading : undefined}
        trailingIcon={showTrailingIcon ? trailing : undefined}
      />
    )
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

// ─────────────────────────────────────────────────────────────────────────────
// Icon Button
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon Button Playground ───────────────────────────────────────────────────
export const IconButtonPlayground: StoryObj<typeof IconButton> = {
  name: "Icon Button / Playground",
  render: (args) => (
    <IconButton {...args}>
      <DefaultIcon size={24} />
    </IconButton>
  ),
  args: {
    variant: "solid",
    colorScheme: "brand",
    size: "md",
    state: "default",
    "aria-label": "Action",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "clear"] satisfies ButtonVariant[],
      description: "Visual style",
    },
    colorScheme: {
      control: "select",
      options: ["brand", "subtle", "success", "critical", "neutral", "inverse", "warning", "white"] satisfies ButtonColorScheme[],
      description: "Semantic colour",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] satisfies IconButtonSize[],
      description: "Button size (xs=36px … xl=56px)",
    },
    state: {
      control: "select",
      options: ["default", "disabled", "loading"] satisfies ButtonState[],
      description: "Semantic state",
    },
    "aria-label": { control: "text" },
    disabled:     { table: { disable: true } },
  },
}

// ── Icon Button — All Variants × Colour Schemes ──────────────────────────────
const iconBtnVariants: ButtonVariant[] = ["solid", "outline", "clear"]
const iconBtnGroups: { label: string; schemes: ButtonColorScheme[]; bg?: string }[] = [
  { label: "Standard",        schemes: ["brand", "success", "critical", "neutral"] },
  { label: "On dark surface", schemes: ["subtle", "inverse", "white"], bg: "interaction.main.default" },
  { label: "Warning",         schemes: ["warning"] },
]

export const IconButtonAllVariants: Story = {
  name: "Icon Button / All Variants × Colour Schemes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {iconBtnGroups.map(({ label, schemes, bg }) => (
        <div key={label}>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: 1 }}>
            {label}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `120px repeat(${iconBtnVariants.length}, 64px)`,
              gap: 12,
              alignItems: "center",
              padding: bg ? 16 : 0,
              background: bg ? "#026257" : undefined,
              borderRadius: bg ? 8 : undefined,
            }}
          >
            <span />
            {iconBtnVariants.map((v) => (
              <span key={v} style={{ fontSize: 11, color: bg ? "#DDFBC6" : "#7C8094", fontWeight: 600, textTransform: "uppercase" }}>{v}</span>
            ))}
            {schemes.map((cs) => (
              <>
                <span key={`${cs}-label`} style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: bg ? "#DDFBC6" : "#7C8094" }}>{cs}</span>
                {iconBtnVariants.map((v) => (
                  <IconButton key={v} variant={v} colorScheme={cs} size="md" aria-label={cs}>
                    <DefaultIcon size={24} />
                  </IconButton>
                ))}
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Icon Button — Sizes ───────────────────────────────────────────────────────
export const IconButtonSizes: Story = {
  name: "Icon Button / Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <IconButton key={size} size={size} aria-label={size}>
          <DefaultIcon size={24} />
        </IconButton>
      ))}
    </div>
  ),
}

// ── Icon Button — Interaction States ─────────────────────────────────────────
export const IconButtonInteractionStates: Story = {
  name: "Icon Button / Interaction States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {([{ label: "Brand", scheme: "brand" }, { label: "Critical", scheme: "critical" }] as const).map(({ label, scheme }) => (
        <div key={scheme}>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: 1 }}>{label}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(["default", "hover", "active"] as const).map((iState) => (
              <div key={iState} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 64, fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{iState}</span>
                {(["solid", "outline", "clear"] as const).map((variant) => (
                  <IconButton
                    key={variant}
                    variant={variant}
                    colorScheme={scheme}
                    forceInteractionState={iState === "default" ? undefined : iState}
                    aria-label={`${label} ${variant} ${iState}`}
                  >
                    <DefaultIcon size={24} />
                  </IconButton>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Icon Button — Disabled ────────────────────────────────────────────────────
export const IconButtonDisabled: Story = {
  name: "Icon Button / Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["solid", "outline", "clear"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ width: 64, fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{variant}</span>
          {(["brand", "subtle", "success", "critical", "neutral"] as const).map((cs) => (
            <IconButton key={cs} variant={variant} colorScheme={cs} state="disabled" aria-label={cs}>
              <DefaultIcon size={24} />
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Button Set
// ─────────────────────────────────────────────────────────────────────────────

// ── Button Set Playground ────────────────────────────────────────────────────
export const ButtonSetPlayground: StoryObj<typeof ButtonSet> = {
  name: "Button Set / Playground",
  render: (args) => <ButtonSet {...args} />,
  args: {
    fill: "primary",
    layout: "button+button",
    position: "align-right",
    primaryLabel: "Confirm",
    secondaryLabel: "Cancel",
    linkLabel: "Questions?",
  },
  argTypes: {
    fill: {
      control: "select",
      options: ["primary", "danger", "disabled"] satisfies ButtonSetFill[],
      description: "Primary = brand, Danger = critical, Disabled = all disabled",
    },
    layout: {
      control: "select",
      options: ["button+button", "button+link"] satisfies ButtonSetLayout[],
      description: "Two buttons, or a primary button paired with a link",
    },
    position: {
      control: "select",
      options: ["align-right", "align-left"] satisfies ButtonSetPosition[],
      description: "Side the primary action sits on",
    },
    primaryLabel:   { control: "text" },
    secondaryLabel: { control: "text" },
    linkLabel:      { control: "text" },
  },
}

// ── Button Set — All Variants ─────────────────────────────────────────────────
export const ButtonSetAllVariants: Story = {
  name: "Button Set / All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif" }}>
      {(["button+button", "button+link"] as const).map((layout) => (
        <div key={layout}>
          <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: 1 }}>
            {layout}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {(["primary", "danger", "disabled"] as const).map((fill) => (
              <div key={fill} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase" }}>{fill}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(["align-right", "align-left"] as const).map((position) => (
                    <div key={position} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                      <span style={{ width: 88, fontSize: 11, color: "#9A9FB8" }}>{position}</span>
                      <ButtonSet fill={fill} layout={layout} position={position} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
