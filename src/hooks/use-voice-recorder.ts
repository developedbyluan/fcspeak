declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: any) => void;
  start: () => void;
  stop: () => void;
}

import { useState, useRef, useEffect } from "react";

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const [text, setText] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isRecordedAudioPlaying, setIsRecordedAudioPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL);
      }
    };
  }, [recordedAudioURL]);

  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setText(transcript);
      };
    }
  }, []);

  useEffect(() => {
    const recordedAudio = recordedAudioRef.current;
    if (!recordedAudio) return;
    const stopPlaying = () => {
      setIsRecordedAudioPlaying(false);
    };
    recordedAudio.addEventListener("ended", stopPlaying);
    return () => {
      recordedAudio.removeEventListener("ended", stopPlaying);
    };
  }, [recordedAudioRef, isRecordedAudioPlaying]);

  const startRecording = async () => {
    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioURL(url);
        audioChunks.current = [];

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const startTranscribing = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const stopTranscribing = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const revokeRecordedAudioURL = () => {
    if (recordedAudioURL) {
      URL.revokeObjectURL(recordedAudioURL);
      setRecordedAudioURL(null);
      setText("");
    }
  };
  const toggleRecordedAudioPlaying = () => {
    if (!recordedAudioRef.current) return;
    if (isRecordedAudioPlaying) {
      recordedAudioRef.current.pause();
      recordedAudioRef.current.currentTime = 0;
      setIsRecordedAudioPlaying(false);
    } else {
      recordedAudioRef.current.play();
      setIsRecordedAudioPlaying(true);
    }
  };
  return {
    isRecording,
    recordedAudioURL,
    error,
    startRecording,
    stopRecording,
    startTranscribing,
    stopTranscribing,
    text,
    recordedAudioRef,
    revokeRecordedAudioURL,
    toggleRecordedAudioPlaying,
    isRecordedAudioPlaying,
  };
}
