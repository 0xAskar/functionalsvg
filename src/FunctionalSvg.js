import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { GetIcon } from '../config/icons/iconConfig'; // Adjust the path as necessary
import { Tooltip } from '@nextui-org/react';
import { isMobile } from 'react-device-detect';

/**
 * Returns a rendered SVG Icon with all the features of changing on animation, click, etc... ADD NEW SVGS TO config/icons/iconConfig.js!!!
 * @param {String} svgName | The name of the icon you want to render from iconConfig.js 
 * @param {Boolean} clicked | Whether or not the icon is clicked
 * @param {Function} onClick | The function to run when the icon is clicked. Add the value that it should be clicked to in the prop. such as onClick={()=>setClicked("pie")}
 * @param {Number} width | The width of the icon
 * @param {Number} height | The height of the icon
 * @param {String} defaultFill | The default color of the icon, if you do not add fill, it will automatically be a preset gray
 * @param {String} hoverFill | The color of the icon when it is hovered over, if you do not add fill, it will automatically be a preset mint
 * @param {String} tooltipText | The content of the tooltip that appears when you hover over the icon
 * @param {String} clickedText | The text that appears when the icon is clicked
 * @param {String} urlLink | The url that the icon should link to when clicked
 * @returns Rendered Icon
 */
export default function FunctionalSVG({ SvgIcon, clicked, onClick, urlLink = null, tooltipText = null, tooltipTextColor="white", tooltipBgColor="black", size=15, width = 15, height = 15, defaultFill = null, hoverFill = null, clickedText = null }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const determineFillOrStroke = (child, fill) => {
    if (!child || !child.props) return {};
    if (child.props.fill && child.props.fill !== "none") {
      return { fill };
    }
    if (child.props.stroke && child.props.stroke !== "none") {
      return { stroke: fill };
    }
    return {};
  };

  const Icon = SvgIcon && SvgIcon.props ? ({ width, height, fill }) => (
    React.cloneElement(SvgIcon, {
      width,
      height,
      children: React.Children.map(SvgIcon.props.children, child => 
        React.cloneElement(child, determineFillOrStroke(child, fill))
      )
    })
  ) : null;  
  const hoverAnimation = (enter) => {
    if (enter) return { scale: 1.02, transition: { duration: 0.3, delay: 0.2 } };
    else return { scale: 1, transition: { duration: 0.3, delay: 0.2 } };
  };

  const clickAnimation = {
    scale: [1, 0.90, 1], // Scales down slightly and then bounces back to original scale
    transition: { duration: 0.3 }
  };

  const handleMouse = (toggle) => {
    setIsHovered(toggle);
  };

  const handleClick = async () => {
    let clickedResult = false;
    if (isMobile && tooltipText) setIsTooltipOpen(true);
    if (onClick != null) {
      clickedResult = await onClick();
    }
    if (clickedText && clickedResult) setShowText(true);
  };

  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => setShowText(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showText]);

  useEffect(() => {
    if (isTooltipOpen) {
      const timer = setTimeout(() => setIsTooltipOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isTooltipOpen]);
  return (
    <Tooltip className={`rounded-lg px-2 py-1`} content={tooltipText} 
    style={{ backgroundColor: tooltipBgColor, color: tooltipTextColor, borderRadius: "8px" }}
    {...(isMobile && tooltipText ? { isOpen: isTooltipOpen } : {})} isDisabled={tooltipText == null}>
      <div className="" data-html2canvas-ignore="true">
        <div onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)} onClick={handleClick} className={`w-[${width}px] h-[${height}px]`}>
          <div style={{ position: 'relative' }}>
            {showText && <div className={`absolute -top-3  w-100 text-[10px] bg-red-500 text-white`}>{clickedText}</div>}
            <a href={urlLink || undefined} target={urlLink ? "_blank" : undefined} rel={urlLink ? "noopener noreferrer" : undefined} onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)}>
              <motion.div animate={clicked ? clickAnimation : (isHovered ? hoverAnimation(true) : hoverAnimation(false))}>
                {Icon && <Icon width={size} height={size} {...(defaultFill || hoverFill ? determineFillOrStroke({ props: { fill: isHovered && hoverFill != null ? hoverFill : defaultFill, stroke: isHovered && hoverFill != null ? hoverFill : defaultFill } }, isHovered && hoverFill != null ? hoverFill : defaultFill) : {})}/>}
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
