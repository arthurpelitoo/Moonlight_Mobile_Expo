import { Fragment, useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { flexRender, useTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { CaretLeftIcon, CaretRightIcon, CaretDownIcon, CaretUpIcon } from "phosphor-react-native";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { appTableFeatures } from "@/src/utils/tableFeatures";

type TableProps<TRowData extends Record<string, any>> = {
  columns: ColumnDef<typeof appTableFeatures, TRowData>[];
  data: TRowData[];
  isLoading: boolean;
  subHeader?: boolean;
  subHeaderComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;

  // paginação server-side
  totalRows?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;

  // linhas expansíveis
  expandableRows?: boolean;
  renderExpandedRow?: (row: TRowData) => React.ReactNode;
};

export function Table<TRowData extends Record<string, any>>(props: TableProps<TRowData>) {
  const { theme, radius, space, font, fontSize } = useTheme();
  const { columns, data, isLoading, totalRows, currentPage = 1, onPageChange, pageSize = 5 } = props;

  const [expanded, setExpanded] = useState({});

  const isServerSide = totalRows !== undefined;

  const table = useTable({
    features: appTableFeatures,
    data,
    columns,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      expanded
    },
    onPaginationChange: (updater) => {
      const next: PaginationState = typeof updater === "function"
        ? updater({ pageIndex: currentPage - 1, pageSize })
        : updater;
      onPageChange?.(next.pageIndex + 1);
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => !!props.expandableRows,
    manualPagination: isServerSide,
    pageCount: isServerSide ? Math.ceil((totalRows ?? 0) / pageSize) : undefined
  });

  const rows = table.getRowModel().rows;

  return (
    <View style={{ width: "100%", borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: theme.borderBase }}>
      {props.subHeader && props.subHeaderComponent && (
        <View style={{ backgroundColor: theme.opacityBase, paddingHorizontal: space[3], paddingVertical: space[3] }}>
          {props.subHeaderComponent}
        </View>
      )}

      {isLoading ? (
        <View style={{ paddingVertical: space[8], alignItems: "center" }}>
          <Spinner />
        </View>
      ) : rows.length === 0 ? (
        <View style={{ paddingVertical: space[6], alignItems: "center" }}>
          {props.noDataComponent ?? (
            <P style={{ color: theme.secondaryColor, textAlign: "center" }}>
              Nenhum registro encontrado
            </P>
          )}
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(row) => row.id}
          contentContainerStyle={{ gap: space[3], padding: space[3] }}
          scrollEnabled={false}
          renderItem={({ item: row }) => (
            <Fragment>
              <Card
                variant="solid"
                style={{
                  alignItems: "stretch",
                  gap: space[2],
                  paddingVertical: space[4],
                  paddingHorizontal: space[4],
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const headerLabel =
                    typeof cell.column.columnDef.header === "string"
                      ? cell.column.columnDef.header
                      : cell.column.id;

                  return (
                    <View
                      key={cell.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: space[3],
                      }}
                    >
                      <P style={{ color: theme.secondaryColor, fontSize: fontSize.sm, fontFamily: font.base }}>
                        {headerLabel}
                      </P>
                      <View style={{ flexShrink: 1, alignItems: "flex-end" }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </View>
                    </View>
                  );
                })}

                {props.expandableRows && (
                  <Pressable
                    onPress={row.getToggleExpandedHandler()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: space[2],
                      marginTop: space[2],
                      paddingTop: space[2],
                      borderTopWidth: 1,
                      borderTopColor: theme.borderBase,
                    }}
                  >
                    {row.getIsExpanded() ? (
                      <CaretUpIcon size={16} color={theme.secondaryColor} />
                    ) : (
                      <CaretDownIcon size={16} color={theme.secondaryColor} />
                    )}
                    <P style={{ color: theme.secondaryColor, fontSize: fontSize.sm, fontFamily: font.base }}>
                      {row.getIsExpanded() ? "Ocultar detalhes" : "Ver detalhes"}
                    </P>
                  </Pressable>
                )}
              </Card>

              {props.expandableRows && row.getIsExpanded() && props.renderExpandedRow && (
                <View style={{ paddingLeft: space[3] }}>
                  {props.renderExpandedRow(row.original)}
                </View>
              )}
            </Fragment>
          )}
        />
      )}

      {isServerSide && (
        <View
          style={{
            backgroundColor: theme.opacityBase,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: space[2],
            paddingHorizontal: space[4],
            paddingVertical: space[2],
          }}
        >
          <P style={{ color: theme.secondaryColor, fontSize: fontSize.sm, fontFamily: font.base }}>
            {pageSize} por página
          </P>

          <Button
            variant="transparent"
            disabled={!table.getCanPreviousPage()}
            onPress={() => table.previousPage()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              opacity: table.getCanPreviousPage() ? 1 : 0.4,
            }}
          >
            <CaretLeftIcon size={16} color={theme.textPrimary} />
          </Button>

          <P style={{ color: theme.secondaryColor, fontSize: fontSize.sm, fontFamily: font.base }}>
            {table.state.pagination.pageIndex + 1} de {table.getPageCount()}
          </P>

          <Button
            variant="transparent"
            disabled={!table.getCanNextPage()}
            onPress={() => table.nextPage()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              opacity: table.getCanNextPage() ? 1 : 0.4,
            }}
          >
            <CaretRightIcon size={16} color={theme.textPrimary} />
          </Button>
        </View>
      )}
    </View>
  );
}
