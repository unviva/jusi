import { addUnit } from './utils.js'
import { jusi } from './jusi.js'

export const createElement = (tag, props = {}) => {
  const el = document.createElement(tag);
  // console.log(el, props.attrs)

  if (props.text) {
    el.innerText = props.text;
  }

  if (props.icon) {
    const i = document.createElement('i')
    i.classList.add('bi')
    i.classList.add(`bi-${props.icon}`)
    i.classList.add('icon')
    el.insertBefore(i, el.firstChild)
  }

  if (props.classList) {
    if (typeof (props.classList) === 'object') {
      props.classList?.map(cls => el.classList.add(cls))
    } else {
      el.classList.add(props.classList)
    }
  }

  if (props.class) {
    if (props.class.includes(' ')) {
      const cl = props.class.split(' ')
      cl.map(cls => el.classList.add(cls))
    } else {
      el.classList.add(props.class)
    }
  }


  let { href, src, name, type, value, rows, cols, placeholder, multiple, checked, selected } = props
  if (!props.attrs) { props.attrs = {} }
  if (href) { props.attrs.href = href }
  if (src) { props.attrs.src = src }
  if (name) { props.attrs.name = name }
  if (type) { props.attrs.type = type }
  if (value) { props.attrs.value = value }
  if (rows) { props.attrs.rows = rows }
  if (cols) { props.attrs.cols = cols }
  if (placeholder) { props.attrs.placeholder = placeholder }
  if (multiple) { props.attrs.multiple = multiple }
  if (checked) { props.attrs.checked = checked }
  if (selected) { props.attrs.selected = selected }

  // console.log(props)
  if (props.contains) {
    if (typeof (props.contains) === 'object') {
      props.contains.map(item => {
        // console.log(item)
        el.appendChild(item)
      })
    } else {
      el.appendChild(props.contains)
    }
  }

  if (props.children) {
    // console.log(props.children)
    props.children.map(child => {
      console.log(child)
      el.appendChild(child)
    })
    console.log(el)
  }

  if (props.attrs) {
    // console.log(props.attrs)
    if (props.attrs.style) {
      Object.keys(props.attrs.style).map(item => el.style[item] = addUnit(item, props.attrs.style[item]))
      // console.log(el, props.attrs.style, el.style)
    }

    Object.keys(props.attrs).map(attr => {
      if (attr !== 'style') {
        el.setAttribute(attr, props.attrs[attr])
      }
    })
  }

  if (props.events) {
    Object.keys(props.events).map(item => {
      el.addEventListener(item, props.events[item])
    })
  }

  if (props.render) {
    el.render = (data, template) => {
      console.log(template)
    }
  }

  return el
}


/* elements */
export const header = (props) => createElement('header', props)
export const main = (props) => createElement('main', props)
export const footer = (props) => createElement('footer', props)

export const form = (props) => createElement('form', props)
export const option = (props) => createElement('option', props)
export const optgroup = (props) => createElement('optgroup', props)
export const label = (props) => createElement('label', props)
export const legend = (props) => createElement('legend', props)

export const table = (props) => createElement('table', props)
export const thead = (props) => createElement('thead', props)
export const tbody = (props) => createElement('tbody', props)
export const tfoot = (props) => createElement('tfoot', props)
export const tr = (props) => createElement('tr', props)
export const th = (props) => createElement('th', props)
export const td = (props) => createElement('td', props)


export const ol = (props) => createElement('ol', props)
export const ul = (props) => createElement('ul', props)
export const li = (props) => createElement('li', props)
export const embed = (props) => createElement('embed', props)
export const iframe = (props) => createElement('iframe', props)
export const article = (props) => createElement('article', props)
export const img = (props) => createElement('img', props)
export const span = (props) => createElement('span', props)
export const div = (props) => createElement('div', props)
export const button = (props) => createElement('button', props)
export const h1 = (props) => createElement('h1', props)
export const h2 = (props) => createElement('h2', props)
export const h3 = (props) => createElement('h3', props)
export const h4 = (props) => createElement('h4', props)
export const h5 = (props) => createElement('h5', props)
export const h6 = (props) => createElement('h6', props)
export const hr = (props = {}) => createElement('hr', props)
export const blockquote = (props) => createElement('blockquote', props)
export const canvas = (props) => createElement('canvas', props)
export const caption = (props) => createElement('caption', props)
export const code = (props) => createElement('code', props)
export const b = (props) => createElement('b', props)
export const p = (props) => createElement('p', props)
export const pre = (props) => createElement('pre', props)
export const section = (props) => createElement('section', props)
export const strong = (props) => createElement('strong', props)

/* components */
export const a = (props) => {
  if (props.href) {
    if (!props.attrs) { props.attrs = {} }
    props.attrs.href = props.href
  }
  return createElement('a', props)
}

