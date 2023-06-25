import { useState } from 'react';
import '../App.css';
import Alert from '../components/Alert';
// import SectionHomePage from '../components/SectionHomepage';
// import mostVisitedBlogs from '../fakeData/mostVisitedBlogs.json';
// import mostUsedTags from '../fakeData/mostUsedTags.json';
// import mostUsedCategories from '../fakeData/mostUsedCategories.json';
// import { mostViewedBlogsHeader, mostViewedArticleHeader } from '../staticData/tableHeaders';
// import hero from '../assets/hero.png';
// import { Button } from '../components/static/Button';

function Home() {
  const [isShowing, setIsShowing] = useState(false);
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
      <Alert
        text="Earum fugiat necessitatibus ipsum veniam, voluptates accusantium odit facere ducimus?"
        type="error"
        isShowing={isShowing}
        setIsShowing={setIsShowing}
      />
      <button onClick={() => setIsShowing((state) => !state)} className="p-2 bg-gray-700">
        TRIGGER
      </button>
    </div>
  );
}

export default Home;
