import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "./Footer"

const meta: Meta<typeof Footer> = {
  title: "Navigation/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Full: Story = {
  args: {
    variant: "full",
    tagline: "Building digital services for a better Singapore.",
    copyright: "© 2025 Digital & Technology Office. All rights reserved.",
    linkGroups: [
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
    bottomLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
    logo: (
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, color: "#5AC792" }}>
        Echo DS
      </span>
    ),
  },
}

export const Minimal: Story = {
  args: {
    variant: "minimal",
    copyright: "© 2025 Digital & Technology Office.",
    bottomLinks: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
}
