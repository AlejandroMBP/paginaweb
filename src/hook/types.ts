export interface Video {
    video_id: number;
    video_enlace: string;
    video_titulo: string;
    video_breve_descripcion: string;
    video_tipo: string;
}

export interface VideoCardProps {
    video: Video | null;
    className?: string;
}
