const AVATAR_BASE_URL = "http://localhost:8000";

export default function Avatar({ src, alt }) {
  const avatarUrl = src
    ? src.startsWith("http")
      ? src
      : AVATAR_BASE_URL + src
    : "/default-avatar.png";
  return (
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg">
      <img src={avatarUrl} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
}

