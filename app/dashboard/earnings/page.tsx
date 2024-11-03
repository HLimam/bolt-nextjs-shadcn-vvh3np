'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Download,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const earnings = [
  {
    id: '1',
    mentee: 'Sarah Chen',
    program: 'React Mastery',
    date: '2024-02-28',
    amount: 199,
    status: 'paid',
  },
  {
    id: '2',
    mentee: 'Michael Brown',
    program: 'JavaScript Fundamentals',
    date: '2024-02-27',
    amount: 149,
    status: 'pending',
  },
];

const stats = [
  {
    title: 'Total Earnings',
    value: '$4,280',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Active Mentees',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Hours Completed',
    value: '86',
    change: '+8',
    trend: 'up',
    icon: Clock,
  },
  {
    title: 'Avg. Session Rate',
    value: '$120',
    change: '+$10',
    trend: 'up',
    icon: TrendingUp,
  },
];

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Earnings</h1>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnings.map((earning) => (
              <div
                key={earning.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{earning.mentee}</p>
                    <p className="text-sm text-muted-foreground">
                      {earning.program}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={earning.status === 'paid' ? 'default' : 'secondary'}
                  >
                    {earning.status}
                  </Badge>
                  <span className="font-bold">${earning.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}