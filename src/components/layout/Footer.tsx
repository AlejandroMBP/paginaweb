export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground p-4 text-center">
            <p>© {new Date().getFullYear()} <a href="#">MABP</a>. Todos los derechos reservados.</p>
        </footer>
    );
}
