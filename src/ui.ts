import Mixpanel from "./mixpanel";

const mixpanel = new Mixpanel(/* YOUR PROJECT ID */"");

document.getElementById('create').onclick = () => {
  const textbox = document.getElementById('count') as HTMLInputElement;
  const count = parseInt(textbox.value, 10);
  parent.postMessage({ pluginMessage: { type: 'create-shapes', count } }, '*')
  mixpanel.track("Create Clicked");
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  mixpanel.track("Cancel Clicked");
}

window.onmessage = async (event) => {
  const message = event.data.pluginMessage;

  if (message.type === "identify") {
    mixpanel.identify(message.userId);
    mixpanel.track("Plugin Started");
  }
}