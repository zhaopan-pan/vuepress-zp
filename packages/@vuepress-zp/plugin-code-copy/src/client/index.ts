/**
 * add listener to code node
 * @param node current node
 * @param index index
 */
const addListener = (node: Element, index: number): void => {
  node.addEventListener('mouseover', () => {
    const hasBtn = node.lastElementChild?.classList.contains('copy-code-btn')
    if (hasBtn) {
      node.lastElementChild?.classList.add('copy-code-btn-show')
    } else {
      createBtn(node, index)
    }
  })

  node.addEventListener('mouseout', () => {
    node.lastElementChild?.classList.remove('copy-code-btn-show')
  })
}

/**
 * create copy button
 * @param node current node
 * @param index index
 */
const createBtn = (node: Element, index: number): void => {
  const copyBtn = document.createElement('clipboard-copy')
  copyBtn.className = 'copy-code-btn'
  // add icon
  copyBtn.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="copy-icon copy-icon-${index}"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>
   <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="copy-success-icon copy-success-icon-${index}"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>`
  node.appendChild(copyBtn)

  const displayCopyResult = (text: string): void => {
    const copyIcon = document.querySelector(`.copy-icon-${index}`)
    copyBtn?.setAttribute('data-tooltip-text', text)
    const copySuccessIcon = document.querySelector(
      `.copy-success-icon-${index}`
    )
    copyIcon?.classList.add('copy-icon-hidden')
    copySuccessIcon?.classList.add('copy-success-icon-show')
    copyBtn?.classList.add('copy-code-btn-active', 'copy-code-btn-tooltip')
    setTimeout(() => {
      copyIcon?.classList.remove('copy-icon-hidden')
      copySuccessIcon?.classList.remove('copy-success-icon-show')
      copyBtn?.classList.remove('copy-code-btn-active', 'copy-code-btn-tooltip')
    }, 2000)
  }
  // copyBtn’s click event
  copyBtn.addEventListener('click', async () => {
    // pre tag
    const preNode = Array.from(node.children).find((n) =>
      n.classList.value.includes('language-')
    )
    const codeText = preNode?.textContent || ''
    const res = await setClipboard(codeText)
    if (res?.err) {
      displayCopyResult('copy failed!')
      return
    }
    displayCopyResult('Copied!')
  })
}

/**
 * add text into Clipboard
 * @param text content
 */
async function setClipboard(text: string): Promise<{ err: boolean } | void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    console.error('copy-fail:', e)
    return { err: true }
  }
}

/**
 * init code copy btn
 */
export const initCopyBtn = (): void => {
  const nodeList = document.querySelectorAll("div[class*='language-']")

  nodeList?.forEach((node: Element, index) => {
    node?.setAttribute('style', 'position:relative')
    addListener(node, index)
  })
}