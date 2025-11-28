import FeedCard from '../components/FeedCard';
import { claims } from '../data/mockData';

export default function Feed() {
  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-black">
      {/* The max-w-md ensures it looks like a phone even on desktop */}
      <div className="mx-auto max-w-md bg-white h-full shadow-2xl overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {claims.map((claim) => (
          <FeedCard key={claim.id} data={claim} />
        ))}
      </div>
    </div>
  );
}
