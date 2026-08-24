import DataTable, { type TableColumn, type TableProps } from "react-data-table-component";
import { Spinner } from "../Spinner";
import { tableStyles } from "./TableStyles";
import { paginationOptions } from "./TraducaoTabela";

/**
 * RowData serve para dizer qual é o tipo de dados que o typescript pode esperar de cada linha (row) ou coluna (column),
 * então ao inserir dados do tipo "User" ele sabe que cada linha é "User".
 * O typescript tambem infere sozinho sem precisar dizer quando ele recebe o tipo diretamente no componente.
 * Aqui é preciso pois estou definindo um contrato, não posso usar TableColumn sem passar Generic (nao posso usar coluna sem passar o tipo generico do array).
 */

type Props<RowData> = {
    columns: TableColumn<RowData>[];
    data: RowData[];
    isLoading: boolean;
    subHeader?: boolean
    subHeaderComponent?: React.ReactNode
    // server-side
    totalRows?: number;
    onPageChange?: (page: number) => void;
} & TableProps<RowData>;

export function Table<RowData>(props: Props<RowData>){
    const {columns, data, isLoading, totalRows, onPageChange, ...rest} = props;
    return(
        <DataTable 
            columns={columns} 
            data={data} 
            progressPending={isLoading} 
            progressComponent={<Spinner variant="primary"/>} 
            noDataComponent={<p className="text-white/50 py-6">Nenhum registro encontrado</p>} 
            customStyles={tableStyles} 
            highlightOnHover
            pagination
            paginationComponentOptions={paginationOptions}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5]}
            paginationServer={totalRows !== undefined}         // ativa server-side se passar totalRows
            paginationTotalRows={totalRows}
            onChangePage={(page) => onPageChange?.(page)}
            {...rest} 
        />
    )
}