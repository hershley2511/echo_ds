import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface TabItem {
  label: string
  value: string
  badge?: string | number
  isDisabled?: boolean
}

export interface TabHorizontalProps extends HTMLChakraProps<"div"> {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
  variant?: "underline" | "pill"
}

export const TabHorizontal = forwardRef<HTMLDivElement, TabHorizontalProps>(function TabHorizontal(
  { tabs, value, onChange, variant = "underline", ...rest },
  ref
) {
  if (variant === "pill") {
    return (
      <chakra.div
        ref={ref}
        display="inline-flex"
        gap="4px"
        p="4px"
        bg="slate.100"
        borderRadius="8px"
        fontFamily="Inter, sans-serif"
        {...rest}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value
          return (
            <chakra.button
              key={tab.value}
              type="button"
              onClick={() => !tab.isDisabled && onChange(tab.value)}
              display="inline-flex"
              alignItems="center"
              gap="6px"
              px="12px"
              py="6px"
              borderRadius="6px"
              fontSize="13px"
              fontWeight="500"
              border="none"
              cursor={tab.isDisabled ? "not-allowed" : "pointer"}
              opacity={tab.isDisabled ? 0.5 : 1}
              bg={isActive ? "white" : "transparent"}
              color={isActive ? "slate.800" : "slate.700"}
              boxShadow={isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none"}
              transition="all 0.15s"
              _hover={tab.isDisabled ? {} : { color: "slate.800" }}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <chakra.span
                  px="6px"
                  py="1px"
                  bg={isActive ? "green.50" : "grey.100"}
                  color={isActive ? "green.800" : "slate.700"}
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
  }

  return (
    <chakra.div
      ref={ref}
      display="flex"
      borderBottom="2px solid"
      borderColor="grey.100"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <chakra.button
            key={tab.value}
            type="button"
            onClick={() => !tab.isDisabled && onChange(tab.value)}
            display="inline-flex"
            alignItems="center"
            gap="6px"
            px="16px"
            py="10px"
            fontSize="14px"
            fontWeight={isActive ? "600" : "400"}
            border="none"
            borderBottom="2px solid"
            mb="-2px"
            cursor={tab.isDisabled ? "not-allowed" : "pointer"}
            opacity={tab.isDisabled ? 0.5 : 1}
            bg="transparent"
            color={isActive ? "green.800" : "slate.700"}
            borderColor={isActive ? "green.800" : "transparent"}
            transition="all 0.15s"
            _hover={tab.isDisabled ? {} : { color: "green.800" }}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <chakra.span
                px="6px"
                py="1px"
                bg={isActive ? "green.50" : "grey.100"}
                color={isActive ? "green.800" : "slate.700"}
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
