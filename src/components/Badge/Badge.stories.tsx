import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

// ── Default icon placeholder ──────────────────────────────────────────────────
const DefaultIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

interface PlaygroundArgs {
  leadingIconSrc:  string
  trailingIconSrc: string
}

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["Strong", "Subtle", "Outline", "Mixed"] },
    colour: { control: "select", options: ["Brand", "Success", "Warning", "Critical", "Neutral", "Info"] },
    size: { control: "select", options: ["sm", "xs"] },
    border: { control: "select", options: ["Default", "Rounded"] },
    // Hide ReactNode props — managed via Playground render
    leadingIcon:  { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Playground: StoryObj<typeof Badge & PlaygroundArgs> = {
  args: {
    children: "Badge",
    variant: "Subtle",
    colour: "Brand",
    size: "sm",
    background: true,
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
  render: ({ leadingIconSrc, trailingIconSrc, showLeadingIcon, showTrailingIcon, ...args }) => {
    const leading = leadingIconSrc
      ? <img src={leadingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
      : <DefaultIcon size={14} />
    const trailing = trailingIconSrc
      ? <img src={trailingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
      : <DefaultIcon size={14} />

    return (
      <Badge
        {...args}
        showLeadingIcon={showLeadingIcon}
        showTrailingIcon={showTrailingIcon}
        leadingIcon={leading}
        trailingIcon={trailing}
      />
    )
  },
}

export const AllColours: Story = {
  name: "Variant × Colour",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "Inter, sans-serif" }}>
      {(["Strong", "Subtle", "Outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.5px" }}>{variant}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["Brand", "Success", "Info", "Warning", "Critical", "Neutral"] as const).map((colour) => (
              <Badge key={colour} variant={variant} colour={colour} size="sm">{colour}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter, sans-serif" }}>
      {(["sm", "xs"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, fontSize: 11, color: "#7C8094" }}>{size}</span>
          {(["Brand", "Success", "Warning", "Critical", "Neutral", "Info"] as const).map((colour) => (
            <Badge key={colour} size={size} variant="Subtle" colour={colour}>{colour}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const BorderStyles: Story = {
  name: "Border: Default vs Rounded",
  render: () => (
    <div style={{ display: "flex", gap: 12, fontFamily: "Inter, sans-serif" }}>
      <Badge variant="Subtle" colour="Brand" border="Default">Default</Badge>
      <Badge variant="Subtle" colour="Brand" border="Rounded">Rounded</Badge>
      <Badge variant="Strong" colour="Success" border="Default">Default</Badge>
      <Badge variant="Strong" colour="Success" border="Rounded">Rounded</Badge>
    </div>
  ),
}

export const StatusIndicator: Story = {
  name: "No Background (Status Indicator)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "Inter, sans-serif" }}>
      {(["Brand", "Success", "Info", "Warning", "Critical", "Neutral"] as const).map((colour) => (
        <Badge key={colour} colour={colour} background={false}>{colour} status</Badge>
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  name: "With Leading / Trailing Icons",
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontFamily: "Inter, sans-serif" }}>
      <Badge
        variant="Subtle" colour="Success" size="sm"
        showLeadingIcon leadingIcon={<i className="ri-check-line" />}
      >
        Verified
      </Badge>
      <Badge
        variant="Strong" colour="Critical" size="sm"
        showTrailingIcon trailingIcon={<i className="ri-close-circle-line" />}
      >
        Error
      </Badge>
      <Badge
        variant="Outline" colour="Info" size="sm"
        showLeadingIcon leadingIcon={<i className="ri-information-line" />}
      >
        Info
      </Badge>
      <Badge
        variant="Subtle" colour="Warning" size="sm"
        showLeadingIcon leadingIcon={<i className="ri-alert-line" />}
      >
        Warning
      </Badge>
      <Badge
        variant="Strong" colour="Brand" size="sm"
        showTrailingIcon trailingIcon={<i className="ri-arrow-right-line" />}
      >
        Continue
      </Badge>
    </div>
  ),
}
