import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "./Footer"
import type { FooterDevice } from "./Footer"

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    device: {
      control: "select",
      options: ["desktop", "mobile"] satisfies FooterDevice[],
      description: "Desktop (1280px) or Mobile (360px) layout",
    },
    condensed: {
      control: "boolean",
      description: "Single-row condensed layout — hides divider, socials, and copyright",
    },
    showSocials: { control: "boolean", description: "Show social icon buttons" },
    copyright: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    device: "desktop",
    condensed: false,
    showSocials: true,
  },
  render: (args) => (
    <div style={{ overflowX: "auto" }}>
      <Footer {...args} />
    </div>
  ),
}

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: "All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, overflowX: "auto", fontFamily: "Inter, sans-serif" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px", padding: "0 0 8px 80px" }}>Desktop — Full</div>
        <Footer device="desktop" condensed={false} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px", padding: "0 0 8px 24px" }}>Desktop — Condensed</div>
        <Footer device="desktop" condensed />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px", padding: "0 0 8px 24px" }}>Mobile — Full</div>
        <Footer device="mobile" condensed={false} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7C8094", textTransform: "uppercase", letterSpacing: "0.96px", padding: "0 0 8px 24px" }}>Mobile — Condensed</div>
        <Footer device="mobile" condensed />
      </div>
    </div>
  ),
}

// ── Desktop Full ──────────────────────────────────────────────────────────────
export const DesktopFull: Story = {
  name: "Desktop / Full",
  parameters: { controls: { disable: true } },
  render: () => <Footer device="desktop" condensed={false} />,
}

// ── Desktop Condensed ─────────────────────────────────────────────────────────
export const DesktopCondensed: Story = {
  name: "Desktop / Condensed",
  parameters: { controls: { disable: true } },
  render: () => <Footer device="desktop" condensed />,
}

// ── Mobile Full ───────────────────────────────────────────────────────────────
export const MobileFull: Story = {
  name: "Mobile / Full",
  parameters: { controls: { disable: true } },
  render: () => <Footer device="mobile" condensed={false} />,
}

// ── Mobile Condensed ──────────────────────────────────────────────────────────
export const MobileCondensed: Story = {
  name: "Mobile / Condensed",
  parameters: { controls: { disable: true } },
  render: () => <Footer device="mobile" condensed />,
}

// ── Custom Links ──────────────────────────────────────────────────────────────
export const CustomLinks: Story = {
  name: "Custom Links",
  parameters: { controls: { disable: true } },
  render: () => (
    <Footer
      device="desktop"
      links={[
        { label: "About us", href: "#" },
        { label: "Help centre", href: "#" },
        { label: "Accessibility", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms of use", href: "#" },
      ]}
    />
  ),
}
