import { User } from '../model/models';
import ArticleCard from './ArticleCard';

// const UserArticlePage = ({ html }: { html: string }) => {
const UserArticlePage = ({ articles }: { articles: User['articles'] }) => {
  return (
    <div>
      {!!articles.length ? (
        articles.map((article) => <ArticleCard article={article} />)
      ) : (
        <div></div>
      )}
    </div>
  );
  // return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default UserArticlePage;
