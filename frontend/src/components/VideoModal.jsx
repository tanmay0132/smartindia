import { X } from "lucide-react";

function VideoModal({ isOpen, onClose, videoUrl, type = "youtube" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-50 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
                >
                    <X className="w-6 h-6 text-white" />
                </button>

                {/* Video Wrapper (responsive 16:9 ratio) */}
                <div className="relative w-full pt-[56.25%]">
                    {type === "youtube" && (
                        <iframe
                            className="absolute inset-0 w-full h-full rounded-2xl"
                            src={videoUrl}
                            title="Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                        />
                    )}

                    {type === "local" && (
                        <video
                            controls
                            autoPlay
                            className="absolute inset-0 w-full h-full rounded-xl"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                </div>
            </div>
        </div>
    );
}

export default VideoModal;