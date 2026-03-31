import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface TabItem {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: string | number
  isDisabled?: boolean
}

export interface TabVerticalProps extends HTMLChakraProps<"div"> {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
}

export const TabVertical = forwardRef<HTMLDivElement, TabVerticalProps>(function TabVertical(
  { tabs, value, onChange, ...rest },
  ref
) {
  return (
    <chakra.div
      ref={ref}
      display="flex"
      flexDir="column"
      gap="2px"
      fontFamily="Inter, sans-serif"
      w="220px"
      {...rest}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <chakra.button
            key={tab.value}
            type="button"
            onClick={() => !tab.isDisabled && onChange(tab.value)}
            display="flex"
            alignItems="center"
            gap="10px"
            px="12px"
            py="10px"
            borderRadius="8px"
            fontSize="14px"
            fontWeight={isActive ? "600" : "400"}
            border="none"
            cursor={tab.isDisabled ? "not-allowed" : "pointer"}
            opacity={tab.isDisabled ? 0.5 : 1}
            bg={isActive ? "green.50" : "transparent"}
            color={isActive ? "green.800" : "slate.700"}
            textAlign="left"
            transition="all 0.15s"
            _hover={tab.isDisabled ? {} : { bg: isActive ? "green.50" : "slate.100", color: isActive ? "green.800" : "slate.800" }}
          >
            {tab.icon && (
              <chakra.span fontSize="16px" flexShrink={0}>{tab.icon}</chakra.span>
            )}
            <chakra.span flex={1}>{tab.label}</chakra.span>
            {tab.badge !== undefined && (
              <chakra.span
                px="7px"
                py="1px"
                bg={isActive ? "green.800" : "grey.100"}
                color={isActive ? "white" : "slate.700"}
                borderRadius="999px"
                fontSize="11px"
                fontWeight="600"
              >
                {tab.badge}
              </chakra.span>
            )}
          </chakra.button>
        )
      })}
    </chakra.div>
  )
})
