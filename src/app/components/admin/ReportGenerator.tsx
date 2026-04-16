import { motion } from "motion/react";
import { FileText, Download, Calendar, Users, TrendingUp, BarChart3 } from "lucide-react";

export function ReportGenerator() {
  const reportData = {
    eventName: "CIO Leadership Summit 2026",
    date: "April 13, 2026",
    totalInvited: 156,
    totalCheckedIn: 142,
    attendanceRate: "91%",
    peakAttendance: 138,
    avgEngagementRate: "87%",
    totalQuestions: 5,
    totalResponses: 624,
  };

  const topInsights = [
    {
      question: "What is your organization's top technology priority for 2026?",
      topAnswer: "AI & Machine Learning Integration",
      percentage: "42%",
    },
    {
      question: "How would you rate today's keynote session?",
      topAnswer: "Excellent",
      percentage: "68%",
    },
    {
      question: "Which breakout session interested you most?",
      topAnswer: "Cloud Infrastructure Strategies",
      percentage: "35%",
    },
  ];

  const handleDownloadReport = () => {
    alert("Report download started (demo)");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Event Report
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: "0.9375rem" }}>
            Comprehensive summary and insights
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all shadow-lg shadow-primary/20"
          style={{ fontSize: "0.9375rem", fontWeight: 500 }}
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl mb-6"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="mb-1" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {reportData.eventName}
            </h3>
            <p className="text-muted-foreground flex items-center gap-2" style={{ fontSize: "0.9375rem" }}>
              <Calendar className="w-4 h-4" />
              {reportData.date}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#0a0c14]/40 rounded-xl">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
              Total Invited
            </p>
            <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>{reportData.totalInvited}</p>
          </div>
          <div className="p-4 bg-[#0a0c14]/40 rounded-xl">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
              Checked In
            </p>
            <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>{reportData.totalCheckedIn}</p>
          </div>
          <div className="p-4 bg-[#0a0c14]/40 rounded-xl">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
              Attendance Rate
            </p>
            <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>{reportData.attendanceRate}</p>
          </div>
          <div className="p-4 bg-[#0a0c14]/40 rounded-xl">
            <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>
              Peak Attendance
            </p>
            <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>{reportData.peakAttendance}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
          <TrendingUp className="w-5 h-5 text-primary" />
          Engagement Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-secondary/30 border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Avg. Engagement
              </p>
              <BarChart3 className="w-5 h-5 text-[#10b981]" />
            </div>
            <p className="mb-1" style={{ fontSize: "2rem", fontWeight: 600 }}>
              {reportData.avgEngagementRate}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Poll participation
            </p>
          </div>
          <div className="p-5 bg-secondary/30 border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Questions Sent
              </p>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="mb-1" style={{ fontSize: "2rem", fontWeight: 600 }}>
              {reportData.totalQuestions}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Live polls
            </p>
          </div>
          <div className="p-5 bg-secondary/30 border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Total Responses
              </p>
              <FileText className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <p className="mb-1" style={{ fontSize: "2rem", fontWeight: 600 }}>
              {reportData.totalResponses}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
              Across all polls
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
          <BarChart3 className="w-5 h-5 text-primary" />
          Top Insights
        </h3>
        <div className="space-y-4">
          {topInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-5 bg-secondary/30 border border-border rounded-2xl"
            >
              <p className="mb-3" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                {insight.question}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: insight.percentage }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-primary" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {insight.percentage}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Most popular: {insight.topAnswer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