export const pagination = (props) => {
  const { page, perPage, total } = props
  if (!page || !perPage || !total) {
    console.error('jusi: page, perPage and total is required')
    return false
  }
  const numPages = Math.ceil((total / perPage))
  const pages = []
  console.log(numPages, page, perPage, total)
  /* for (let i = 1; i <= numPages; i++) {
    const o = option({ text: i, value: i })
    if (i == page) { o.selected = true }
    pages.push(o)
  }  */
  const sel = select({ name: 'postpager', options: pages, events: { change: props.change } })
  return sel
}

export const paginationLinks = (props) => {
  const { page, perPage, total, events } = props,
    numpages = Math.floor(perPage / total),
    buttons = []
  if (page > 1) {
    buttons.push(a({ text: '<<', class: 'pagination-first', attrs: { 'data-page': 1 }, events: { click: events.first } }))
    buttons.push(a({ text: '<', class: 'pagination-previous', attrs: { 'data-page': page - 1 }, events: { click: events.prev } }))
  }
  for (let i = 1; i <= 10; i++) {
    const bNum = page > 4 ? (page - 4 + i) : i,
      lo = { text: bNum, class: 'pagination-page', attrs: { 'data-page': bNum } }
    if (page !== i) { lo.events = { click: events.page } }
    buttons.push(a(lo))
  }
  buttons.push(a({ text: '>', class: 'pagination-next', attrs: { 'data-page': page + 1 }, events: { click: events.next } }))
  buttons.push(a({ text: '>>', class: 'pagination-last', attrs: { 'data-page': numpages }, events: { click: events.last } }))
  return div({ class: 'pagination' })
}

export const fieldset = (props) => {
  if (!props.contains) { props.contains = [] }
  if (props.title) { props.contains.push(legend({ text: props.title })) }
  return createElement('fieldset', props)
}


export const radio = (props) => {
  props.type = 'radio'
  return div({
    classList: ['form-field', 'form-radio'],
    contains: [
      createElement('input', props),
      label({
        class: 'radio-label',
        text: props.label,
      })
    ]
  })
}

export const radios = (props) => {
  const rs = []
  Object.keys(props.options).map(optionKey => {
    rs.push(radio({ label: props.options[optionKey], name: props.name, value: optionKey }))
  })
  return fieldset({
    title: props.title,
    contains: rs
  })
}

export const checkbox = (props) => {
  props.type = 'checkbox'
  return div({
    classList: ['form-field', 'form-checkbox'],
    contains: [
      createElement('input', props),
      label({
        class: 'checkbox-label',
        text: props.label,
      })
    ]
  })
}

export const checkboxes = (props) => {
  const rs = []
  Object.keys(props.options).map(optionKey => {
    rs.push(checkbox({ label: props.options[optionKey], name: props.name, value: optionKey }))
  })
  return fieldset({
    title: props.title,
    contains: rs
  })
}

const createFormElement = (tag, props) => {
  const fieldItems = []
  if (tag === 'input' && !props.type) { props.type = 'text' }
  if (!props.name) {
    console.error('jusi: name attribute for form fields are required')
  }

  if (props.label) { fieldItems.push(label({ text: props.label })) }
  fieldItems.push(createElement(tag, props))

  return div({
    classList: ['form-field', `form-${tag}`],
    contains: fieldItems
  })
}


export const input = (props) => createFormElement('input', props)
export const select = (props) => {
  let opts = []
  if (props.options) {
    opts = jusi.el.replicateSelectOptions(props.options)
  }
  if (props.multiple) {
    if (!props.name.includes('[')) {
      props.name = `${props.name}[]`
    }
  }
  return createFormElement('select', { ...props, ...{ contains: opts } })
}
export const textarea = (props) => createFormElement('textarea', props)

export const icon = (props) => {
  const fill = props.attrs?.fill || 'black'
  const name = props.name || 'android',
    i = createElement('i', { classList: [`bi-${name}`, 'icon'] })
  return i
}

export const card = (slots) => {
  const cardHeader = div({ classList: ['card-header'], contains: slots.header })
  const cardBody = div({ classList: ['card-body'], contains: slots.body })
  const cardFooter = div({ classList: ['card-footer'], contains: slots.footer })
  return div({ classList: ['card'], contains: [cardHeader, cardBody, cardFooter] })
}

export const grid = (props) => {
  return div({
    classList: ['grid'],
    contains: props.contains,
    children: props.children
  })
}

export const row = (props) => {
  return div({
    ...{ classList: ['row'] },
    ...props
  })
}

export const col = (props) => {
  return div({
    ...{ classList: ['col'] },
    ...props
  })
}

export const container = (props) => {
  const cls = props.classList || []
  props.classList = [...cls, ...['container']]
  const el = div(props)
  return el
}