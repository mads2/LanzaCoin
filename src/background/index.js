// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log("index.js details")
  console.log(details)
})
