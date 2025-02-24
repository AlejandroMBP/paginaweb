import { motion } from 'framer-motion';

interface Autoridad {
    id_autoridad: number;
    nombre_autoridad: string;
    cargo_autoridad: string;
    foto_autoridad: string;
}

interface AutoridadesSectionProps {
    autoridades: Autoridad[];
}

export default function AutoridadesSection({ autoridades }: AutoridadesSectionProps) {
    return (
        <section className="relative max-w-full">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-8 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
            >
                <motion.div initial={{ x: -20 }} animate={{ x: 20 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-12 h-1 bg-secondary rounded-full mr-3"></motion.div>
                <span className="relative z-10">AUTORIDADES</span>
                <motion.div initial={{ x: 20 }} animate={{ x: -20 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-12 h-1 bg-secondary rounded-full ml-3"></motion.div>
            </motion.h2>

            {autoridades.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {autoridades.map((autoridad) => (
                        <motion.div
                            key={autoridad.id_autoridad}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', borderColor: '#C20317' }}
                            transition={{ duration: 0.3 }}
                            className="relative border-4 border-white rounded-lg shadow-lg overflow-hidden min-w-[30rem] min-h-[40rem] transition-all duration-300 group"
                        >
                            <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style={{ backgroundImage: `url(https://serviciopagina.upea.bo/InstitucionUpea/Autoridad/${autoridad.foto_autoridad})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0511F2] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 text-center p-4">
                                <h3 className="text-lg font-bold text-primary">{autoridad.nombre_autoridad}</h3>
                                <p className="text-sm text-gray-600">{autoridad.cargo_autoridad}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg font-semibold mt-6">Cargando autoridad...</p>
            )}
        </section>
    );
}
