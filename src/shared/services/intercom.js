const intercomAppId = process.env.INTERCOM_APPID || 'tc6dfu6k'

const intercomDomAttachment = () => {
  const w = window
  const ic = w.Intercom
  if (typeof ic === 'function') {
    ic('reattach_activator')
    ic('update', w.intercomSettings)
  } else {
    const d = document
    const i = (...args) => {
      i.c(args)
    }
    i.q = []
    i.c = args => {
      i.q.push(args)
    }
    w.Intercom = i

    const loadAtachment = () => {
      const s = d.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = `https://widget.intercom.io/widget/${intercomAppId}`
      const x = d.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
    }

    if (w.attachEvent) {
      w.attachEvent('onload', loadAtachment)
    } else {
      w.addEventListener('load', loadAtachment, false)
    }
  }
}

export const init = history => {
  intercomDomAttachment()
  history.listen(() => window.Intercom('update'))
}

export const onSignin = user => {
  const {id, email} = user
  window.Intercom('boot', {
    app_id: intercomAppId,
    user_id: id,
    email,
    // hide_default_launcher: true,
    // custom_launcher_selector: '.intercom-launcher',
  })
}

export const onSignout = () => {
  window.Intercom('shutdown')
}
