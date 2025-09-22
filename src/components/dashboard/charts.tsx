"use client";

// Simple Line Chart Component

// Simple Line Chart Component
export function LineChart() {
  const data = [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 3000 },
    { month: "Mar", value: 5000 },
    { month: "Apr", value: 4500 },
    { month: "May", value: 6000 },
    { month: "Jun", value: 5500 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Revenue Trend</h3>
          <p className="text-sm text-gray-600 mt-1">Monthly revenue performance</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            6M
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            1Y
          </button>
        </div>
      </div>
      
      <div className="h-80 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + i * 32}
              x2="360"
              y2={40 + i * 32}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            points={data.map((d, i) => 
              `${40 + (i * 320) / (data.length - 1)},${180 - ((d.value - minValue) / range) * 140}`
            ).join(" ")}
          />
          
          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={40 + (i * 320) / (data.length - 1)}
              cy={180 - ((d.value - minValue) / range) * 140}
              r="5"
              fill="#10b981"
              className="hover:r-7 transition-all cursor-pointer"
            />
          ))}
          
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={40 + (i * 320) / (data.length - 1)}
              y="195"
              textAnchor="middle"
              className="text-sm fill-gray-500 font-medium"
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// Simple Bar Chart Component
export function BarChart() {
  const data = [
    { category: "Grapes", value: 65, color: "bg-emerald-500" },
    { category: "Pomegranates", value: 45, color: "bg-blue-500" },
    { category: "Onions", value: 35, color: "bg-amber-500" },
    { category: "Rice", value: 25, color: "bg-red-500" },
    { category: "Turmeric", value: 20, color: "bg-purple-500" },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Top Products</h3>
          <p className="text-sm text-gray-600 mt-1">Best performing products</p>
        </div>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-24 text-sm font-medium text-gray-700 truncate">
              {item.category}
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${item.color} transition-all duration-700 ease-out`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm font-semibold text-gray-900 text-right">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pie Chart Component
export function PieChart() {
  const data = [
    { label: "Domestic", value: 45, color: "bg-emerald-500" },
    { label: "Export", value: 35, color: "bg-blue-500" },
    { label: "Wholesale", value: 20, color: "bg-amber-500" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Sales Distribution</h3>
        <p className="text-sm text-gray-600 mt-1">Revenue by sales channel</p>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(" ");
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  className={item.color}
                  fill="currentColor"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${item.color}`} />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recent Activity Component
export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "order",
      message: "New order #1234 received",
      time: "2 minutes ago",
      icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: 2,
      type: "customer",
      message: "Customer John Doe registered",
      time: "15 minutes ago",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment of $2,500 received",
      time: "1 hour ago",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: 4,
      type: "alert",
      message: "Low stock alert for Grapes",
      time: "2 hours ago",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z",
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600 mt-1">Latest business activities</p>
        </div>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-3 rounded-lg ${activity.color}`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
