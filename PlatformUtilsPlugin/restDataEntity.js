(function () {
  let handleLeftClick = (e) => {
    if (!window.__myScriptActive) return;

    let element = document.elementFromPoint(e.clientX, e.clientY);
    console.log("element", element);
    let dataId = element?.closest("[data-id]")?.getAttribute("data-id");

    if (dataId) {
      window.open(`rest/data/entity/${dataId}`, "_blank");
    } else {
      alert("❌ Data-ID не найден! Кликните по строке таблицы");
    }
  };

  let setupEventListener = () => {
    if (window.__myScriptActive) {
      document.addEventListener("click", handleLeftClick);
    } else {
      document.removeEventListener("click", handleLeftClick);
    }
  };

  // Инициализация
  window.__myScriptActive = window.__myScriptActive !== false;
  setupEventListener();

  // Обработчик изменения состояния
  document.addEventListener("myScriptStateChanged", setupEventListener);
})();
