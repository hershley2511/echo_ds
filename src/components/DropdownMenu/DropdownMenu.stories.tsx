import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu } from "./DropdownMenu"
import { DropdownOption } from "./DropdownOption"
import { DropdownTrigger } from "./DropdownTrigger"
import type { DropdownMenuSize } from "./DropdownMenu"
import type { DropdownOptionSize, DropdownOptionProps } from "./DropdownOption"
import type { DropdownTriggerColour } from "./DropdownTrigger"

const meta: Meta<typeof DropdownMenu> = {
  title: "Navigation/Dropdown",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "sm"] satisfies DropdownMenuSize[],
      description: "Size scale applied to the menu and its options",
    },
    showSearchBar: { control: "boolean", description: "Show the search input above the options" },
    searchPlaceholder: { control: "text" },
    showButton: { control: "boolean", description: "Show an action button below the options" },
    buttonLabel: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// ── Shared sample options ─────────────────────────────────────────────────────
function SampleOptions({ size = "md", activeValue = "" }: { size?: DropdownOptionSize; activeValue?: string }) {
  return (
    <>
      <DropdownOption
        size={size}
        isTitle
        leadingIcon={<i className="ri-folder-line" />}
      >
        My documents
      </DropdownOption>
      <DropdownOption
        size={size}
        leadingIcon={<i className="ri-file-line" />}
        trailingIcon={<i className="ri-arrow-right-s-line" />}
        isActive={activeValue === "resume"}
      >
        Resume 2024.pdf
      </DropdownOption>
      <DropdownOption
        size={size}
        leadingIcon={<i className="ri-file-line" />}
        trailingIcon={<i className="ri-arrow-right-s-line" />}
        isActive={activeValue === "cover"}
      >
        Cover letter.docx
      </DropdownOption>
      <DropdownOption
        size={size}
        leadingIcon={<i className="ri-file-line" />}
        trailingIcon={<i className="ri-arrow-right-s-line" />}
        isActive={activeValue === "portfolio"}
      >
        Portfolio.pdf
      </DropdownOption>
      <DropdownOption
        size={size}
        topSeparator
        leadingIcon={<i className="ri-folder-line" />}
      >
        Shared with me
      </DropdownOption>
    </>
  )
}

// ── Menu Playground ───────────────────────────────────────────────────────────
export const MenuPlayground: Story = {
  name: "Menu / Playground",
  args: {
    size: "md",
    showSearchBar: true,
    searchPlaceholder: "Search folders",
    showButton: true,
    buttonLabel: "Upload more documents",
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <SampleOptions size={args.size} />
    </DropdownMenu>
  ),
}

// ── Menu — all toggle combinations ───────────────────────────────────────────
export const MenuToggles: Story = {
  name: "Menu / Toggle Combinations",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      {([
        { showSearchBar: false, showButton: false, label: "Plain" },
        { showSearchBar: true,  showButton: false, label: "+ Search" },
        { showSearchBar: false, showButton: true,  label: "+ Button" },
        { showSearchBar: true,  showButton: true,  label: "+ Both" },
      ] as const).map(({ showSearchBar, showButton, label }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#7C8094" }}>{label}</span>
          <DropdownMenu showSearchBar={showSearchBar} showButton={showButton} buttonLabel="Upload more documents" searchPlaceholder="Search folders">
            <SampleOptions />
          </DropdownMenu>
        </div>
      ))}
    </div>
  ),
}

// ── Menu — sizes ──────────────────────────────────────────────────────────────
export const MenuSizes: Story = {
  name: "Menu / Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {(["md", "sm"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#7C8094" }}>{size}</span>
          <DropdownMenu size={size} showSearchBar showButton buttonLabel="Upload more documents" searchPlaceholder="Search folders">
            <SampleOptions size={size} />
          </DropdownMenu>
        </div>
      ))}
    </div>
  ),
}

// ── Option Playground ─────────────────────────────────────────────────────────
export const OptionPlayground: Story = {
  name: "Option / Playground",
  parameters: { controls: { disable: true } },
  render: () => {
    const [size, setSize]                   = useState<DropdownOptionSize>("md")
    const [interactionState, setInteraction] = useState<"default" | "hover" | "active">("default")
    const [showLeadingIcon, setLeading]     = useState(true)
    const [showTrailingIcon, setTrailing]   = useState(false)
    const [topSeparator, setTop]            = useState(false)
    const [bottomSeparator, setBottom]      = useState(false)
    const [showDescription, setDesc]        = useState(false)
    const [showLabel, setLabel]             = useState(false)
    const [isTitle, setIsTitle]             = useState(false)

    const optionProps: Partial<DropdownOptionProps> = {
      size,
      isTitle,
      topSeparator,
      bottomSeparator,
      leadingIcon: showLeadingIcon ? <i className="ri-file-line" /> : undefined,
      trailingIcon: showTrailingIcon ? <i className="ri-arrow-right-s-line" /> : undefined,
      description: showDescription ? "Secondary description text" : undefined,
      label: showLabel ? 1 : undefined,
      isActive: interactionState === "active",
      forceInteractionState: interactionState === "hover" ? "hover" : undefined,
    }

    const toggleStyle: React.CSSProperties = { display: "flex", gap: 4, cursor: "pointer", alignItems: "center" }
    const divider = <span style={{ width: 1, background: "#E2E7E9", alignSelf: "stretch" }} />

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Inter, sans-serif" }}>
        {/* Controls */}
        <div style={{ display: "flex", gap: 12, fontSize: 13, flexWrap: "wrap", color: "#424559", alignItems: "center" }}>
          {/* Size */}
          {(["md", "sm"] as const).map((s) => (
            <label key={s} style={toggleStyle}>
              <input type="radio" checked={size === s} onChange={() => setSize(s)} /> {s}
            </label>
          ))}
          {divider}
          {/* Interaction state */}
          {(["default", "hover", "active"] as const).map((st) => (
            <label key={st} style={toggleStyle}>
              <input type="radio" checked={interactionState === st} onChange={() => setInteraction(st)} /> {st}
            </label>
          ))}
          {divider}
          {/* Feature toggles */}
          {([
            ["leading icon",    showLeadingIcon,  setLeading],
            ["trailing icon",   showTrailingIcon, setTrailing],
            ["top separator",   topSeparator,     setTop],
            ["bottom separator",bottomSeparator,  setBottom],
            ["description",     showDescription,  setDesc],
            ["label",           showLabel,        setLabel],
            ["section title",   isTitle,          setIsTitle],
          ] as const).map(([lbl, val, setter]) => (
            <label key={lbl} style={toggleStyle}>
              <input type="checkbox" checked={val} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} /> {lbl}
            </label>
          ))}
        </div>

        {/* Preview */}
        <div style={{ width: 304, border: "1px solid #E2E7E9", borderRadius: 16, overflow: "hidden" }}>
          <DropdownOption {...optionProps}>Option label</DropdownOption>
        </div>
      </div>
    )
  },
}

