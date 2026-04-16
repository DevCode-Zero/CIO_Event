import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Loader2, User } from "lucide-react";
import { db } from "../utils/database";

interface CameraScreenProps {
  onSuccess: (name: string) => void;
}

export function CameraScreen({ onSuccess }: CameraScreenProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "processing" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStatus("scanning");

      setTimeout(() => {
        simulateFaceRecognition();
      }, 2000);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Hmm… we couldn't access your camera. Let's try that again.");
    }
  };

  const simulateFaceRecognition = async () => {
    setStatus("processing");

    try {
      const attendees = await db.getAttendees();

      if (!attendees || attendees.length === 0) {
        setStatus("error");
        setErrorMessage("No registered attendees found. Please check in at the registration desk.");
        setTimeout(() => {
          setStatus("scanning");
          simulateFaceRecognition();
        }, 2500);
        return;
      }

      const randomAttendee = attendees[Math.floor(Math.random() * attendees.length)];
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onSuccess(randomAttendee.name);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to verify. Please try again.");
      setTimeout(() => {
        setStatus("scanning");
        simulateFaceRecognition();
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#5b8def]/5 to-transparent" />

      <div className="relative z-10 px-6 pt-8 pb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          style={{ fontSize: "1.5rem", fontWeight: 600 }}
        >
          Face Authentication
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mt-2"
          style={{ fontSize: "0.9375rem" }}
        >
          {status === "scanning" && "Align your face within the frame"}
          {status === "processing" && "Verifying your identity..."}
          {status === "error" && errorMessage}
          {status === "idle" && "Starting camera..."}
        </motion.p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full rounded-3xl overflow-hidden bg-secondary/50 backdrop-blur-sm"
          >
            {stream ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-24 h-24 text-muted-foreground/30" />
              </div>
            )}

            <AnimatePresence>
              {status === "scanning" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-64 h-80 border-2 border-primary rounded-3xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0a0c14]/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-foreground" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                      Verifying...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-0 p-6"
                >
                  <div className="bg-destructive/90 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <p className="text-destructive-foreground" style={{ fontSize: "0.9375rem" }}>
                      {errorMessage}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-16 left-0 right-0 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Secure AI scanning
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
