import { ArrowRightIcon, CheckIcon, ImageIcon, TagIcon} from "@phosphor-icons/react";
import { InputFieldForm } from "../../../../components/common/Forms/InputFieldForm";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../components/common/Forms/LoadingDots";
import { FieldVerify } from "../../../../components/common/Forms/VerifyComponents/section/FieldVerify";
import { useCategoryForm } from "../../../../hooks/validation/Admin/useCategoryForm";
import { isCategoryNameValid } from "../../../../utils/Validation/dataRules/Category/categoryName";
import { isDescriptionValid } from "../../../../utils/Validation/dataRules/Category/categoryDescription";
import { TextAreaForm } from "../../../../components/common/Forms/TextAreaFrom";
import type { CategoryResponseDTO } from "../../../../@types/category/category.dto";


type CategoryFormProps = {
    mode: "create" | "edit";
    category?: CategoryResponseDTO;
}

export function CategoryForm({mode, category} : CategoryFormProps){

    const { fields, ui, setField, handleSubmit, handleBlur, showErrors } = useCategoryForm(mode, category ? {
        name: category.name,
        description: category.description,
        image: category.image ?? ""
    } : undefined);

    // Tela de sucesso
    if (ui.submitted && !ui.apiError && ui.success) {
        return (
            <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <CheckIcon size={32} className="text-emerald-400" weight="bold" />
                </div>
                <h3 className="text-white text-lg font-light tracking-wider">{mode === "create" ? "Categoria cadastrada!" : "Categoria atualizada!"}</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-1">
                <div>
                   <InputFieldForm
                        id="category-name" label="Título" type="text"
                        value={fields.name} onChangeState={setField("name")}
                        onBlur={handleBlur("name")}
                        placeholder="Nome da Categoria"
                        maxLength={25}
                        icon={<TagIcon size={18} />}
                    />
                    <FieldVerify showError={showErrors.showErrorName} passed={isCategoryNameValid(fields.name)} errorMessage="O nome da categoria tem que ter 1 ou até no maximo 25 caracteres"/>
                </div>
            </div>
            <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-1">
                <div>
                    <TextAreaForm
                        id="category-description" label="Descrição"
                        value={fields.description} onChangeState={setField("description")}
                        placeholder="Descrição da Categoria" maxLength={255}
                    />
                    <FieldVerify showError={showErrors.showErrorDescription} passed={isDescriptionValid(fields.description)} errorMessage="A descrição tem que ter 1 ou até no maximo 255 caracteres"/>
                </div>
            </div>
            <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-1">
                <InputFieldForm
                    id="category-image" label="URL da Imagem do Card" type="text"
                    value={fields.image} onChangeState={setField("image")}
                    placeholder="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg"
                    maxLength={255}
                    icon={<ImageIcon size={18} />}
                />
            </div>

            {ui.apiError && (
                <p className="text-sm text-red-400 text-center">{ui.apiError}</p>
            )}

            <Button
              id="category-submit-btn"
              onClick={() => handleSubmit(category?.id_category)}
              disabled={ui.loading}
              variant="primary"
              className="w-full py-3.5 rounded-md text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 mt-2"
            >
                {ui.loading ? <LoadingDots /> : <>{mode === "create" ? "Cadastrar Categoria" : "Salvar Alterações"} <ArrowRightIcon size={16} weight="bold" /></>}
            </Button>
        </div>
    );
}
