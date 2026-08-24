

export function BackgroundCircle() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-150 h-150 rounded-full border border-white/3" />
            <div className="absolute top-[-10%] right-[-5%] w-100 h-100 rounded-full border border-white/5" />
            <div className="absolute bottom-[-15%] left-[-10%] w-125 h-125 rounded-full border border-white/3" />
        </div>
    );
}