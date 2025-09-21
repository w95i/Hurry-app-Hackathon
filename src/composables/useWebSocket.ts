import { ref } from "vue";

export function useWebSocket(url: string) {
  const connected = ref(false);
  const statusText = ref("Connecting…");
  const ws = ref<WebSocket | null>(null);
  const lastMessage = ref<any>(null);

  function connect(onMessage?: (data: any) => void) {
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      connected.value = true;
      statusText.value = "Connected.";
    };

    ws.value.onclose = () => {
      connected.value = false;
      statusText.value = "Disconnected.";
    };

    ws.value.onerror = () => {
      statusText.value = "WebSocket error.";
    };

    ws.value.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        data = event.data;
      }
      lastMessage.value = data;
      if (onMessage) onMessage(data);
    };
  }

  function send(data: any) {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify(data));
    }
  }

  function close() {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.close();
    }
    ws.value = null;
  }

  return {
    ws,
    connected,
    statusText,
    lastMessage,
    connect,
    send,
    close,
  };
}