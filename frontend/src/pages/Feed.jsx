import FeedCard from '../components/FeedCard';
import { claims } from '../data/mockData';

export default function Feed() {
  // Feed is now just a list of cards. 
  // Scrolling is handled by MainLayout's <main> tag.
  return (
    <>
      {claims.map((claim) => (
        <FeedCard key={claim.id} data={claim} />
      ))}
    </>
  );
}