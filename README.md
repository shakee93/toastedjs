<p align="center">
    <a href="https://github.com/shakee93/vue-toasted" target="_blank">
    <img width="250"src="https://shakee93.github.io/toastedjs/src/assets/logo.svg">
    </a>
</p> 

<p align="center">
  <a href="https://www.npmjs.com/toastedjs"><img src="https://img.shields.io/npm/v/toastedjs.svg?style=flat-square"/> 
  <img src="https://img.shields.io/npm/dm/toastedjs.svg?style=flat-square"/></a>
</p>

## Introduction

toasted is responsive, touch compatible, easy to use, attractive and feature rich with icons, actions etc...

### Interactive demo

demo here

### Installation

**Source**|**Info**
-----|-----
npm | `npm install toastedjs --save`
yarn | `yarn add toastedjs`
unpkg (js) | [https://unpkg.com/toastedjs/dist/toasted.min.js](https://unpkg.com/toastedjs/dist/toasted.min.js)
unpkg (css) | [https://unpkg.com/toastedjs/dist/toasted.min.css](https://unpkg.com/toastedjs/dist/toasted.min.css)
jsdelivr | [https://jsdelivr.com/package/npm/toastedjs](https://jsdelivr.com/package/npm/toastedjs)

### Basic Usage 

#### ➡ ES6
```javascript

import Toasted from 'toastedjs'

import 'toastedjs/dist/toastedjs.min.css'  
//import 'toastedjs/src/sass/toast.scss'

let toasted = new Toasted({ /* your options.. */ })
toasted.show('yo, toasted here !!')

```

#### ➡ Direct
```html
<!-- pull the css -->
<link rel="stylesheet" href="https://unpkg.com/toastedjs/dist/toasted.min.css">

<!-- pull the js file -->
<script src="https://unpkg.com/toastedjs/dist/toasted.min.js"></script>

<script>
    var toasted = new Toasted({ /* your options.. */ })
    toasted.show('yo, toasted is directly here !!')
</script>
```

### Guide 

#### ➡ Actions

Actions are used to make the toasts interactive **(save, undo, cancel, close)**, you can have **one or more** options on a single toast.

<p align="center">
    <img width="250"src="https://shakee93.github.io/vue-toasted/assets/images/action-preview.jpg">
</p> 

```javascript
// you can pass multiple actions as an array of actions
action : {
     text : 'Save',
     onClick : (e, toasted) => {
        toasted.delete()
     }
}
```

#### ➡ Icons

[Material Icons](http://google.github.io/material-design-icons/) and [Fontawesome](http://fontawesome.io/cheatsheet/) are supported. you will have to import the icon packs into your project.

```javascript
{
    // pass the icon name as string
    icon : 'check'
    
    // or you can pass an object
    icon : {
        name : 'watch',
        after : true // this will append the icon to the end of content
    }
}
```


