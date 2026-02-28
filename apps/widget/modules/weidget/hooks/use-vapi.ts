import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TrancescriptMesssage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TrancescriptMesssage[]>([]);

  useEffect(() => {
    //only for testing the VAPI API, otherwise customers will provide their own instance of VAPI with their own API key
    const vapiInstance = new Vapi("35c3f932-e9cd-4c07-b823-fe485ad127c5");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.log(error, "error connecting to VAPI");
      setIsConnecting(false);
    });
    
    vapiInstance.on("message", (message) => {
      if(message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev, 
          { 
            role: message.role === "user" ? "user" : "assistant", 
            text: message.transcript }]);
      }
    });

    return () => {
      vapiInstance?.stop();
    }
  }, [])

    const startCall = () => {
      setIsConnecting(true);

      if(vapi) {
      //only for testing the VAPI API, otherwise customers will provide their own assistant ID
        vapi.start("ede756e2-fb7a-4a46-983e-228e816f8e99");
      }
    };

    const endCall = () => {
      if(vapi) {
        vapi.stop();
      }
    }

   
    return {
      isSpeaking,
      isConnecting,
      isConnected,
      transcript,
      startCall,
      endCall,
    }

}