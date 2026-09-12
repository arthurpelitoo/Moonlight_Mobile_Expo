// import { useNavigate } from "react-router-dom";
import { useFetchMyOrders } from "../../../../hooks/fetchItems/store/useFetchMyOrders";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { OrderColumns } from "../../../../hooks/tables/customer/useOrderTable";
import { ExpandedOrderItems } from "./sections/ExpandedOrderItems";



function OrderPage() {
    const {orders, isLoading} = useFetchMyOrders();

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </div>
        );
    }


  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
        <header className="mb-10 mt-26 w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
            <h1 className="text-2xl text-center px-10">Meus Pedidos</h1>
        </header>

        <div className="container justify-self-center mb-36">
            <Table
                columns={OrderColumns}
                data={orders || []}
                isLoading={isLoading}
                expandableRows // Ativa o botão de (+)
                expandableRowsComponent={ExpandedOrderItems} // Componente que criamos acima
                noDataComponent={
                    <p className="white-text text-center py-10">
                        Você não fez nenhuma compra até o momento.
                    </p>
                }
            />
        </div>
    </main>
  )
}


export default OrderPage;
