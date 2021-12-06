import fs from 'fs'
import { URL } from 'url'
import fontkit from 'fontkit'
import flagEmoji from 'unicode-emoji-json/data-by-group.json'
import { avaiableCurrency } from '../utils.js'

const outputFolder = new URL('../flags/', import.meta.url).pathname
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
  fs.writeFileSync(`${outputFolder}${slug}.png`, glyph.data)
}

flagEmojis.forEach(flag => {
  try {
    saveIcon(flag)
  } catch (e) {
    console.error('Could not generate icon for "%s": %s', flag.name, e.message)
  }
})