// ── Option — all states ───────────────────────────────────────────────────────
export const OptionStates: Story = {
  name: "Option / All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {(["md", "sm"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#7C8094" }}>{size}</span>
          <div style={{ width: 304, border: "1px solid #E2E7E9", borderRadius: 16, overflow: "hidden" }}>
            {/* Section title */}
            <DropdownOption size={size} isTitle leadingIcon={<i className="ri-folder-line" />}>Section title</DropdownOption>
            {/* Default */}
            <DropdownOption size={size} leadingIcon={<i className="ri-file-line" />} trailingIcon={<i className="ri-arrow-right-s-line" />}>Default</DropdownOption>
            {/* Hover (forced) */}
            <DropdownOption size={size} leadingIcon={<i className="ri-file-line" />} trailingIcon={<i className="ri-arrow-right-s-line" />} forceInteractionState="hover">Hover</DropdownOption>
            {/* Active / selected */}
            <DropdownOption size={size} leadingIcon={<i className="ri-file-line" />} trailingIcon={<i className="ri-arrow-right-s-line" />} isActive>Active / selected</DropdownOption>
            {/* With description */}
            <DropdownOption size={size} description="Secondary description" leadingIcon={<i className="ri-file-line" />}>With description</DropdownOption>
            {/* With label prefix */}
            <DropdownOption size={size} label={1} leadingIcon={<i className="ri-radio-button-line" />}>With label prefix</DropdownOption>
            {/* Top separator */}
            <DropdownOption size={size} topSeparator leadingIcon={<i className="ri-folder-line" />}>Top separator</DropdownOption>
            {/* Trailing icon only */}
            <DropdownOption size={size} trailingIcon={<i className="ri-arrow-right-s-line" />}>Trailing icon only</DropdownOption>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Live Demo — Trigger + Menu composed ───────────────────────────────────────
export const LiveDemo: Story = {
  name: "Live Demo (Trigger + Menu)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen]         = useState(false)
    const [selected, setSelected]     = useState("")
    const [showSearch, setShowSearch] = useState(true)
    const [showBtn, setShowBtn]       = useState(true)
    const [size, setSize]             = useState<DropdownMenuSize>("md")

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, fontFamily: "Inter, sans-serif" }}>
        {/* Controls */}
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#424559" }}>
          {(["md", "sm"] as const).map((s) => (
            <label key={s} style={{ display: "flex", gap: 4, cursor: "pointer" }}>
              <input type="radio" checked={size === s} onChange={() => setSize(s)} /> {s}
            </label>
          ))}
          <label style={{ display: "flex", gap: 4, cursor: "pointer" }}>
            <input type="checkbox" checked={showSearch} onChange={(e) => setShowSearch(e.target.checked)} /> search bar
          </label>
          <label style={{ display: "flex", gap: 4, cursor: "pointer" }}>
            <input type="checkbox" checked={showBtn} onChange={(e) => setShowBtn(e.target.checked)} /> button
          </label>
        </div>

        {/* Composed trigger + menu */}
        <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <DropdownTrigger isOpen={isOpen} onClick={() => setIsOpen((o) => !o)}>
            My documents
          </DropdownTrigger>

          {isOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 100 }}>
              <DropdownMenu
                size={size}
                showSearchBar={showSearch}
                searchPlaceholder="Search folders"
                showButton={showBtn}
                buttonLabel="Upload more documents"
                onButtonClick={() => setIsOpen(false)}
              >
                <DropdownOption size={size} isTitle leadingIcon={<i className="ri-folder-line" />}>My documents</DropdownOption>
                {["Resume 2024.pdf", "Cover letter.docx", "Portfolio.pdf"].map((name) => (
                  <DropdownOption
                    key={name}
                    size={size}
                    leadingIcon={<i className="ri-file-line" />}
                    trailingIcon={<i className="ri-arrow-right-s-line" />}
                    isActive={selected === name}
                    onClick={() => { setSelected(name); setIsOpen(false) }}
                  >
                    {name}
                  </DropdownOption>
                ))}
                <DropdownOption size={size} topSeparator leadingIcon={<i className="ri-folder-line" />}>
                  Shared with me
                </DropdownOption>
              </DropdownMenu>
            </div>
          )}
        </div>

        {selected && (
          <span style={{ fontSize: 13, color: "#7C8094" }}>Selected: {selected}</span>
        )}
      </div>
    )
  },
}
