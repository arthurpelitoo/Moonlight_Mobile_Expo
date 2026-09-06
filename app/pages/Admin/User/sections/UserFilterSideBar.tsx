import { CaretDownIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Dropdown } from "../../../../components/common/Generic/Dropdown";
import { getAnimationState } from "../../../../utils/ui/animation/animationState";
import { InputBar } from "../../../../components/common/Generic/InputBar";
import { useState } from "react";
import { useUserFilters } from "../../../../hooks/filters/admin/useUserFilters";
import { formatCPF } from "../../../../utils/Validation/dataRules/User/userCpf";
import { CheckIcon } from "@phosphor-icons/react";

type UserFilterSideBarProps = {
  open: boolean;
  onClose: () => void;
}

export function UserFilterSideBar(props: UserFilterSideBarProps) {
  const { styles } = getAnimationState(props.open);
  const { filters } = useUserFilters();
  const customerActive = getAnimationState(filters.type === "customer").styles;
  const adminActive = getAnimationState(filters.type === "admin").styles;

  // estado local — segura o que o usuário está digitando
  const [cpf, setCpf] = useState(filters.cpf ?? "");
  const [email, setEmail] = useState(filters.email ?? "");

  function handleCleanUpFilters() {
    setCpf("");
    setEmail("");
    filters.onCleanUpFilters?.();
  }

  function handleConfirmFilters() { filters.onConfirmFilters?.(cpf.replace(/\D/g, ""), email, filters.type); }

  return (
    <aside className={`
            fixed top-0 left-0 h-full w-64 z-30
            bg-night-soft border-r border-white/10
            flex flex-col gap-6 p-4 overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${styles.slideInsideScreen}
          `}>
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">Filtros</span>
        <Button onClick={props.onClose} className="text-gray-400 hover:text-white">
          <XIcon size={20} />
        </Button>
      </div>
      <div className="w-full flex justify-center">
        <Dropdown
          backgroundActive="on"
          alignment="middle"
          trigger={(open) => (
            <Button
              className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
              as="button"
              variant="transparent"
            >
              Email
              <CaretDownIcon
                size={20}
                className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </Button>
          )}
        >
          <div className="p-2">
            <h3 className="text-center">Email</h3>
            <InputBar
              variant="secondary"
              className="w-45 text-center mx-2"
              placeholder="ex: abc@servico.com"
              autoComplete="off"
              id="user-cpf"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="numeric"
            />
          </div>
        </Dropdown>
      </div>
      <div className="w-full flex justify-center">
        <Dropdown
          backgroundActive="on"
          alignment="middle"
          trigger={(open) => (
            <Button
              className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
              as="button"
              variant="transparent"
            >
              Cpf
              <CaretDownIcon
                size={20}
                className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </Button>
          )}
        >
          <div className="p-2">
            <h3 className="text-center">Cpf</h3>
            <InputBar
              variant="secondary"
              className="w-45 text-center mx-2"
              placeholder="ex: 000.000.000-00"
              autoComplete="off"
              id="user-cpf"
              type="text"
              value={cpf}
              maxLength={14}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              inputMode="numeric"
            />
          </div>
        </Dropdown>
      </div>
      <div className="w-full flex justify-center">
        <Dropdown
          backgroundActive="on"
          alignment="middle"
          trigger={(open) => (
            <Button
              className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
              as="button"
              variant="transparent"
            >
              Tipo de Usuario
              <CaretDownIcon
                size={20}
                className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </Button>
          )}
        >
          <Button
            id=""
            as="button"
            variant="transparent"
            onClick={() => filters.onChangeType("")}
            className={`max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
          >
            Limpar Filtro
          </Button>
          <Button
            id="" as="button"
            variant="transparent" onClick={() => filters.onChangeType("customer")}
            className={`max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
          >
            Cliente
            <span>
              <CheckIcon
                size={20}
                className={`${customerActive.fadeInOpacity} ${customerActive.slideDown} transition-all duration-300`}
              />
            </span>
          </Button>
          <Button
            id="" as="button"
            variant="transparent" onClick={() => filters.onChangeType("admin")}
            className={`max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
          >
            Administrador
            <span>
              <CheckIcon
                size={20}
                className={`${adminActive.fadeInOpacity} ${adminActive.slideDown} transition-all duration-300`}
              />
            </span>
          </Button>
        </Dropdown>
      </div>
      <div className="w-full flex flex-col gap-2 justify-center">
        <Button
          as="button"
          variant="cta"
          onClick={handleConfirmFilters}
          className="transition-all duration-300 p-2 rounded-md text-sm mt-2 animate-glow-cta"
        >
          Aplicar filtros
        </Button>
        <Button
          as="button"
          variant="danger"
          onClick={handleCleanUpFilters}
          className={`transition-all duration-300 p-2 rounded-md text-sm`}
        >
          Apagar filtros
        </Button>
      </div>
    </aside>
  );
}
