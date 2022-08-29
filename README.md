# Unofficial TikTok API <img src='https://img.shields.io/npm/v/tikapi'> <img src='https://img.shields.io/pypi/v/tikapi'>

A fully managed hassle-free TikTok API solution with OAuth capabilities. 

Get started by getting an API Key at https://www.tikapi.io

*Note: Spam/Abuse and other use cases that are against community guidelines are forbidden.*

SDK & Documentation made with [Rests](https://github.com/el1s7/rests)

## Installation

Node.js

```bash
npm i tikapi@latest
```

Python 3

```bash
pip3 install tikapi
```

## Usage

### Javascript
ES6 Import Syntax is recommended
```javascript
import TikAPI from 'tikapi';

const api = TikAPI("myAPIKey");
```

#### Common JS
Import it like this in Node with CommonJS to get the Intellisense Support & Types
```javascript
const TikAPI = require('tikapi').default;

const api = TikAPI("myAPIKey");
```

### Python
```python
from tikapi import TikAPI

api = TikAPI("myAPIKey")
```

## Documentation

Check out the documentation for full code samples on all endpoints

https://www.tikapi.io/documentation/