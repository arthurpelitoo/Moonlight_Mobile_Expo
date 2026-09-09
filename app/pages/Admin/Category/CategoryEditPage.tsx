/*import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { CategoryForm } from "./sections/CategoryForm";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

export function CategoryEditPage() {
    const { state } = useLocation();
    const category: CategoryResponseDTO = state.category;

    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-night-soft via-night-soft to-night">
            <Card variant="primary" className="flex flex-col mb-10 gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/categories" className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20">
                        <ArrowLeftIcon size={32} weight="thin" />
                    </Button>
                    <h1 className="text-2xl">Editar Categoria:</h1>
                </CardHeader>
                <hr />
                <CategoryForm mode="edit" category={category}/>
            </Card>  
        </main>
    )
}
*/