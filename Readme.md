# tg-spoiler-editor-js

Inline tool for adding spoilers to text fragments for [Editor.js](https://github.com/codex-team/editor.js), 
supporting export to telegram.

# Installation

## Install via NPM
Get the package

```
npm install --save @iizotikov/tg-spoiler-editor-js

// or Yarn

yarn add @iizotikov/tg-spoiler-editor-js
```

## Include module in your application 

`import Spoiler from '@iizotikov/tg-spoiler-editor-js';`

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```
import EditorJs from '@editorjs/editorjs';
import Spoiler from '@iizotikov/tg-spoiler-editor-js';

const editor = new EditorJS({
  // ...
  tools: {
    // ...
    spoiler: Spoiler
  },
});
```

Right now it highlights spoilered text with black background. 

If you want to add custom background, just override class `.tg-spoiler` anywhere in your code with `!important` keyword. 

I recommend to add spoiler the same color as your text, to create an illusion of hiding.

For example:
```
//index.css

.tg-spoiler {
  background-color: white !important;
}
```

## Output data

Final output looks like this:

```
{
    "type" : "paragraph",
    "data" : {
        "text" : "<span class=\"tg-spoiler\">Hidden text</span>"
    }
}
```

Also supports spoiler of `bold`, `italic`, `underline` and `strikethrough` texts.

At Telegram it's looks like default Telegram spoiler.

