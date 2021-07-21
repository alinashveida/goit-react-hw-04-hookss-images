import { alert } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'

export function onError(message) {
  return alert({
    title: 'Ошибка',
    text: `${message}`,
    autoOpen: true,
    minHeight: '16px',
    width: '300px',
    maxTextHeight: null,
    animateSpeed: 'normal',
    shadow: true,
    delay: 1500,
  })
}
