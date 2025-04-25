import { useLocation } from 'react-router-dom'

interface ClassificationInfo {
  text: string
  bgColor: string
  textColor: string
}

const classificationMap: Record<string, ClassificationInfo> = {
  '/': {
    text: 'UNCLASSIFIED',
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  },
  '/tpfdd': {
    text: 'SECRET',
    bgColor: 'bg-red-600',
    textColor: 'text-white'
  },
  '/processflow': {
    text: 'CONFIDENTIAL',
    bgColor: 'bg-blue-600',
    textColor: 'text-white'
  },
  '/murep': {
    text: 'TOP SECRET',
    bgColor: 'bg-yellow-600',
    textColor: 'text-black'
  }
}

interface ClassificationBannerProps {
  position: 'top' | 'bottom'
}

function ClassificationBanner({ position }: ClassificationBannerProps) {
  const location = useLocation()
  const currentPath = location.pathname
  
  const defaultClassification: ClassificationInfo = {
    text: 'UNCLASSIFIED',
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  }
  
  const classification = classificationMap[currentPath] || defaultClassification
  
  return (
    <div 
      className={`${classification.bgColor} ${classification.textColor} py-1 text-center font-bold fixed w-full ${position === 'top' ? 'top-0' : 'bottom-0'} z-50`}
    >
      {classification.text}
    </div>
  )
}

export default ClassificationBanner