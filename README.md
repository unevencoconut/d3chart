# Documentation
Summary: This is meant to be a sort of 'set it and forget it' kind of script. It takes the complexity of D3 and simplifies it. Which is why I should note, D3 is a complex and powerful tool. My simple modules are not meant to cover the full breadth of what D3 is capable of. If you do not see a feature of D3 that you'd like to use, then unfortunately you will likely just have to use D3 or modify my script for your own purposes. Remember, this is just meant to be simple.

At the time of this writing, I currently only have a Bubble Chart built out, I hope to periodically add more.

## How To
---
### Quick Description
- Add `main.js` script however you'd like.
- Create instance `const = new D3BubbleChart(data{options})`
- Instance Handles the rest

---
### Detailed Descriptions
**STEP ONE**: Add `main.js` script
```html
<script src="main.js"></script>
```
<span style="color:#6c757d!important">
I recommend applying it before the closing body tag. But hey, you do you boo boo.
</span>

Some possible questions:
+ Can I use Async or Defer Attributes: Sure
+ Can I break out the D3Chart and D3BubbleChart: Yep, but D3Bubble Chart extends D3Chart, so be sure to break out accordingly.

**STEP TWO**: Create Instance

Once the script is added, you'll need to createa new instance, once the Instace is called it handles the rest. Here is a general example:

```javascript
const myBubbleChart = new BubbleChart(data,{options})

// Data: This will be a JSON Object you provide
// Options: Settings you will provide
```

### The `data` argument (required)
This is your Bubble Chart Data that you'd like to display.
It requires a JSON string that is an Array of Objects.
Example:

```json
[
    {
        "text":"some words",
        "value":100
    },
    {
        "text":"Other words",
        "value":80
    },
    {
        "text":"more words",
        "value":200
    }
]
```

Each Object, represents a single bubble in your bubblechart.

The `text` property of the Object, is the text that you will see inside the Bubble Chart.

The `value` property of the Object, is the Radius of the Bubble.

Here is a visual example of how text and value show up:
![Bubble Chart Example](https://unevencoconut.github.com/images/example.png)