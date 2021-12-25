const fs = require('fs')
const path = require('path')
const fontkit = require('fontkit')
const flagEmoji = require('unicode-emoji-json/data-by-group.json')
const { avaiableCurrency } = require('../src/utils')

const outputFolder = path.resolve(__dirname, `../flags`)
const font = fontkit.openSync('/System/Library/Fonts/Apple Color Emoji.ttc').fonts[0]

const currencyflag = Object.values(avaiableCurrency).map(
  curr => `flag_${curr.flag}`
)

const flagEmojis = flagEmoji.Flags.filter(
  item => currencyflag.indexOf(item.slug) !== -1
)

const saveIcon = ({ emoji, slug }) => {
  const emojiGlyph = font.layout(emoji)
  const glyph = emojiGlyph.glyphs[0].getImageForSize(128)
  fs.writeFileSync(`${outputFolder}/${slug}.png`, glyph.data)
}

flagEmojis.forEach(flag => {
  try {
    saveIcon(flag)
  } catch (e) {
    console.error('Could not generate icon for "%s": %s', flag.name, e.message)
  }
})
