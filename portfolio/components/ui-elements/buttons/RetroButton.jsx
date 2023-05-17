import Link from 'next/link';

function SlideButton({
  icon,
  label,
  ctaClass,
  link = '#',
  bgColor = 'false',
  textColor = 'text-black',
  borderColor = 'border-gray-300',
  border = false,
}) {
  const buttonClassName = `cta ${ctaClass} ${bgColor} ${border ? borderColor : ''} ${textColor} hover:${bgColor} hover:${textColor}`;

  return (
    <div className="slide-button">
      <Link href={link}>
        <button className={buttonClassName}>
          {label}
        </button>
      </Link>
    </div>
  );
}

export default SlideButton;
