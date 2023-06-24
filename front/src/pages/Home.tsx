import '../App.css';
import SectionHomePage from '../components/SectionHomepage';
import mostVisitedBlogs from '../fakeData/mostVisitedBlogs.json';
import mostUsedTags from '../fakeData/mostUsedTags.json';
import mostUsedCategories from '../fakeData/mostUsedCategories.json';
import { mostViewedBlogsHeader, mostViewedArticleHeader } from '../staticData/tableHeaders';
import hero from '../assets/hero.png';
import { Button } from '../components/static/Button';

function Home() {
  // const token = localStorage.getItem("token");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/login");
  //   }
  // });
  return (
    <div>
      <img src="/wall_paper.jpeg" alt="bg" className="object-cover" />
    </div>
  );
}

export default Home;
