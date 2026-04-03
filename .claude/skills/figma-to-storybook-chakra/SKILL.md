---
name: figma-to-storybook-chakra
description: Convert a Figma component into a Chakra UI + TypeScript component with Storybook stories for the Echo design system
---

# Figma → Storybook (Chakra UI + TypeScript)

Convert a Figma component into a production-ready React component with Storybook stories,
then deploy to Vercel. Designed for the Echo design system stack:
**Chakra UI v3 · TypeScript · Vite · Storybook 8 · Vercel**.

---

## INPUT

Figma URL or node ID provided by the user: **$ARGUMENTS**

Parse the node ID from the URL if a full URL was given:
- `figma.com/design/:fileKey/...?node-id=:nodeId` → convert `-` to `:` in nodeId
- Use Figma file key from CLAUDE.md if not provided in the URL: `nBcsxeDdjIpGXhtiBagXd8`

---

## STEP 0 — FETCH DESIGN CONTEXT (MANDATORY, DO NOT SKIP)

1. Call `mcp__figma__get_design_context` with the parsed `nodeId` and `fileKey`.
2. Call `mcp__figma__get_variable_defs` with the same `fileKey` to retrieve all design tokens.
3. Confirm the component set exists and matches the given node or name.
4. If multiple matches exist, **stop and ask for clarification before proceeding**.
5. If no node ID was given and only a component name was given, search for it — if ambiguous, ask.

---

## STEP 1 — LOCATE AND CONFIRM

- Confirm you have the **main component set** (not an instance).
- State the component name and page clearly.
- DO NOT guess or assume missing information — ask instead.

---

## STEP 2 — EXTRACT GROUND TRUTH

From the Figma context, extract and document:

**Variant properties and values**
- List every variant property and all its possible values (e.g., `variant: solid | outline | ghost`)

**Token mapping**
- Map every color, spacing, typography, and other token from Figma to the project's `src/theme/index.ts` semantic token aliases.
- Use semantic token names (e.g., `interaction.main.default`) — DO NOT resolve to hex values.
- If a Figma token has no direct match in theme, flag it and suggest the closest alias.

**Layout structure**
- Auto layout direction, padding, gap, children hierarchy.

**Interaction states** — list every one observed:
- Default / Idle
- Hover
- Active / Pressed
- Focus / Focus-visible
- Disabled
- Loading / Busy
- Component-specific states (e.g., Error, Success, Checked, Selected, Expanded)

DO NOT interpret, rename, or hallucinate colors, tokens, or layout. Report what is in the Figma file.

---

## STEP 3 — IMPLEMENT THE COMPONENT

### File structure

Place files in `src/components/<ComponentName>/`:
```
src/components/<ComponentName>/
  <ComponentName>.tsx
  <ComponentName>.stories.tsx
```

### Component conventions (match existing codebase patterns exactly)

```tsx
import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

// Export all types
export type ComponentVariant = "..." | "..."
export type ComponentColorScheme = "..." | "..."
export type ComponentSize = "..." | "..."

export interface ComponentProps extends HTMLChakraProps<"button"> {
  variant?: ComponentVariant
  colorScheme?: ComponentColorScheme
  size?: ComponentSize
  // ... only props that map to real Figma variants
}

// ── Size tokens ──────────────────────────────────────────────────────────────
const sizes: Record<ComponentSize, HTMLChakraProps<"button">> = { ... }

// ── Color × Variant styles ───────────────────────────────────────────────────
// Use Chakra semantic token aliases, NOT raw hex values
// Use _hover, _active, _focusVisible for interaction states
const styles: StyleMap = {
  brand: {
    solid: {
      bg: "interaction.main.default",
      _hover: { bg: "interaction.main.hover" },
      _active: { bg: "interaction.main.active" },
    },
    ...
  },
  ...
}

// ── Component ────────────────────────────────────────────────────────────────
export const ComponentName = forwardRef<HTMLElement, ComponentProps>(function ComponentName(
  { variant = "solid", colorScheme = "brand", size = "md", disabled, ...rest },
  ref
) {
  return (
    <chakra.button
      ref={ref}
      // Base styles
      display="inline-flex"
      alignItems="center"
      // Focus ring
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      // Size + color scheme
      {...sizes[size]}
      {...styles[colorScheme][variant]}
      disabled={disabled}
      {...rest}
    >
      {children}
    </chakra.button>
  )
})
```

