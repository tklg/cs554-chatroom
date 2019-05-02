import React from 'react'
import SimpleMarkdown from 'simple-markdown'
import { Link } from 'react-router-dom'

const sanitizeUrl = function (url) {
  if (url == null) {
    return null
  }
  try {
    var prot = decodeURIComponent(url)
      .replace(/[^A-Za-z0-9/:]/g, '')
      .toLowerCase()
    if (prot.indexOf('javascript:') === 0) {
      return null
    }
  } catch (e) {
    // decodeURIComponent sometimes throws a URIError
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null
  }
  return url
}

const underlineRule = {
  order: SimpleMarkdown.defaultRules.em.order - 0.5,
  match (source) {
    return /^__([\s\S]+?)__(?!_)/.exec(source)
  },
  parse (capture, parse, state) {
    return {
      content: parse(capture[1], state)
    }
  },
  react (node, output, state) {
    return <span className='underline' key={state.key}>{ output(node.content) }</span>
  }
}

const codeblockRule = {
  order: SimpleMarkdown.defaultRules.em.order - 0.5,
  match (source) {
    return /^```([\s\S]+?)```/.exec(source)
  },
  parse (capture, parse, state) {
    return {
      content: parse(capture[1], state)
    }
  },
  react (node, output, state) {
    return <pre key={state.key}><code>{ output(node.content) }</code></pre>
  }
}

const linkRule = {
  order: 6,
  match (source) {
    return /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/.exec(source)
  },
  parse (capture, parse, state) {
    return {
      type: 'link',
      content: [{
        type: 'text',
        content: capture[1]
      }],
      target: capture[1],
      title: capture[1]
    }
  },
  react (node, output, state) {
    return <a href={sanitizeUrl(node.target)} title={node.title} key={state.key} target='_blank'>{ output(node.content, state) }</a>
  }
}

function buildParser (dispatch, members, channels, roles, emojis) {
  const memberRule = {
    order: 4,
    match (source) {
      return /^<@!?(\d+)>/.exec(source)
    },
    parse (capture, parse, state) {
      return {
        content: [capture[1]]
      }
    },
    react (node, output, state) {
      const member = members.find(x => x.id === node.content[0])
      const name = member ? (member.displayName || member.username) : 'invalid user'
      return <span className='mention' key={state.key} onClick={() => {}}>{ `@${name}` }</span>
    }
  }

  const channelRule = {
    order: 3,
    match (source) {
      return /^<#(\d+)>/.exec(source)
    },
    parse (capture, parse, state) {
      return {
        content: [capture[1]]
      }
    },
    react (node, output, state) {
      const channel = channels.find(x => x.id === node.content[0])
      const name = channel ? channel.name : 'invalid channel'
      const id = channel ? channel.id : '#'
      return <Link className='mention' key={state.key} to={id}>{ `#${name}` }</Link>
    }
  }

  const defaultRules = SimpleMarkdown.defaultRules
  for (const rule of ['heading', 'nptable', 'lheading', 'hr', 'blockQuote', 'list', 'def', 'table', 'image', 'reflink', 'refimage']) {
    delete defaultRules[rule]
  }
  const rules = {
    ...defaultRules,
    underline: underlineRule,
    link: linkRule,
    codeblock: codeblockRule,
    member: memberRule,
    channel: channelRule
  }

  const rawParser = SimpleMarkdown.parserFor(rules)
  const parse = source => rawParser(source + '\n\n', { inline: false })
  const output = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))

  return str => output(parse(str))
}

export default buildParser

const parser = buildParser()
export {
  parser
}
