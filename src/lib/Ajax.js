const Ajax = {
  get: (u, d) => {
    return Ajax.fetch(u, {
      ...d,
      method: 'GET'
    })
  },
  post: (u, d) => {
    return Ajax.fetch(u, {
      ...d,
      method: 'POST'
    })
  },
  patch: (u, d) => {
    return Ajax.fetch(u, {
      ...d,
      method: 'PATCH'
    })
  },
  delete: (u, d) => {
    return Ajax.fetch(u, {
      ...d,
      method: 'DELETE'
    })
  },
  fetch: async (url, data) => {
    const opts = { ...data }
    if (opts.data) {
      opts.headers = {
        'Content-Type': 'application/json'
      }
      opts.body = JSON.stringify(opts.data)
      delete opts.data
    }
    console.log(opts)
    const response = await window.fetch(url, opts)
    if (!response.ok) throw new Error(response.body)
    return response.json()
  }
}

export default Ajax
