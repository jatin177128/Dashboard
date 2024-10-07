import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Briefcase, UserPlus, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', value: 400, applications: 240 },
  { name: 'Feb', value: 300, applications: 139 },
  { name: 'Mar', value: 600, applications: 980 },
  { name: 'Apr', value: 800, applications: 390 },
  { name: 'May', value: 500, applications: 480 },
  { name: 'Jun', value: 700, applications: 380 },
];

const MotionCard = motion(Card);

const StatCard = ({ title, value, icon: Icon, description,  color, delay }) => (
  <MotionCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.02 }}
    className="overflow-hidden"
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`rounded-full p-2 ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
      <div className="mt-4 h-2 w-full rounded-full bg-secondary">   
        <motion.div
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      </div>
    </CardContent>
  </MotionCard>
);

const GradientCard = ({ title, chart, data, gradientFrom, gradientTo }) => (
  <Card className="col-span-4">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <span>{title}</span>
        <TrendingUp className="h-4 w-4 text-green-500" />
      </CardTitle>
    </CardHeader>
    <CardContent className="pl-2">
      <ResponsiveContainer width="100%" height={350}>
        {chart === 'line' ? (
          <LineChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={gradientTo} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={gradientFrom}
              strokeWidth={2}
              dot={{ fill: gradientFrom }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={gradientTo} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="applications" 
              stroke={gradientFrom}
              fillOpacity={1}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const Achievement = ({ icon: Icon, title, value }) => (
  <motion.div 
    className="flex items-center gap-4 rounded-lg border p-4"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="rounded-full bg-primary/20 p-2">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Welcome back, Jatin!</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Available Positions"
            value="24"
            icon={Briefcase}
            description="8 urgently needed"
            color="bg-blue-500"
            delay={0}
          />
          <StatCard
            title="Job Applications"
            value="621"
            icon={Activity}
            description="+11% from last month"
            color="bg-green-500"
            delay={0.1}
          />
          <StatCard
            title="New Employees"
            value="24"
            icon={UserPlus}
            description="7 this month"
            color="bg-purple-500"
            delay={0.2}
          />
          <StatCard
            title="Total Employees"
            value="216"
            icon={Users}
            description="+18% from last month"
            color="bg-orange-500"
            delay={0.3}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <GradientCard 
          title="Hiring Overview" 
          chart="line"
          data={data}
          gradientFrom="#3b82f6"
          gradientTo="#93c5fd"
        />
        <GradientCard 
          title="Applications" 
          chart="area"
          data={data}
          gradientFrom="#8b5cf6"
          gradientTo="#c4b5fd"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Achievement icon={Award} title="Top Performer" value="Jatin Arya" />
        <Achievement icon={TrendingUp} title="Interview Success Rate" value="78%" />
        <Achievement icon={Users} title="Team Growth" value="+12%" />
      </div>
    </div>
  );
};

export default Dashboard;