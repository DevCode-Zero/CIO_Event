import { useState, useEffect } from "react";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { CameraScreen } from "../components/CameraScreen";
import { SuccessScreen } from "../components/SuccessScreen";
import { DashboardScreen } from "../components/DashboardScreen";
import { QuestionScreen } from "../components/QuestionScreen";
import { NotificationModal } from "../components/NotificationModal";
import { type Attendee } from "../utils/database";

type Screen = "welcome" | "camera" | "success" | "dashboard" | "question";

export function GuestApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleCheckIn = () => {
    setCurrentScreen("camera");
  };

  const handleAuthSuccess = (att: Attendee) => {
    setAttendee(att);
    setCurrentScreen("success");
  };

  const handleContinueToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleQuestionClick = () => {
    setCurrentScreen("question");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleViewQuestion = () => {
    setShowNotifications(false);
    setCurrentScreen("question");
  };

  return (
    <div className="size-full">
      {currentScreen === "welcome" && <WelcomeScreen onCheckIn={handleCheckIn} />}
      {currentScreen === "camera" && <CameraScreen onSuccess={handleAuthSuccess} />}
      {currentScreen === "success" && (
        <SuccessScreen name={attendee?.name || "Guest"} onContinue={handleContinueToDashboard} />
      )}
      {currentScreen === "dashboard" && (
        <DashboardScreen
          name={attendee?.name || "Guest"}
          onQuestionClick={handleQuestionClick}
          onNotificationClick={handleNotificationClick}
        />
      )}
      {currentScreen === "question" && <QuestionScreen name={attendee?.name || "Guest"} onBack={handleBackToDashboard} />}

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onViewQuestion={handleViewQuestion}
      />
    </div>
  );
}
