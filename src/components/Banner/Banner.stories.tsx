import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Banner } from "./Banner"
import type { BannerVariant, BannerSize } from "./Banner"

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error"] satisfies BannerVariant[],
      description: "Visual type of the banner — maps to Figma type: Informational | Warning | Error",
    },
    size: {
      control: "select",
      options: ["md", "sm"] satisfies BannerSize[],
      description: "Height and typography scale (md = 40px / 16px, sm = 36px / 14px)",
    },
    children: { control: "text" },
    onDismiss: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Banner>

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: "info",
    size: "md",
    children: "Singpass will be undergoing scheduled maintenance on Sunday 23rd August from 12am-4am.",
  },
}

// ── All Variants × Sizes ──────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: "All Variants × Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {(["md", "sm"] as const).flatMap((size) =>
        (["info", "warning", "error"] as const).map((variant) => (
          <Banner key={`${variant}-${size}`} variant={variant} size={size}>
            {variant === "info"
              ? "Singpass will be undergoing scheduled maintenance on Sunday 23rd August from 12am-4am."
              : variant === "warning"
              ? "We are experiencing intermittent issues. If you face problems loading or submitting forms, please refresh and try again."
              : "FormSG is currently experiencing downtime. Learn more"}
          </Banner>
        ))
      )}
    </div>
  ),
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Banner variant="info" size="md">
        md — Singpass will be undergoing scheduled maintenance on Sunday 23rd August from 12am-4am.
      </Banner>
      <Banner variant="info" size="sm">
        sm — Singpass will be undergoing scheduled maintenance on Sunday 23rd August from 12am-4am.
      </Banner>
    </div>
  ),
}

// ── Dismissible (info only) ───────────────────────────────────────────────────
export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Banner variant="info" size="md" onDismiss={() => setVisible(false)}>
        Singpass will be undergoing scheduled maintenance on Sunday 23rd August from 12am-4am.
      </Banner>
    ) : (
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#7C8094", padding: 16 }}>
        Banner dismissed
      </div>
    )
  },
}
