import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="w-full py-10">
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Welcome back, Admin
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Here’s a quick overview of your platform performance today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">View Reports</Button>
            <Button>Generate Summary</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <h3 className="text-2xl font-semibold">1,248</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 bg-green-50 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Monthly Growth</p>
                <h3 className="text-2xl font-semibold">+18.4%</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 bg-purple-50 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <h3 className="text-2xl font-semibold">$24,560</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
