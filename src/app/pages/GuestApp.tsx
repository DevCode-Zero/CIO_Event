import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleCheckIn = () => {
    setCurrentScreen("camera");
  };

  const handleAuthSuccess = (att: Attendee) => {
    setAttendee(att);
    localStorage.setItem("checkedInAttendee", JSON.stringify(att));
    setCurrentScreen("success");
  };

  const handleContinueToDashboard = () => {
    navigate("/dashboard");
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
      {currentScreen === "success" && attendee && (
        <SuccessScreen attendee={attendee} onContinue={handleContinueToDashboard} />
      )}
      {currentScreen === "dashboard" && (
        <DashboardScreen
          name={attendee?.name || "Guest"}
          onQuestionClick={handleQuestionClick}
          onNotificationClick={handleNotificationClick}
        />
      )}
      {currentScreen === "question" && <QuestionScreen onBack={handleBackToDashboard} />}

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onViewQuestion={handleViewQuestion}
      />
    </div>
  );
}
