export const featuresArray = [
  {
    id: 1,
    icon: "/mediarich.png",
    title: "Media Rich Entries",
    description:
      "Users can create entries that include photos, videos, and audio recordings, allowing for a more immersive journaling experience. This feature helps capture memories in richer detail and context",
  },
  {
    id: 2,
    icon: "/personal_suggestion.png",
    title: "Personalized Suggestions",
    description:
      "The app can provide personalized prompts based on user activity, such as photos taken, locations visited, or music played. This feature helps users overcome writer's block by suggesting topics to write about",
  },
  {
    id: 3,
    icon: "/search.png",
    title: "Search Functionality",
    description:
      "A robust search feature allows users to find specific entries quickly using keywords or dates, making it easier to navigate through numerous journal entries ",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah T",
    words:
      "I've always struggled with keeping a journal, but this app has changed everything for me. The personalized prompts help me reflect on my day, and I love being able to add photos and music to my entries. It feels like a digital scrapbook of my life!",
    src: "/sarah.png",
  },
  {
    id: 2,
    name: "Mark L",
    words:
      "As someone who often forgets to journal, the reminders feature has been a lifesaver. The interface is simple and inviting, making it easy to jot down my thoughts whenever inspiration strikes. I find myself looking forward to my journaling time now!",
    src: "/mark.png",
  },
  {
    id: 3,
    name: "Emily R",
    words:
      "This app has made journaling so much more enjoyable! The ability to include multimedia elements like videos and audio recordings has allowed me to express myself in ways I never thought possible. It's not just a journal; it's a creative outlet",
    src: "/emily.png",
  },
];

// Define the type for a single mood
interface Mood {
  id: string;
  label: string;
  emoji: string;
  score: number;
  color: string;
  prompt: string;
  pixabayQuery: string;
}

// Define the type for the MOODS object
type Moods = {
  [key: string]: Mood; // Each key is a string representing the mood ID
};

