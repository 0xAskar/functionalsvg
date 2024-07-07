import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GetIcon } from '@/config/icons/iconConfig';
import { Tooltip } from '@nextui-org/react';
import {isMobile} from 'react-device-detect';
import Link from 'next/link';
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
function HoverableSVG({ svgName, clicked, onClick, urlLink=null, tooltipText=null,
  width=15, height=15, defaultFill="rgba(75,75,75, 0.5)", hoverFill="#00ffd5", clickedText=null, }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const hoverAnimation = (enter) => {
    if (enter) return { scale: 1.02, transition: { duration: 0.3, delay: 0.2 } }
    else return { scale: 1, transition: { duration: 0.3, delay: 0.2 } }
  };
  const clickAnimation = {
    scale: [1, 0.90, 1], // Scales down slightly and then bounces back to original scale
    transition: { duration: 0.3 }
  };
  const handleMouse = (toggle) => { setIsHovered(toggle); };
  const handleClick = async () => {
    let clickedResult = false;
    if (isMobile && tooltipText) setIsTooltipOpen(true)
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

  useEffect(()=>{
    if (isTooltipOpen) {
      const timer = setTimeout(() => setIsTooltipOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isTooltipOpen])

  console.log()

  return (
    <Tooltip className="rounded-lg" content={tooltipText} {...(isMobile && tooltipText ? { isOpen: isTooltipOpen } : {})} color="secondary" isDisabled={tooltipText == null}>
      <div className = "w-100" data-html2canvas-ignore="true">
        <div onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)} onClick={handleClick} className = {`w-[${width}px] h-[${height}px]`}>
          <div style={{position: 'relative'}}> {/* Add this div */}
            {showText && <div className={`absolute -top-3  w-100 text-[10px] `}>{clickedText}</div>}
            {urlLink != null ? (
              <Link href={urlLink} target="_blank" legacyBehavior>
                <a onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)}>
                  <motion.div animate={clicked ? clickAnimation : (isHovered ? hoverAnimation(true) : hoverAnimation(false))}>
                    <GetIcon icon = {svgName} width={width} height={height} fill={isHovered || clicked ? hoverFill : defaultFill}/>
                  </motion.div> 
                </a>
              </Link>
            ) : (
              <a onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)}>
                <motion.div animate={clicked ? clickAnimation : (isHovered ? hoverAnimation(true) : hoverAnimation(false))}>
                  <GetIcon icon = {svgName} width={width} height={height} fill={isHovered || clicked ? hoverFill : defaultFill}/>
                </motion.div> 
              </a>
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}


export default HoverableSVG;