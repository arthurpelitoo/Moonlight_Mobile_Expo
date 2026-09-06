import { CaretRightIcon } from "@phosphor-icons/react";
import { Button } from "../../../../common/Generic/Button/Button";

type FooterData ={
    label: string,
    href: string
};

type SectionProps = {
    title: string,
    items: FooterData[]
}

export function FooterSection({title, items} : SectionProps) {

    return(
        <div>
            <h2 className="text-2xl">{title}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <Button as="link" className="w-full justify-center lg:justify-stretch items-center flex hover:scale-101 lg:hover:scale-100 lg:hover:translate-x-2 transition-all" href={item.href} icon={<CaretRightIcon className="mr-2" size={20} weight="fill" />}>
                            {item.label}    
                        </Button>    
                    </li>
                ))}
            </ul>
        </div>
    );
}