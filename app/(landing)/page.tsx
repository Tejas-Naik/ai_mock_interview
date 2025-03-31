import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Ace Your Next Interview with <span className="text-primary-100">AI-Powered</span> Practice
              </h1>
              <p className="text-xl text-light-300">
                PrepWise uses advanced AI to simulate real interview scenarios,
                provide instant feedback, and help you improve your skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild className="btn-primary py-6 px-8 text-lg">
                  <Link href="/sign-up">Get Started for Free</Link>
                </Button>
                <Button asChild className="btn-secondary py-6 px-8 text-lg">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/robot.png"
                alt="AI Interview Assistant"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-800 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PrepWise Helps You Succeed</h2>
            <p className="text-xl text-light-300 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to prepare for your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light-900 p-8 rounded-xl shadow-md">
              <div className="bg-primary-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Image src="/star.svg" alt="Practice" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Realistic Practice</h3>
              <p className="text-light-300">
                Practice with role-specific questions that mimic real interview scenarios
              </p>
            </div>

            <div className="bg-light-900 p-8 rounded-xl shadow-md">
              <div className="bg-primary-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Image src="/calendar.svg" alt="Feedback" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Feedback</h3>
              <p className="text-light-300">
                Get detailed analysis and scores across key interview performance metrics
              </p>
            </div>

            <div className="bg-light-900 p-8 rounded-xl shadow-md">
              <div className="bg-primary-900 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Image src="/star.svg" alt="Growth" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Your Progress</h3>
              <p className="text-light-300">
                Monitor your improvement over time and focus on specific areas of weakness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Candidates Love PrepWise</h2>
            <p className="text-xl text-light-300 max-w-3xl mx-auto">
              Join thousands of job seekers who have improved their interview skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-light-800 p-8 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-light-600 rounded-full"></div>
                  <div>
                    <h4 className="font-bold">User {i}</h4>
                    <p className="text-sm text-light-400">Software Engineer</p>
                  </div>
                </div>
                <p className="text-light-300">
                  "PrepWise helped me prepare for my technical interviews with confidence. The AI feedback was spot-on and highlighted areas I needed to improve."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join PrepWise today and get access to personalized AI interview practice and feedback.
          </p>
          <Button asChild className="btn-primary py-6 px-8 text-lg">
            <Link href="/sign-up">Start Your Free Practice</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
