import React from "react";

interface CardColorProp {
  color?: string;
}

const CardColor: React.FC<CardColorProp> = ({ color }) => {

  const handlerGetColor = () => {
    const input = document.createElement('input');
    input.setAttribute('value', color || '');
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  const style = {
    backgroundColor: color,
  };

  return (
    <div 
      style={style} 
      className="rounded-md sm:h-16 sm:w-16 min-h-11 min-w-11 w-auto h-auto hover:cursor-pointer mx-2" 
      title={color} 
      onClick={handlerGetColor}
    />
  );
};

export default CardColor;
