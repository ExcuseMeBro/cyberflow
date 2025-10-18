'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@nextui-org/react'
import { Shield, Users, Coins, ChevronRight } from 'lucide-react'

const OnboardingPage = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  const router = useRouter()

  const screens = [
    {
      id: 1,
      title: "Parent Control",
      subtitle: "Protect your children",
      description: "Manage game time, control content, and create a safe environment for your kids",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      features: [
        "Set time limits",
        "Age-appropriate content filters",
        "Activity reports",
        "Purchase controls"
      ]
    },
    {
      id: 2,
      title: "Cyber Mahalla",
      subtitle: "Connect with the community",
      description: "Join the gaming community, find friends, and participate in tournaments",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Meet local gamers",
        "Team tournaments",
        "Chat and voice communication",
        "Rankings and achievements"
      ]
    },
    {
      id: 3,
      title: "CBDS Token",
      subtitle: "Central Bank Digital System",
      description: "Secure payment system for gaming and earn rewards",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Secure payments",
        "Fast transfers",
        "Cashback and bonuses",
        "Financial reports"
      ]
    }
  ]

  const currentScreenData = screens[currentScreen]
  const Icon = currentScreenData.icon

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    // Mark onboarding as completed in localStorage
    localStorage.setItem('onboardingCompleted', 'true')
    router.push('/auth/login')
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="light"
          className="text-white/80 hover:text-white"
          onPress={handleSkip}
        >
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative h-screen flex flex-col items-center justify-between py-12 px-6">

        {/* Animated Screens */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <AnimatePresence mode="wait" custom={currentScreen}>
            <motion.div
              key={currentScreen}
              custom={currentScreen}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              {/* Icon with animated background */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br ${currentScreenData.color} flex items-center justify-center shadow-2xl`}
              >
                <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white text-center mb-3"
              >
                {currentScreenData.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/80 text-center mb-6"
              >
                {currentScreenData.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base text-white/70 text-center mb-8 leading-relaxed"
              >
                {currentScreenData.description}
              </motion.p>

              {/* Features List */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                {currentScreenData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentScreenData.color}`} />
                    <span className="text-white/90 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section - Dots and Button */}
        <div className="w-full max-w-md space-y-6">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {screens.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentScreen(index)}
                className="relative"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentScreen
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/30'
                  }`}
                  animate={{
                    scale: index === currentScreen ? 1.2 : 1
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Next/Finish Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              size="lg"
              className={`w-full bg-gradient-to-r ${currentScreenData.color} text-white font-semibold text-lg shadow-xl`}
              endContent={<ChevronRight className="w-5 h-5" />}
              onPress={handleNext}
            >
              {currentScreen === screens.length - 1 ? "Get Started" : "Next"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10"
      />
    </div>
  )
}

export default OnboardingPage
