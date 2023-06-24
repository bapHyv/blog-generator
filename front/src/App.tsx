import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { UserScreen } from './pages/UserScreen';
import './App.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import ArticleBuilderScreen from './pages/ArticleBuilderScreen';
import Articles from './pages/Articles';
import Writers from './pages/Writers';
import Article from './pages/Article';
import Writer from './pages/Writer';

function App() {
  return (
    <div className="App flex flex-col [&>*:nth-last-child(2)]:flex-1">
      <Router>
        <Header />
        <div className="min-h-screen max-w-[1440px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:articleId" element={<Article />} />
            <Route path="/writers" element={<Writers />} />
            <Route path="/writers/:writerId" element={<Writer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile/:writerPseudo" element={<UserScreen />} />
            <Route path="/article-builder" element={<ArticleBuilderScreen />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
