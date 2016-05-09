# WebRTC Promise codemods
These codemods use [jscodeshift](https://github.com/facebook/jscodeshift) to upgrade legacy WebRTC
code using the callback and errorbacks to their modern, promise-based equivalent.

# Usage
In your code tree, use
```
jscodeshift -t createOffer .
```
to apply the createOffer codemod. Then review your changes and commit them.

Alternatively, play around with the codemods in [ast explorer](https://astexplorer.net/).
# Author
Philipp Hancke <fippo@appear.in>

# License
MIT
