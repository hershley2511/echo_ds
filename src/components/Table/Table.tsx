import { forwardRef, useState } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: string
  width?: string
  align?: "left" | "center" | "right"
  sortable?: boolean
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

export interface TableProps<T = Record<string, unknown>> extends HTMLChakraProps<"div"> {
  columns: TableColumn<T>[]
  data: T[]
  isStriped?: boolean
  isBordered?: boolean
  isHoverable?: boolean
  stickyHeader?: boolean
  emptyMessage?: string
  isLoading?: boolean
  onRowClick?: (row: T, index: number) => void
}

export const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  {
    columns,
    data,
    isStriped = false,
    isBordered = false,
    isHoverable = true,
    stickyHeader = false,
    emptyMessage = "No data available",
    isLoading = false,
    onRowClick,
    ...rest
  },
  ref
) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const handleSort = (col: TableColumn) => {
    if (!col.sortable) return
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(col.key)
      setSortDir("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0
    const aVal = (a as Record<string, unknown>)[sortKey]
    const bVal = (b as Record<string, unknown>)[sortKey]
    if (aVal === bVal) return 0
    const cmp = String(aVal) < String(bVal) ? -1 : 1
    return sortDir === "asc" ? cmp : -cmp
  })

  const borderStyle = isBordered ? "1px solid" : undefined

  return (
    <chakra.div
      ref={ref}
      w="100%"
      overflowX="auto"
      border="1px solid"
      borderColor="grey.100"
      borderRadius="8px"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      <chakra.table
        w="100%"
        borderCollapse="collapse"
        fontSize="14px"
        color="slate.800"
      >
        <chakra.thead
          bg="slate.100"
          position={stickyHeader ? "sticky" : undefined}
          top={stickyHeader ? 0 : undefined}
          zIndex={stickyHeader ? 1 : undefined}
        >
          <chakra.tr>
            {columns.map((col) => (
              <chakra.th
                key={col.key}
                px="14px"
                py="10px"
                textAlign={col.align ?? "left"}
                fontSize="12px"
                fontWeight="600"
                color="slate.700"
                letterSpacing="0.3px"
                textTransform="uppercase"
                borderBottom="1px solid"
                borderColor="grey.100"
                borderRight={borderStyle}
                w={col.width}
                cursor={col.sortable ? "pointer" : undefined}
                userSelect="none"
                _hover={col.sortable ? { bg: "grey.100" } : {}}
                onClick={() => handleSort(col)}
              >
                <chakra.div display="inline-flex" alignItems="center" gap="4px">
                  {col.header}
                  {col.sortable && (
                    <chakra.span fontSize="10px" color={sortKey === col.key ? "green.800" : "grey.400"}>
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                    </chakra.span>
                  )}
                </chakra.div>
              </chakra.th>
            ))}
          </chakra.tr>
        </chakra.thead>
        <chakra.tbody>
          {isLoading && (
            <chakra.tr>
              <chakra.td
                colSpan={columns.length}
                textAlign="center"
                py="32px"
                color="grey.400"
                fontSize="14px"
              >
                Loading…
              </chakra.td>
            </chakra.tr>
          )}
          {!isLoading && sortedData.length === 0 && (
            <chakra.tr>
              <chakra.td
                colSpan={columns.length}
                textAlign="center"
                py="32px"
                color="grey.400"
                fontSize="14px"
              >
                {emptyMessage}
              </chakra.td>
            </chakra.tr>
          )}
          {!isLoading && sortedData.map((row, rowIdx) => (
            <chakra.tr
              key={rowIdx}
              bg={isStriped && rowIdx % 2 === 1 ? "slate.100" : "white"}
              cursor={onRowClick ? "pointer" : undefined}
              _hover={isHoverable ? { bg: "green.50" } : {}}
              onClick={() => onRowClick?.(row, rowIdx)}
              transition="background 0.1s"
            >
              {columns.map((col) => (
                <chakra.td
                  key={col.key}
                  px="14px"
                  py="12px"
                  textAlign={col.align ?? "left"}
                  borderBottom="1px solid"
                  borderColor="grey.100"
                  borderRight={borderStyle}
                  borderColor2="grey.100"
                >
                  {col.render
                    ? col.render((row as Record<string, unknown>)[col.key], row, rowIdx)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </chakra.td>
              ))}
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </chakra.div>
  )
})
