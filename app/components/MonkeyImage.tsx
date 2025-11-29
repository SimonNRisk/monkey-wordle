import Image from 'next/image'

interface MonkeyImageProps {
  imageUrl: string
  alt: string
  blurClass: string
}

export function MonkeyImage({ imageUrl, alt, blurClass }: MonkeyImageProps) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-yellow-400 bg-white/10 backdrop-blur-sm p-2">
      <Image
        src={imageUrl}
        alt={alt}
        width={300}
        height={300}
        unoptimized
        className={`${blurClass} transition-all duration-300 rounded-xl`}
      />
    </div>
  )
}
