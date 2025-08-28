import Image from "next/image"
import Link from "next/link"

export default function AppBanner() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="https://www.webintoapp.com/store/877035"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow duration-300 border border-gray-200 max-w-xs"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e-learning-9xz1FerTojzQON4b44658Ti6gGHZUD.png"
          alt="E-learning App"
          width={40}
          height={40}
          className="flex-shrink-0"
        />
        <div className="text-sm">
          <p className="font-medium text-gray-800">Baixe também o</p>
          <p className="font-bold text-blue-600">nosso aplicativo</p>
        </div>
      </Link>
    </div>
  )
}
