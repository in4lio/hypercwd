# HyperCwd

Opens new tabs with the same directory as the current tab in [Hyper](https://hyper.is/) for OS X, Linux and Windows.

![New Tabs](https://raw.githubusercontent.com/hharnisc/hypercwd/master/newTabs.gif)

[![Mentioned in Awesome Hyper](https://awesome.re/mentioned-badge.svg)](https://github.com/bnb/awesome-hyper)

## Installation

Open ~/.hyper.js and add `hypercwd` to the list of plugins.

## Configuration

`hypercwd` can be configured in `~/.hyper.js` configuration file within the `config` object:


Example configuration:

```js
module.exports = {
  config: {
    // default font size for all tabs
    fontSize: 14,

    // ... other config options

    // add the hypercwd configuration object like this
    hypercwd: {
      initialWorkingDirectory: '~/Documents'
    }
  },
  plugins: [
    'hypercwd'
  ]
}
```

### Options

**initialWorkingDirectory** - the path to open the _first_ terminal session

Note: all subsequent sessions are opened with the same directory as the session in focus


### NNN Support

- clone "hypercmd" to "~/.hyper_plugins/local"

- set in ".hyper.js"
```
    env: {NNN_DIR:"$HOME/.config/nnn/directory"},
    localPlugins: ["hypercwd"],
```

- add to ".zshc"
```
    n ()
    {
        if [ -n "$NNN_DIR" ]; then
          export NNN_FIFO="$(mktemp -t nnn -u)"
          mkfifo "$NNN_FIFO"
          ~/.hyper_plugins/local/read_fifo.sh &
        fi
        nnn -dxHE "$@"

        if [ -n "$NNN_DIR" ]; then
          rm -f "$NNN_FIFO"
          unset NNN_FIFO
        fi
    }
```