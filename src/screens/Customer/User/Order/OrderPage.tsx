// import { useNavigate } from "react-router-dom";
import { useFetchMyOrders } from "../../../../hooks/fetchItems/store/useFetchMyOrders";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { ExpandedOrderItems } from "./sections/ExpandedOrderItems";
import { H1, P } from "@/src/components/common/Generic/Text";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { useTheme } from "@/src/contexts/ThemeContext";
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader";
import { Animated, ScrollView, View } from "react-native";
import { useFadeIn } from "@/src/hooks/animation/useFadeIn";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyOrdersTable } from "@/src/hooks/tables/customer/useMyOrdersTable";



function OrderPage() {
    const {space} = useTheme()
    const fadeIn = useFadeIn();
    const {orders, isLoading} = useFetchMyOrders();
    const { OrderColumns } = useMyOrdersTable();

    if (isLoading) {
        return (
          <GradientBackground>
            <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Animated.View style={{ justifyContent: "center", width: "100%", height: "100%", padding: 24, opacity: fadeIn.opacity, transform: fadeIn.transform}}>
                  <Spinner />
                </Animated.View>
              </ScrollView>
            </SafeAreaView>
          </GradientBackground>
        );
    }


  return (
  <GradientBackground>
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Animated.View style={{padding: space[8], position: "relative", width: "100%", gap: space[8], opacity: fadeIn.opacity, transform: fadeIn.transform }}>

          <Card variant={"solid"} style={{marginBottom: space[8], marginTop: 100, padding: space[2]}}>
            <CardHeader><H1>Meus Pedidos</H1></CardHeader>
          </Card>
          <View style={{justifyContent: "center", padding: space[1]}}>
            <Table
                columns={OrderColumns}
                data={orders || []}
                isLoading={isLoading}
                expandableRows // Ativa o botão de (+)
                renderExpandedRow={(row) => <ExpandedOrderItems order={row}/>} // Componente que criamos acima
                noDataComponent={
                    <P style={{paddingVertical: space[8], textAlign: "center"}}>
                        Você não fez nenhuma compra até o momento.
                    </P>
                }
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  </GradientBackground>
  )
}


export default OrderPage;