Key rules:
- Always use `forwardRef`
- Use `chakra.<element>` + `HTMLChakraProps<"element">` pattern
- Interaction states via `_hover`, `_active`, `_focusVisible` — NOT as props
- Use semantic token aliases from `src/theme/index.ts` for all colors
- Use section comment style: `// ── Section ──────────────────────────────────────`
- DO NOT invent variants not in Figma
- Keep the API minimal — only props that reflect real Figma variant dimensions

---

## STEP 4 — GENERATE STORYBOOK STORIES

### Story conventions (match existing codebase patterns exactly)

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { ComponentName } from "./ComponentName"
import type { ComponentVariant, ComponentColorScheme, ComponentSize } from "./ComponentName"

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...] satisfies ComponentVariant[],
      description: "...",
    },
    colorScheme: {
      control: "select",
      options: [...] satisfies ComponentColorScheme[],
      description: "...",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof ComponentName>

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = { args: { ... } }

// ── All variants × colour schemes ────────────────────────────────────────────
export const AllVariants: Story = {
  name: "All Variants × Colour Schemes",
  parameters: { controls: { disable: true } },
  render: () => ( ... )
}

// ── States ───────────────────────────────────────────────────────────────────
export const Disabled: Story = { ... }
// Add stories for every interaction state observed in Figma
```

Required stories:
- **Playground** — all controls enabled, sensible defaults
- **All Variants × Colour Schemes** — grid showing every combination
- **Sizes** — if the component has size variants
- **States** — Disabled, Loading, and any component-specific states
- Use `parameters: { controls: { disable: true } }` on showcase stories

### Leading / Trailing Icon pattern (REQUIRED for any component with icon slots)

If the Figma component has leading or trailing icon slots, the Playground story **must** implement the following pattern. `ReactNode` props cannot be controlled directly in Storybook, so use story-level args with a custom `render` function instead.

**Interface** (story-level args only, not component props):
```tsx
interface PlaygroundArgs {
  showLeadingIcon:  boolean
  showTrailingIcon: boolean
  leadingIconSrc:   string
  trailingIconSrc:  string
}
```

**Default icon** — always define a self-contained inline SVG fallback so the toggle works without needing an upload:
```tsx
const DefaultIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
```

**argTypes** (on the Playground story, not in meta):
```tsx
argTypes: {
  showLeadingIcon:  { control: "boolean", description: "Show a leading (left) icon" },
  showTrailingIcon: { control: "boolean", description: "Show a trailing (right) icon" },
  leadingIconSrc: {
    control: { type: "file", accept: ".svg,.png,.jpg,.jpeg,.webp" },
    description: "Upload a custom icon for the leading slot. Falls back to a default icon if empty.",
  },
  trailingIconSrc: {
    control: { type: "file", accept: ".svg,.png,.jpg,.jpeg,.webp" },
    description: "Upload a custom icon for the trailing slot. Falls back to a default icon if empty.",
  },
}
```

**render function**:
```tsx
render: ({ showLeadingIcon, showTrailingIcon, leadingIconSrc, trailingIconSrc, ...args }) => {
  const leading = leadingIconSrc
    ? <img src={leadingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
    : <DefaultIcon size={16} />
  const trailing = trailingIconSrc
    ? <img src={trailingIconSrc} alt="" aria-hidden="true" style={{ width: "1em", height: "1em", objectFit: "contain" }} />
    : <DefaultIcon size={16} />

  return (
    <ComponentName
      {...args}
      leadingIcon={showLeadingIcon ? leading : undefined}
      trailingIcon={showTrailingIcon ? trailing : undefined}
    />
  )
}
```

**In meta `argTypes`** — hide the ReactNode props from global controls:
```tsx
leadingIcon:  { table: { disable: true } },
trailingIcon: { table: { disable: true } },
```

Key rules:
- Always keep `leadingIconSrc` and `trailingIconSrc` as **separate** controls — never merge them into a single `iconSrc`.
- The boolean toggles (`showLeadingIcon` / `showTrailingIcon`) must default to `false`.
- The file upload controls must default to `""`.
- The `render` function always constructs the icon node from the src or falls back to `DefaultIcon` — never leave the icon slot empty when the toggle is on.

---

## STEP 5 — PRE-FLIGHT CHECKS

Before declaring the implementation ready:

1. Check Storybook is configured: `ls .storybook/` — if missing, initialize it.
2. Check `package.json` has `"storybook": "storybook dev -p 6006"` and `"build-storybook": "storybook build"`.
3. Check `vercel.json` exists with:
   ```json
   { "buildCommand": "npm run build-storybook", "outputDirectory": "storybook-static" }
   ```
   If missing, create it.
4. Check Vercel CLI is installed: `vercel --version`. If not, note it in the output.
5. Check git status — note any untracked or modified files.

---

## STEP 6 — MANDATORY REVIEW PAUSE

**STOP HERE. Do not proceed to git or Vercel until the user confirms.**

Present a structured review summary:

```
──────────────────────────────────────────────
REVIEW SUMMARY — <ComponentName>
──────────────────────────────────────────────

FILES CREATED / MODIFIED:
  + src/components/<ComponentName>/<ComponentName>.tsx
  + src/components/<ComponentName>/<ComponentName>.stories.tsx
  [any other files changed]

VARIANTS IMPLEMENTED:
  [list variant × colorScheme × size dimensions]

INTERACTION STATES IMPLEMENTED:
  ✓ Default
  ✓ Hover      → _hover (CSS pseudo-class)
  ✓ Active     → _active (CSS pseudo-class)
  ✓ Focus      → _focusVisible (ring: 2px, ringColor: focus.brand-default)
  ✓ Disabled   → opacity 0.4, cursor not-allowed
  [any component-specific states]

TOKEN MAPPING:
  Figma token                          → theme.ts alias
  ─────────────────────────────────────────────────────
  color/interaction/main/default       → interaction.main.default
  [full table]

STORYBOOK STORIES:
  [list all exported story names]

PRE-FLIGHT:
  [✓ or ✗ for each check from Step 5, with notes]

NEXT STEPS — choose one:
  1. Push to git and deploy to Vercel
  2. Make changes first (describe what to fix)
  3. Push to git only, skip Vercel for now
──────────────────────────────────────────────
```

Wait for the user to respond before continuing.

---

## STEP 7 — GIT COMMIT (only after user approves)

When the user approves option 1 or 3:

1. `git status` to confirm what will be staged
2. Stage only the new/modified component files (do NOT use `git add -A`)
3. Commit with message:
   ```
   Add <ComponentName> component and Storybook stories

   Implements all Figma variants and interaction states from node <nodeId>.
   
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```
4. Push to the current branch.

---

## STEP 8 — VERCEL DEPLOY (only if user chose option 1)

**Check Vercel project link:**
```bash
cat .vercel/project.json 2>/dev/null || echo "not linked"
```

**If already linked:** run `vercel --prod` to deploy.

**If NOT linked:**
- Inform the user: "This project is not yet linked to a Vercel project."
- Provide exact commands:
  ```bash
  npm i -g vercel    # if CLI not installed
  vercel login       # if not logged in
  vercel link        # link to existing or create new project
  vercel --prod      # deploy
  ```
- Recommend they type `! vercel link` in the prompt to run it interactively in this session.
- After linking, confirm `vercel.json` has the correct `buildCommand` and `outputDirectory`.

---

## CONSTRAINTS

- Always call `get_design_context` and `get_variable_defs` first — no exceptions.
- Never assume missing information — ask.
- Never resolve token aliases to hex values in component code.
- Never skip the STEP 6 review pause — user must explicitly approve before any git or Vercel action.
- Never use `git add -A` or `git add .` — stage specific files only.
- Treat interaction states separately from visual variant props.
- If the component already exists in `src/components/`, read it first before overwriting.
