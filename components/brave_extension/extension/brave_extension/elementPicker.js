window.onload = () => {
  console.log('im loaded!')
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const action = typeof msg === 'string' ? msg : msg.type
  switch (action) {
    case 'highlightElement': {
      const coords = msg.coords
      const rects = document.getElementsByClassName("masked")
      for (const rect of rects) {
        rect.setAttribute('x', coords.x)
        rect.setAttribute('y', coords.y)
        rect.setAttribute('width', coords.width)
        rect.setAttribute('height', coords.height)
      }
      break;
    }
  }
})
