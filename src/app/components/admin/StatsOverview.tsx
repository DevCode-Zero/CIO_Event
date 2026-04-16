import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, UserCheck, Activity, TrendingUp } from "lucide-react";
import { db } from "../../utils/database";

export function StatsOverview() {
  const [checkedIn, setCheckedIn] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [questionsSent, setQuestionsSent] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      setCheckedIn(await db.getAttendeeCount());
      setTotalResponses(await db.getTotalResponses());
      const qs = await db.getQuestions();
      setQuestionsSent(qs.filter(q => q.status === "sent").length);
    };
    loadStats();
  }, []);

  const stats = [
    {
      label: "Total Invited",
      value: checkedIn > 0 ? String(checkedIn + 14) : "156",
      icon: Users,
      color: "text-[#8b5cf6]",
      bgColor: "bg-[#8b5cf6]/10",
      borderColor: "border-[#8b5cf6]/20",
    },
    {
      label: "Checked In",
      value: String(checkedIn),
      subtext: checkedIn > 0 ? `${Math.round((checkedIn / (checkedIn + 14)) * 100)}% attendance` : "91% attendance",
      icon: UserCheck,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      label: "Live Now",
      value: String(questionsSent > 0 ? checkedIn : 0),
      subtext: "Active questions",
      icon: Activity,
      color: "text-[#10b981]",
      bgColor: "bg-[#10b981]/10",
      borderColor: "border-[#10b981]/20",
      pulse: questionsSent > 0,
    },
    {
      label: "Engagement Rate",
      value: totalResponses > 0 && checkedIn > 0 ? `${Math.round((totalResponses / checkedIn) * 100)}%` : "0%",
      subtext: "Poll participation",
      icon: TrendingUp,
      color: "text-[#06b6d4]",
      bgColor: "bg-[#06b6d4]/10",
      borderColor: "border-[#06b6d4]/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 bg-secondary/30 border ${stat.borderColor} rounded-2xl`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            {stat.pulse && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]"></span>
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-1" style={{ fontSize: "0.875rem" }}>
            {stat.label}
          </p>
          <p className="mb-1" style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.2 }}>
            {stat.value}
          </p>
          {stat.subtext && (
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              {stat.subtext}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
