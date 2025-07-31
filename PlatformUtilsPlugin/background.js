// Создаем пункт контекстного меню при установке
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "visUtils",
    title: "visUtils",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "off_plugin_functions",
    parentId: "visUtils",
    title: "Выключить функции плагина",
    contexts: ["all"]
  });
    
  chrome.contextMenus.create({
    id: "rest-data-entity",
    parentId: "visUtils",
    title: "Открыть rest/data/entity/id",
    contexts: ["all"]
  });

  console.log('Расширение установлено, меню создано');
});

// Обработчик клика в контекстном меню
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  try {
    // Внедряем контент-скрипт в текущую вкладку
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['restDataEntity.js']
    });
    
    switch (info.menuItemId) {
      case "rest-data-entity":
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            window.__myScriptActive = true;
            document.dispatchEvent(new Event('myScriptStateChanged'));
          }
        });
        break;
      case "off_plugin_functions":
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            window.__myScriptActive = false;
            document.dispatchEvent(new Event('myScriptStateChanged'));
          }
        });
        break;
    }
  } catch (error) {
    console.error("Ошибка при внедрении скрипта:", error);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert('⚠️ Ошибка расширения. Обновите страницу и попробуйте снова')
    });
  }
});