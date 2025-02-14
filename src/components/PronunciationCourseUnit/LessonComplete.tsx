'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from 'lucide-react'

export default function LessonComplete({ unitId }: { unitId: string }) {
  const router = useRouter()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  const handleContinue = () => {
    router.push('/')
  }

  const handleViewStats = () => {
    router.push(`/pronunciation/${unitId}/stats`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
      />
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-600">Congratulations!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">You&apos;ve completed the lesson!</p>
          <div className="flex justify-center">
            <span className="text-5xl" role="img" aria-label="celebration emoji">
              🎉
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col mt-2 gap-3 justify-center">
          <Button onClick={handleContinue} size="lg">
            Continue to All Lessons
          </Button>
          <Button onClick={handleViewStats} size="lg" variant="outline">
            <BarChart2 className="w-4 h-4" />
            View Stats
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

