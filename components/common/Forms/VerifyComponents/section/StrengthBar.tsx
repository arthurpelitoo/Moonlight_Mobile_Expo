
type StrengthBarProps = {
    level: number,
    color: string
}

export function StrengthBar({level, color} : StrengthBarProps) {
    return(
        <div className="flex gap-1">
            {/* se for nivel 0 nem gera as barras */}
            {[1, 2, 3, 4, 5].map((arrayIndexLevel) => (
                <div
                    key={arrayIndexLevel}
                    className="h-0.5 flex-1 rounded-full transition-all duration-500"
                    style={{
                        backgroundColor: arrayIndexLevel <= level ? color : "rgba(255,255,255,0.1)",
                    }}
                />
            ))}
        </div>
    )
}