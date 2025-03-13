const console = {
  log: (...msg) => {
    const output = document.createElement('output')
    const pre = document.createElement('pre')
    output.textContent = `Console log output: ${msg.join(', ')}`
    pre.appendChild(output)
    document.body.appendChild(pre)
  }
}
