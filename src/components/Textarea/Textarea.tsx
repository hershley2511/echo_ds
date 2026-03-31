import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface TextareaProps extends Omit<HTMLChakraProps<"textarea">, "onChange"> {
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  resize?: "none" | "vertical" | "horizontal" | "both"
  maxLength?: number
  showCount?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    placeholder,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
    rows = 4,
    value,
    onChange,
    resize = "vertical",
    maxLength,
    showCount = false,
    ...rest
  },
  ref
) {
  const hasError = !!errorMessage
  const currentLength = typeof value === "string" ? value.length : 0

  return (
    <chakra.div display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && (
            <chakra.span color="red.500" ml="2px">*</chakra.span>
          )}
        </chakra.label>
      )}
      <chakra.textarea
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        rows={rows}
        maxLength={maxLength}
        bg="white"
        border="1px solid"
        borderColor={hasError ? "red.500" : "grey.100"}
        borderRadius="8px"
        px="12px"
        py="10px"
        fontSize="14px"
        color="slate.800"
        w="100%"
        resize={resize}
        lineHeight="1.5"
        _placeholder={{ color: "grey.400" }}
        _focusVisible={{
          outline: "none",
          borderColor: "green.500",
          boxShadow: "0 0 0 2px #DDFBC6",
        }}
        _disabled={{ bg: "grey.100", color: "grey.400", cursor: "not-allowed" }}
        {...rest}
      />
      <chakra.div display="flex" justifyContent="space-between" alignItems="center">
        <chakra.div>
          {hasError && (
            <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>
          )}
          {!hasError && helperText && (
            <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>
          )}
        </chakra.div>
        {showCount && maxLength && (
          <chakra.span fontSize="12px" color="grey.400">
            {currentLength}/{maxLength}
          </chakra.span>
        )}
      </chakra.div>
    </chakra.div>
  )
})
