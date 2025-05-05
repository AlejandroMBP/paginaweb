'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { useInicioData } from '@/hook/useInicio';
import PortadaSeccion from '@/components/portada';
import Separador from '@/components/layout/separador';
import PublicacionesSection from '@/components/PublicacionesSection';
import AutoridadesSection from '@/components/autoridad';
import UbicacionSection from '@/components/Ubicacion';
import Preloader from '@/components/layout/preloader';

export default function InicioPage() {
    const {
        institucionNombre,
        data,
        loading,
        mapsUbicacion,
        direccion,
        publicaciones,
    } = useInicioData();

    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-100">
                <PortadaSeccion
                    titulo={
                        loading
                            ? 'Cargando...'
                            : institucionNombre.toUpperCase()
                    }
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                />
                {/* Separador decorativo */}
                <div
                    id="next-section"
                    className="w-full h-1 bg-primary rounded-full mb-6"
                ></div>

                {/* Sección 2: Últimas Publicaciones */}
                <PublicacionesSection publicaciones={publicaciones} />

                {/* Separador decorativo */}
                <Separador />

                {/* Sección 3: Autoridades */}
                {data?.Descripcion?.autoridad ? (
                    <AutoridadesSection
                        autoridades={data.Descripcion.autoridad}
                    />
                ) : (
                    <p className="text-center text-gray-500 text-lg font-semibold mt-6">
                        Cargando autoridad...
                    </p>
                )}

                {/* Separador decorativo */}
                <Separador color="bg-primary" height="h-1" />

                {/* Sección 4: Ubicación */}
                <UbicacionSection
                    mapsUbicacion={mapsUbicacion}
                    direccion={direccion}
                    loading={false}
                />
            </main>
        </Preloader>
    );
}
