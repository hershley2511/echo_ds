import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface SidebarItem {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: string | number
  isDisabled?: boolean
  children?: SidebarItem[]
}

export interface SidebarProps extends HTMLChakraProps<"nav"> {
  items: SidebarItem[]
  activeValue?: string
  onSelect?: (value: string) => void
  logo?: React.ReactNode
  footer?: React.ReactNode
  isCollapsed?: boolean
}

function SidebarNavItem({
  item,
  activeValue,
  onSelect,
  isCollapsed,
  depth = 0,
}: {
  item: SidebarItem
  activeValue?: string
  onSelect?: (value: string) => void
  isCollapsed?: boolean
  depth?: number
}) {
  const isActive = item.value === activeValue

  return (
    <chakra.div>
      <chakra.button
        type="button"
        display="flex"
        alignItems="center"
        gap="10px"
        w="100%"
        px={isCollapsed ? "12px" : `${12 + depth * 16}px`}
        py="9px"
        borderRadius="8px"
        fontSize="14px"
        fontWeight={isActive ? "600" : "400"}
        border="none"
        cursor={item.isDisabled ? "not-allowed" : "pointer"}
        opacity={item.isDisabled ? 0.5 : 1}
        bg={isActive ? "green.50" : "transparent"}
        color={isActive ? "green.800" : "slate.700"}
        textAlign="left"
        transition="all 0.15s"
        justifyContent={isCollapsed ? "center" : "flex-start"}
        title={isCollapsed ? item.label : undefined}
        onClick={() => !item.isDisabled && onSelect?.(item.value)}
        _hover={item.isDisabled ? {} : { bg: isActive ? "green.50" : "slate.100", color: isActive ? "green.800" : "slate.800" }}
      >
        {item.icon && (
          <chakra.span fontSize="18px" flexShrink={0}>{item.icon}</chakra.span>
        )}
        {!isCollapsed && (
          <>
            <chakra.span flex={1}>{item.label}</chakra.span>
            {item.badge !== undefined && (
              <chakra.span
                px="7px"
                py="1px"
                bg={isActive ? "green.800" : "grey.100"}
                color={isActive ? "white" : "slate.700"}
                borderRadius="999px"
                fontSize="11px"
                fontWeight="600"
              >
                {item.badge}
              </chakra.span>
            )}
          </>
        )}
      </chakra.button>
      {!isCollapsed && item.children?.map((child) => (
        <SidebarNavItem
          key={child.value}
          item={child}
          activeValue={activeValue}
          onSelect={onSelect}
          depth={depth + 1}
        />
      ))}
    </chakra.div>
  )
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { items, activeValue, onSelect, logo, footer, isCollapsed = false, ...rest },
  ref
) {
  return (
    <chakra.nav
      ref={ref}
      display="flex"
      flexDir="column"
      h="100%"
      w={isCollapsed ? "64px" : "240px"}
      bg="white"
      borderRight="1px solid"
      borderColor="grey.100"
      transition="width 0.2s"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      {logo && (
        <chakra.div
          p={isCollapsed ? "16px 12px" : "20px 16px"}
          borderBottom="1px solid"
          borderColor="grey.100"
          display="flex"
          alignItems="center"
          justifyContent={isCollapsed ? "center" : "flex-start"}
        >
          {logo}
        </chakra.div>
      )}
      <chakra.div flex={1} overflowY="auto" p="8px" display="flex" flexDir="column" gap="2px">
        {items.map((item) => (
          <SidebarNavItem
            key={item.value}
            item={item}
            activeValue={activeValue}
            onSelect={onSelect}
            isCollapsed={isCollapsed}
          />
        ))}
      </chakra.div>
      {footer && (
        <chakra.div
          p={isCollapsed ? "12px" : "12px 16px"}
          borderTop="1px solid"
          borderColor="grey.100"
        >
          {footer}
        </chakra.div>
      )}
    </chakra.nav>
  )
})
