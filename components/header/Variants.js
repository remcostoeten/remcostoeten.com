import React, { useEffect, useState } from 'react';

export const useVariants = () => {
useEffect(() => {
document.body.classList.add('variant');
}, []);
const [variant, setVariant] = useState('theme--variant');

const handleVariantToggle = () => {
switch (variant) {
case 'theme--variant':
setVariant('theme--variant');
document.body.classList.remove(
'variant-two',
'variant-three',
'variant-four',
);
break;
case 'theme--variant-two':
setVariant('theme--variant-two');
document.body.classList.remove(
'variant',
'variant-three',
'variant-four',
);
break;
case 'theme--variant-three':
setVariant('theme--variant-three');
document.body.classList.remove(
'variant',
'variant-two',
'variant-four',
);
break;
case 'theme--variant-four':
setVariant('theme--variant-four');
document.body.classList.remove(
'variant',
'variant-two',
'variant-three',
);
break;
default:
setVariant('theme--variant');
document.body.classList.remove(
'variant-two',
'variant-three',
'variant-four',
);
break;
}
};

const actions = [
{
icon: false,
name: 'Palette one',
onClick: () => {
setVariant('theme--variant');
document.body.classList.remove(
'variant-two',
'variant-three',
'variant-four',
);
document.body.classList.add('variant');
},
},
{
icon: false,
name: 'Palette two',
onClick: () => {
setVariant('theme--variant-two');
document.body.classList.remove(
'variant',
'variant-three',
'variant-four',
);
document.body.classList.add('variant-two');
},
},
{
icon: false,
name: 'Palette three',
onClick: () => {
setVariant('theme--variant-three');
document.body.classList.remove(
'variant',
'variant-two',
'variant-four',
);
document.body.classList.add('variant-three');
},
},
{
icon: false,
name: 'Palette four',
onClick: () => {
setVariant('theme--variant-four');
document.body.classList.remove(
'variant',
'variant-two',
'variant-three',
);
document.body.classList.add('variant-four');
},
},
];

return [variant, setVariant, actions];
};