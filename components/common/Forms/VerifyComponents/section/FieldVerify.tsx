type FieldVerifyProps = {
    passed: boolean;
    showError: boolean;
    errorMessage: string;
}

export function FieldVerify({ passed, showError, errorMessage }: FieldVerifyProps) {
    if (!showError) return null;

    const color = passed ? "#1D9E75" : "#EF4444";

    return (
        <div className="flex flex-col gap-2 mt-1">
            <div className="flex gap-1">
                <div
                    className="h-0.5 flex-1 rounded-full transition-all duration-500"
                    style={{ backgroundColor: color }}
                />
            </div>
            {!passed && (
                <span className="text-xs" style={{ color }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
}