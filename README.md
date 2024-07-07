# Functional Svg

Functional Svg is a React component library that allows users to import SVG icons and customize their appearance and behavior, including animations, tooltips, and click events.

## Installation

```bash
npm install functional-svg
```

## Usage

```jsx
import React, { useState } from 'react';
import FunctionalSVG from 'functional-svg';
import { Pacman } from '../icons';
const MyComponent = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <FunctionalSVG
        SvgIcon={Pacman}
        clicked={clicked}
        onClick={() => setClicked(!clicked)}
        width={24}
        height={24}
        defaultFill="gray"
        hoverFill="blue"
        tooltipText="This is an example icon"
        clickedText="Icon clicked!"
        urlLink="https://ask.ar"
      />
    </div>
  );
};

export default MyComponent;
```

## Props
```jsx
SvgIcon (String): Just the svg of the icon you want to customize.
clicked (Boolean): Whether or not the icon is clicked.
onClick (Function): The function to run when the icon is clicked. Example: onClick={() => setClicked("iconName")}.
width (Number): The width of the icon. Default is 15.
height (Number): The height of the icon. Default is 15.
defaultFill (String): The default color of the icon. If not provided, it will be a preset gray. Default is rgba(75,75,75, 0.5).
hoverFill (String): The color of the icon when hovered over. If not provided, it will be a preset mint. Default is #00ffd5.
tooltipText (String): The content of the tooltip that appears when hovering over the icon.
tooltipTextColor (String): The color for the tooltip text in hex, rgba, or plain.
tooltipBgColor (String): The color of the background of the tooltip in hex, rgba, or plain.
clickedText (String): The text that appears when the icon is clicked.
urlLink (String): The URL that the icon should link to when clicked. Default is null.
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.


This README provides a comprehensive guide on how to use your `Functional Svg` library, including installation, usage, props description, an example, and contribution guidelines.

Project (https://github.com/0xAskar/functionalsvg)
Askar (https://github.com/0xAskar)






