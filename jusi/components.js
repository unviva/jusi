import { jusi } from './jusi.js'
import { div, span, h5, button, table, thead, tbody, tr } from './elements.js'

jusi.components = {}

/* Loading Overlay */
export const loadingOverlay = div({
  classList: ['loading-overlay'],
  contains: [div({
    classList: ['loading']
  })]
})
jusi.components.loadingOverlay = loadingOverlay
//jusi.el.addTo(jusi.els.body, jusi.components.loadingOverlay) // add to body for fullscreen overlay

/* Close button */
export const closeButton = (clickFn) => {
  return span({ text: 'X', classList: ['close-btn'], events: { click: clickFn } })
}
jusi.components.closeButton = closeButton

/* Modal */
export const modal = (slots = {}) => {
  const modal = div({ classList: ['modal-overlay'] })
  slots.header.push(jusi.components.closeButton(() => {
    modal.remove()
  }))

  jusi.el.addTo(modal, div({
    classList: ['modal'],
    contains: [
      div({ classList: ['modal-header'], contains: slots.header }),
      div({ classList: ['modal-body'], contains: slots.body }),
      div({ classList: ['modal-footer'], contains: slots.footer }),
    ]
  }))
  return modal
}
jusi.components.modal = modal


/* Dropdown */
export const dropdown = (props) => {
  const btnO = { class: 'dropbtn' }
  let items = []

  if (props.icon) { btnO.icon = props.icon }
  if (props.text) { btnO.text = props.text }
  if (props.title) { items.push(h5({ text: props.title })) }
  const ddItems = [...items, ...props.items]
  // console.log(props.items, ddItems) 
  return div({
    classList: ['dropdown'],
    contains: [
      button(btnO),
      div({ class: 'dropdown-content', contains: ddItems })
    ]
  })
}
jusi.components.dropdown = dropdown

/* Table */
export const tableComponent = (props) => {
  return table({
    ...props,
    contains: [
      thead({ contains: [tr({})] }),
      tbody({ contains: [tr({})] })
    ]
  })
}
jusi.components.table = tableComponent

/* Pagination */


/* Toast */