import { VideoCardProps } from '@/hook/types';
import React, { useState } from 'react';

const VideoCard: React.FC<VideoCardProps> = ({ video, className = '' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!video) return null;

    const getYouTubeId = (url: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const youtubeId = getYouTubeId(video.video_enlace);
    const thumbnailUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        : null;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${className}`}
                onClick={handleOpenModal}
            >
                <div className="aspect-w-16 aspect-h-9 mb-4 relative rounded-md overflow-hidden">
                    {thumbnailUrl ? (
                        <div className="relative">
                            <img
                                src={thumbnailUrl}
                                alt={`Miniatura de ${video.video_titulo}`}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 rounded-full p-4">
                                    <svg
                                        className="w-12 h-12 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {video.video_titulo}
                </h3>

                {video.video_breve_descripcion && (
                    <div
                        className="text-gray-600 mb-3 line-clamp-3 prose prose-sm"
                        dangerouslySetInnerHTML={{
                            __html: video.video_breve_descripcion,
                        }}
                    />
                )}

                <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {video.video_tipo}
                    </span>
                </div>
            </div>

            {/* Modal para mostrar el video */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                                title={video.video_titulo}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-96"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoCard;
