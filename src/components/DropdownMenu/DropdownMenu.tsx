import { forwardRef, useState } from "react"
import type { ReactNode, ChangeEvent } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type DropdownMenuSize = "md" | "sm"

export interface DropdownMenuProps extends Omit<HTMLChakraProps<"div">, "onChange"> {
  size?: DropdownMenuSize
  /** Renders a search input above the options list */
  showSearchBar?: boolean
  /** Placeholder text for the search input */
  searchPlaceholder?: string
  /** Called with the current search query on every keystroke */
  onSearch?: (query: string) => void
  /** Renders an action button below the options list */
  showButton?: boolean
  /** Label for the action button */
  buttonLabel?: string
  /** Called when the action button is clicked */
  onButtonClick?: () => void
  /** DropdownOption elements rendered in the scrollable list */
  children?: ReactNode
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<DropdownMenuSize, { btnH: string; btnIconSize: string; btnFontSize: string }> = {
  md: { btnH: "40px", btnIconSize: "24px", btnFontSize: "14px" },
  sm: { btnH: "36px", btnIconSize: "20px", btnFontSize: "14px" },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  {
    size = "md",
    showSearchBar = false,
    searchPlaceholder = "Search",
    onSearch,
    showButton = false,
    buttonLabel = "Add item",
    onButtonClick,
    children,
    ...rest
  },
  ref
) {
  const [query, setQuery] = useState("")
  const { btnH, btnIconSize, btnFontSize } = sizeTokens[size]

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <chakra.div
      ref={ref}
      display="flex"
      flexDir="column"
      w="304px"
      bg="white"
      border="1px solid"
      borderColor="grey.100"
      borderRadius="16px"
      boxShadow="sm"
      py="2"
      overflow="hidden"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      {/* Search bar */}
      {showSearchBar && (
        <chakra.div px="4" py="2" flexShrink={0}>
          <chakra.label
            display="flex"
            alignItems="center"
            gap="2"
            px="3"
            py="2"
            bg="rgba(154,159,184,0.2)"
            border="1px solid transparent"
            borderRadius="8px"
            cursor="text"
          >
            <chakra.i
              className="ri-search-line"
              fontSize="16px"
              color="content.light.subtle"
              flexShrink={0}
              lineHeight={1}
            />
            <chakra.input
              flex={1}
              border="none"
              bg="transparent"
              outline="none"
              fontSize="14px"
              lineHeight="20px"
              color="content.light.default"
              fontFamily="Inter, sans-serif"
              placeholder={searchPlaceholder}
              value={query}
              onChange={handleSearch}
              _placeholder={{ color: "content.light.subtle" }}
              style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" }}
            />
          </chakra.label>
        </chakra.div>
      )}

      {/* Options list */}
      <chakra.div
        flex={1}
        overflowY="auto"
        maxH="284px"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#EDEDED", borderRadius: "100px" },
        }}
      >
        {children}
      </chakra.div>

      {/* Action button */}
      {showButton && (
        <chakra.div px="4" py="2" flexShrink={0}>
          <chakra.button
            type="button"
            display="flex"
            alignItems="center"
            gap="2"
            w="full"
            h={btnH}
            px="4"
            bg="interaction.neutral.default"
            border="1px solid"
            borderColor="interaction.neutral.default"
            borderRadius="8px"
            cursor="pointer"
            fontFamily="Inter, sans-serif"
            _hover={{ bg: "interaction.neutral.hover", borderColor: "interaction.neutral.hover" }}
            _active={{ bg: "interaction.neutral.active", borderColor: "interaction.neutral.active" }}
            _focusVisible={{
              outline: "none",
              ring: "2px",
              ringColor: "focus.brand-default",
              ringOffset: "2px",
            }}
            onClick={onButtonClick}
          >
            <chakra.i
              className="ri-add-circle-fill"
              fontSize={btnIconSize}
              color="interaction.main.default"
              flexShrink={0}
              lineHeight={1}
            />
            <chakra.span
              fontSize={btnFontSize}
              fontWeight="500"
              lineHeight="16px"
              color="content.light.default"
              style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
            >
              {buttonLabel}
            </chakra.span>
          </chakra.button>
        </chakra.div>
      )}
    </chakra.div>
  )
})
