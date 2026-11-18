import { jusi } from './jusi.js'
import { option, th, tr, td } from './elements.js'

/* ELEMENTS */
export const el = {}
el.addTo = (target, item) => target.append(item)
el.addFirst = (target, item) => target.prepend(item)
el.addLast = (target, item) => target.append(item)
el.addBefore = (target, item) => target.before(item)
el.addAfter = (target, item) => target.after(item)
el.render = (renderOptions) => {
  renderOptions.target.innerHTML = ""
  renderOptions.data.map(item => {
    const renderedEl = renderOptions.render(item)
    renderOptions.target.appendChild(renderedEl)
  })
  return renderOptions.target
}

el.replicate = (renderOptions) => {
  const items = []
  renderOptions.data.map(item => {
    const replicatedEl = renderOptions.render(item)
    items.push(replicatedEl)
  })
  return items
}

el.replicateSelectOptions = (data) => {
  const items = []
  Object.keys(data).map(key => {
    const item = option({ value: key, text: data[key] })
    items.push(item)
  })
  return items
}

el.renderTable = (renderOptions) => {
  const { target, data, columns } = renderOptions,
    thead = target.getElementsByTagName("thead")[0],
    theadTR = thead.getElementsByTagName("tr")[0],
    tbody = target.getElementsByTagName("tbody")[0]

  tbody.innerHTML = ""
  const colKeys = Object.keys(columns)

  colKeys.map((ck) => {
    theadTR.append(th({ text: columns[ck] }))
  })

  let rowTemplate = tr({})
  data.map((set) => {
    let row = rowTemplate.cloneNode(true)
    colKeys.map((cck, ci) => {
      row.append(td({ text: set[colKeys[ci]] }))
    })
    tbody.append(row)
  })
}

el.renderForm = (renderOptions) => {
  const { target, data } = renderOptions,
    inputs = target.getElementsByTagName('input'),
    selects = target.getElementsByTagName('select'),
    textareas = target.getElementsByTagName('textarea'),
    fields = [...inputs, ...selects, ...textareas]

  // reset form before setting values
  target.reset()

  fields.map(field => {
    const name = field.getAttribute('name'),
      type = field.getAttribute('type'),
      value = field.getAttribute('value'),
      fname = name.replace('[', '').replace(']', '')
    if (data[fname]) {
      switch (type) {
        case 'radio':
          if (value == data[fname]) {
            field.setAttribute('checked', true)
          }
          break;
        case 'checkbox':
          if (data[fname].includes(value)) {
            field.setAttribute('checked', true)
          }
          break;
        default:
          if (typeof (data[fname]) === 'object') {
            data[fname].map(val => {
              const o = field.querySelector(`option[value=${val}]`)
              if (o) o.selected = true
            })
          } else {
            field.value = data[fname]
          }
      }
    }
  })
}

el.parent = (item, selector) => item.closest(selector)
el.children = (item) => item.children
el.hide = (item) => item.style.display = 'none'
el.show = (item) => item.style.display = 'block'
el.invisible = (item) => item.style.visibility = 'hidden'
el.visible = (item) => item.style.visibility = 'visible'
el.close = (item) => item.remove()
el.open = (item) => document.body.appendChild(item)
el.clone = (item) => item.cloneNode(true)

jusi.el = el

export const els = {
  body: document.body,
  app: document.getElementById('app')
}

jusi.els = els

export default {
  el,
  els
}