export const MOODS: Moods = {
  OVERJOYED: {
    id: "overjoyed",
    label: "Overjoyed",
    emoji: "🤗",
    score: 10,
    color: "yellow",
    prompt: "What wonderful things happened today?",
    pixabayQuery: "joyful+celebration+happy",
  },
  ACCOMPLISHED: {
    id: "accomplished",
    label: "Accomplished",
    emoji: "⭐",
    score: 9,
    color: "amber",
    prompt: "What have you achieved?",
    pixabayQuery: "achievement+success+star",
  },
  INSPIRED: {
    id: "inspired",
    label: "Inspired",
    emoji: "💫",
    score: 9,
    color: "violet",
    prompt: "What's sparking your creativity?",
    pixabayQuery: "inspiration+creative+light",
  },
  PROUD: {
    id: "proud",
    label: "Proud",
    emoji: "🦁",
    score: 9,
    color: "amber",
    prompt: "What achievement are you proud of?",
    pixabayQuery: "achievement+success+proud",
  },
  LOVED: {
    id: "loved",
    label: "Loved",
    emoji: "🥰",
    score: 9,
    color: "pink",
    prompt: "Who or what is making you feel loved?",
    pixabayQuery: "love+heart+affection",
  },
  APPRECIATED: {
    id: "appreciated",
    label: "Appreciated",
    emoji: "💝",
    score: 8,
    color: "rose",
    prompt: "Who showed you appreciation?",
    pixabayQuery: "appreciation+gratitude+heart",
  },
  MOTIVATED: {
    id: "motivated",
    label: "Motivated",
    emoji: "🎯",
    score: 8,
    color: "emerald",
    prompt: "What's driving you forward?",
    pixabayQuery: "motivation+target+goal",
  },
  HAPPY: {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    score: 8,
    color: "amber",
    prompt: "What's making you smile today?",
    pixabayQuery: "happy+smile+sunshine",
  },
  EXCITED: {
    id: "excited",
    label: "Excited",
    emoji: "🎉",
    score: 8,
    color: "orange",
    prompt: "What are you looking forward to?",
    pixabayQuery: "excited+energetic+celebration",
  },
  CONFIDENT: {
    id: "confident",
    label: "Confident",
    emoji: "💪",
    score: 8,
    color: "emerald",
    prompt: "What's boosting your confidence?",
    pixabayQuery: "confident+strong+power",
  },
  GRATEFUL: {
    id: "grateful",
    label: "Grateful",
    emoji: "🙏",
    score: 8,
    color: "green",
    prompt: "What are you thankful for today?",
    pixabayQuery: "grateful+thankful+blessing",
  },
  CONNECTED: {
    id: "connected",
    label: "Connected",
    emoji: "🤝",
    score: 8,
    color: "indigo",
    prompt: "Who made you feel connected today?",
    pixabayQuery: "connection+together+community",
  },
  PEACEFUL: {
    id: "peaceful",
    label: "Peaceful",
    emoji: "😌",
    score: 7,
    color: "blue",
    prompt: "What's bringing you peace?",
    pixabayQuery: "peaceful+calm+serene",
  },
  HOPEFUL: {
    id: "hopeful",
    label: "Hopeful",
    emoji: "🌱",
    score: 7,
    color: "green",
    prompt: "What gives you hope?",
    pixabayQuery: "hope+growth+spring",
  },
  CREATIVE: {
    id: "creative",
    label: "Creative",
    emoji: "🎨",
    score: 7,
    color: "violet",
    prompt: "What's inspiring your creativity?",
    pixabayQuery: "creative+art+inspiration",
  },
  THOUGHTFUL: {
    id: "thoughtful",
    label: "Thoughtful",
    emoji: "🤔",
    score: 6,
    color: "slate",
    prompt: "What's on your mind?",
    pixabayQuery: "thinking+contemplation+reflection",
  },
  CURIOUS: {
    id: "curious",
    label: "Curious",
    emoji: "🧐",
    score: 6,
    color: "teal",
    prompt: "What's caught your interest?",
    pixabayQuery: "curious+discovery+explore",
  },
  NOSTALGIC: {
    id: "nostalgic",
    label: "Nostalgic",
    emoji: "🌅",
    score: 5,
    color: "fuchsia",
    prompt: "What memories are you thinking about?",
    pixabayQuery: "nostalgia+memories+sunset",
  },
  NEUTRAL: {
    id: "neutral",
    label: "Neutral",
    emoji: "😐",
    score: 5,
    color: "gray",
    prompt: "How has your day been?",
    pixabayQuery: "neutral+balance+calm",
  },
  RESTLESS: {
    id: "restless",
    label: "Restless",
    emoji: "🌊",
    score: 4,
    color: "blue",
    prompt: "What's making you feel unsettled?",
    pixabayQuery: "restless+waves+motion",
  },
  TIRED: {
    id: "tired",
    label: "Tired",
    emoji: "😴",
    score: 4,
    color: "purple",
    prompt: "What's draining your energy?",
    pixabayQuery: "tired+sleep+rest",
  },
  OVERWHELMED: {
    id: "overwhelmed",
    label: "Overwhelmed",
    emoji: "😵",
    score: 3,
    color: "sky",
    prompt: "What's feeling like too much?",
    pixabayQuery: "overwhelmed+chaos+storm",
  },
  ANXIOUS: {
    id: "anxious",
    label: "Anxious",
    emoji: "😰",
    score: 3,
    color: "indigo",
    prompt: "What's causing your anxiety?",
    pixabayQuery: "worry+stress+anxiety",
  },
  DISAPPOINTED: {
    id: "disappointed",
    label: "Disappointed",
    emoji: "😞",
    score: 3,
    color: "stone",
    prompt: "What didn't go as expected?",
    pixabayQuery: "disappointment+rain+grey",
  },
  FRUSTRATED: {
    id: "frustrated",
    label: "Frustrated",
    emoji: "😤",
    score: 3,
    color: "orange",
    prompt: "What's blocking your progress?",
    pixabayQuery: "frustrated+blocked+obstacle",
  },
  STRESSED: {
    id: "stressed",
    label: "Stressed",
    emoji: "😫",
    score: 3,
    color: "rose",
    prompt: "What's pressuring you?",
    pixabayQuery: "stress+pressure+overwhelmed",
  },
  INSECURE: {
    id: "insecure",
    label: "Insecure",
    emoji: "🥺",
    score: 2,
    color: "lime",
    prompt: "What's making you doubt yourself?",
    pixabayQuery: "insecure+doubt+shadow",
  },
  SAD: {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    score: 2,
    color: "cyan",
    prompt: "What's bringing you down?",
    pixabayQuery: "sad+melancholy+rain",
  },
  LONELY: {
    id: "lonely",
    label: "Lonely",
    emoji: "🌙",
    score: 2,
    color: "zinc",
    prompt: "How could you connect with others?",
    pixabayQuery: "lonely+solitude+night",
  },
  ANGRY: {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    score: 1,
    color: "red",
    prompt: "What's frustrating you?",
    pixabayQuery: "angry+storm+thunder",
  },
};

export const getMoodTrend = (averageScore: number) => {
  if (averageScore >= 8) return "You've been feeling great!";
  if (averageScore >= 6) return "You've been doing well overall.";
  if (averageScore >= 4) return "You've been feeling okay.";
  if (averageScore >= 2) return "Things have been challenging.";
  return "You've been having a tough time.";
};

export const getMoodById = (moodId: string) => {
  return MOODS[moodId.toUpperCase()];
};
