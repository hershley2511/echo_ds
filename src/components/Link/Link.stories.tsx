import type { Meta, StoryObj } from "@storybook/react"
import { Link } from "./Link"

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Link>

export const Playground: Story = {
  args: { children: "Click here", variant: "brand", href: "#" },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter, sans-serif" }}>
      <Link href="#" variant="brand">Brand link</Link>
      <Link href="#" variant="default">Default link</Link>
      <Link href="#" variant="subtle">Subtle link</Link>
      <Link href="#" variant="brand" isDisabled>Disabled link</Link>
      <Link href="https://example.com" variant="brand" isExternal>External link ↗</Link>
    </div>
  ),
}
