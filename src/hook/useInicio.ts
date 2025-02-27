import { useEffect, useState } from 'react';

export type InstitucionData = {
    Descripcion?: {
        institucion_nombre?: string;
        institucion_api_google_map?: string;
        institucion_direccion?: string;
        autoridad?: {
            id_autoridad: number;
            nombre_autoridad: string;
            cargo_autoridad: string;
            foto_autoridad: string;
        }[];
    };
};

export type Publicaciones = {
    publicaciones_id: number;
    publicaciones_titulo: string;
    publicaciones_tipo: string;
    publicaciones_imagen: string;
    publicaciones_descripcion: string;
    publicaciones_fecha: string;
    publicaciones_autor: string;
    publicaciones_documento: string;
};

export function useInicioData() {
    const [institucionNombre, setInstitucionNombre] = useState('Cargando...');
    const [data, setData] = useState<InstitucionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mapsUbicacion, setmapsUbicacion] = useState('Cargando...');
    const [direccion, setDireccion] = useState('Cargando...');
    const [publicaciones, setPublicaciones] = useState<Publicaciones[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] =
        useState<Publicaciones | null>(null);

    useEffect(() => {
        const fetchInstitucion = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('Respuesta de la API1:', result);
                setData(result);
                setInstitucionNombre(
                    result?.Descripcion?.institucion_nombre ||
                        'Nombre no disponible'
                );
                setmapsUbicacion(
                    result?.Descripcion?.institucion_api_google_map ||
                        'https://www.google.com/maps/embed?...'
                );
                setDireccion(
                    result?.Descripcion?.institucion_direccion ||
                        'Direccion no definida'
                );
            } catch (error) {
                console.error('Error al obtener datos', error);
                setInstitucionNombre('Carrera no disponible');
                setmapsUbicacion('https://www.google.com/maps/embed?...');
                setDireccion('Direccion no definida');
            } finally {
                setLoading(false);
            }
        };

        const fetchPublicaciones = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/publicacionesAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('Respuesta de la API:', result);
                setPublicaciones(result);
            } catch (error) {
                console.error('Error al obtener publicaciones', error);
                setPublicaciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitucion();
        fetchPublicaciones();
    }, []);

    const openModal = (publicaciones: Publicaciones) => {
        setSelectedPublication(publicaciones);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedPublication(null);
    };

    return {
        institucionNombre,
        data,
        loading,
        mapsUbicacion,
        direccion,
        publicaciones,
        modalOpen,
        selectedPublication,
        openModal,
        handleClose,
    };
}
