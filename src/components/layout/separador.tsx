interface SeparadorProps {
    color?: string;
    height?: string;
}
export default function Separador({ color = "bg-primary", height = "h-1" }: SeparadorProps) {
    return (
        <div className={`w-full ${height} ${color} rounded-full`}></div>
    );
}