import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";

export function useWSImageWithPlugin(
  url = import.meta.env.VITE_WS_URL as string
) {
  const imageSrc = ref<string | null>(null);
  const connected = ref(false);
  const error = ref<string | null>(null);
  let objectUrl: string | null = null;

  const revoke = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  };

  const handleMessage = (data: unknown) => {
    if (typeof data === "string") {
      try {
        if (data.startsWith("data:image/")) {
          revoke();
          imageSrc.value = data;
          return;
        }
        const parsed = JSON.parse(data);
        if (parsed?.type === "base64" && typeof parsed.data === "string") {
          revoke();
          imageSrc.value = parsed.data;
          return;
        }
      } catch {
        // ignore non-JSON strings
      }
    }

    if (data instanceof ArrayBuffer) {
      const blob = new Blob([data], { type: "image/jpeg" });
      revoke();
      objectUrl = URL.createObjectURL(blob);
      imageSrc.value = objectUrl;
      return;
    }
    if (data instanceof Blob) {
      revoke();
      objectUrl = URL.createObjectURL(data);
      imageSrc.value = objectUrl;
    }
  };

  const inst = getCurrentInstance()!;
  const gp = inst.appContext.config.globalProperties as any;

  onMounted(() => {
    gp.$connect(url, { passOptions: { binaryType: "arraybuffer" } });

    const ws: WebSocket = gp.$socket;
    if (!ws) {
      error.value = "No WebSocket instance from plugin";
      return;
    }

    const onOpen = () => {
      connected.value = true;
    };
    const onClose = () => {
      connected.value = false;
    };
    const onError = () => {
      error.value = "WebSocket error";
    };
    const onMessage = (evt: MessageEvent) => handleMessage(evt.data);

    ws.addEventListener("open", onOpen);
    ws.addEventListener("close", onClose);
    ws.addEventListener("error", onError);
    ws.addEventListener("message", onMessage);

    try {
      ws.binaryType = "arraybuffer";
    } catch {
      /* ignore */
    }

    onBeforeUnmount(() => {
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("close", onClose);
      ws.removeEventListener("error", onError);
      ws.removeEventListener("message", onMessage);
      gp.$disconnect();
      revoke();
    });
  });

  return { imageSrc, connected, error };
}
